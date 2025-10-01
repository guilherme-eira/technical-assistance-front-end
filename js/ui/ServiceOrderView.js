import ServiceOrderService from "../service/ServiceOrderService.js";

const modalBody = document.getElementById('modal-body');
const formTitle = document.getElementById('form-title');
const customerInput = document.getElementById('customer');
const equipmentInput = document.getElementById('equipment');
const technicianSelect = document.getElementById('technician')
const entryDateInput = document.getElementById('entry-date');
const estimatedDateInput = document.getElementById('delivery-date');
const priorityInput = document.getElementById('priority');
const defectTextarea = document.getElementById('defect');
const notesTextarea = document.getElementById('notes');
const servicesContainer = document.getElementById('services');
const newServiceOrderForm = document.getElementById('new-so-form')
const createBtn = document.getElementById('confirm-create-button')
const updateContainer = document.getElementById('update-buttons')
const confirmUpdateBtn = document.getElementById('confirm-update-button');
const cancelUpdateBtn = document.getElementById('cancel-update-button')
const confirmActionBtn = document.getElementById('confirm-action-button');
const errorAlert = document.getElementById('error-alert');
const tableBody = document.getElementById('table-body');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const toast = document.getElementById('toast');
const toastBody = document.getElementById('toast-body')


export default class ServiceOrderView {

    static initializeListeners() {
        newServiceOrderForm.addEventListener('submit', e => this.handleFormSubmission(e));
        searchForm.addEventListener('submit', e => this.handleSearch(e));
        confirmActionBtn.addEventListener("click", () => this.handleActionExecution('Outro'));
        confirmUpdateBtn.addEventListener("click", () => this.handleActionExecution('Atualização'));
    }

    static populateForm(technicians, services) {
        technicianSelect.innerHTML = '<option value="" selected disabled>Selecione o técnico...</option>';

        technicians.forEach(technician => {
            const option = document.createElement('option');
            option.value = technician.id;
            option.textContent = technician.name;
            technicianSelect.appendChild(option);
        });

        servicesContainer.innerHTML = '';

        const label = document.createElement('label');
        label.classList.add('form-label', 'd-block', 'mb-2');
        label.textContent = 'Serviços';
        servicesContainer.appendChild(label);

        services.forEach(service => {

            let counter = 1;

            const div = document.createElement('div');
            div.classList.add('form-check', 'form-check-inline');

            const input = document.createElement('input');
            input.classList.add('form-check-input');
            input.type = "checkbox";
            input.id = `service${counter}`
            counter++
            input.value = service.id;

            const label = document.createElement('label');
            label.classList.add('form-check-label')
            label.for = input.id;
            label.textContent = `${service.description} - R$${service.price},00`;

            div.appendChild(input);
            div.appendChild(label);
            servicesContainer.appendChild(div);
        })
    }

    static async populateTable(serviceOrders) {
        tableBody.innerHTML = '';

        serviceOrders.forEach(so => {
            const tr = document.createElement('tr');
            tr.classList.add('table-secondary', 'align-middle');

            const statusMap = {
                OPEN: 'Aberto',
                IN_PROGRESS: 'Em andamento',
                COMPLETED: 'Concluído',
                CANCELED: 'Cancelado'
            };

            const values = [
                so.id,
                so.customerName,
                so.entryDate,
                so.defect,
                so.exitDate || '',
                statusMap[so.status],
            ];

            values.forEach(value => {
                const td = document.createElement('td');
                td.textContent = value;
                tr.appendChild(td);
            });

            this.createDropup(so, tr);
        })
    }

    static async handleFormSubmission(e) {
        e.preventDefault();

        const serviceOrder = {
            entryDate: entryDateInput.value,
            estimatedDeliveryDate: estimatedDateInput.value,
            defect: defectTextarea.value,
            priority: priorityInput.value,
            notes: notesTextarea.value.trim() || null,
            technicianId: technicianSelect.value,
            equipmentId: equipmentInput.value,
            customerId: customerInput.value,
            serviceIdList: Array.from(
                servicesContainer.querySelectorAll('input[type="checkbox"]:checked')
            ).map(cb => cb.value)
        };

        const createdServiceOrder = await ServiceOrderService.postServiceOrder(serviceOrder);
        if (createdServiceOrder.success) {
            console.log(createdServiceOrder.data)
            this.showSuccessToast("Ordem de serviço criada com sucesso.")
            this.resetFields();
            await ServiceOrderService.loadContent();
        } else {
            this.showErrorAlert(createdServiceOrder.error);
        }
    }

    static createDropup(so, tr) {
        const tdButton = document.createElement('td');
        const dropup = document.createElement('div');
        dropup.classList.add('btn-group', 'dropup');
        dropup.style.position = 'static';
        const button = document.createElement('button');
        button.type = 'button';
        button.classList.add('btn', 'dropdown-toggle');
        button.setAttribute('data-bs-toggle', 'dropdown');
        button.setAttribute('aria-expanded', 'false');
        button.textContent = 'Ações';
        const menu = document.createElement('ul');
        menu.classList.add('dropdown-menu');
        menu.style.position = 'absolute';
        let actions = null;
        if (so.status == "OPEN") {
            actions = ['Atualizar', 'Deletar', 'Iniciar', 'Cancelar']
        } else if (so.status == "IN_PROGRESS") {
            actions = ['Atualizar', 'Deletar', 'Completar', 'Cancelar']
        } else {
            actions = ['Deletar']
        }
        actions.forEach(action => {
            const li = document.createElement('li');
            const itemButton = document.createElement('button');
            itemButton.classList.add('dropdown-item');
            itemButton.textContent = action;
            itemButton.value = action
            itemButton.addEventListener("click", e => {
                const action = e.target.value
                const id = e.target.closest('td').parentNode.querySelector('td').textContent;
                if (action == 'Atualizar') {
                    this.prepareFormForUpdate(id)
                } else {
                    this.openDialog(action, id)
                }
            })
            li.appendChild(itemButton);
            menu.appendChild(li);
        });
        dropup.appendChild(button);
        dropup.appendChild(menu);
        tdButton.appendChild(dropup);
        tr.appendChild(tdButton);

        tableBody.appendChild(tr);
    }

    static openDialog(action, id) {
        modalTitle.textContent = action
        modalBody.textContent = "Tem certeza que deseja " + action[0].toLowerCase() + action.slice(1) + " esta ordem de serviço?"
        new bootstrap.Modal(modal).show();
        confirmActionBtn.setAttribute('data-action', action);
        confirmActionBtn.setAttribute('data-id', id);
    }

    static async prepareFormForUpdate(id) {
        createBtn.parentNode.classList.add("d-none");
        updateContainer.classList.remove("d-none")
        updateContainer.classList.add("d-flex")
        cancelUpdateBtn.addEventListener("click", () => this.cancelUpdate())
        formTitle.textContent = "Atualizar ordem de serviço";
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        entryDateInput.setAttribute('disabled', true);
        equipmentInput.setAttribute("disabled", true);
        servicesContainer.classList.add("d-none");
        confirmUpdateBtn.setAttribute('data-id', id);
    }

    static cancelUpdate() {
        createBtn.parentNode.classList.remove("d-none");
        formTitle.textContent = "Criar nova ordem de serviço";
        updateContainer.classList.add("d-none")
        entryDateInput.removeAttribute('disabled')
        equipmentInput.removeAttribute("disabled");
        servicesContainer.classList.remove("d-none");
        this.resetFields()
    }

    static async handleSearch(e) {
        e.preventDefault();
        const name = searchInput.value;

        const serviceOrder = await ServiceOrderService.getServiceOrdersByCustomerName(name);
        if (serviceOrder.success) {
            this.populateTable(serviceOrder.data);
        }
    }

    static async handleActionExecution(option) {
        let action = null;
        let id = null

        if (option === 'Atualização') {
            action = 'Atualizar';
            id = confirmUpdateBtn.getAttribute('data-id');
        } else {
            action = confirmActionBtn.getAttribute('data-action');
            id = confirmActionBtn.getAttribute('data-id');
        }

        if (action == 'Atualizar') {
            const update = {
                estimatedDeliveryDate: estimatedDateInput.value.trim() || null,
                defect: defectTextarea.value.trim() || null,
                priority: priorityInput.value.trim() || null,
                notes: notesTextarea.value.trim() || null,
                technicianId: technicianSelect.value.trim() || null,
                customerId: customerInput.value.trim() || null
            }
            const updatedServiceOrder = await ServiceOrderService.updateServiceOrder(id, update);
            if (updatedServiceOrder.success) {
                console.log(updatedServiceOrder.data)
                this.showSuccessToast("Ordem de serviço atualizada com sucesso.")
                this.cancelUpdate();
            } else {
                this.showErrorAlert(updatedServiceOrder.error);
            }
        } else if (action == 'Iniciar') {
            const serviceOrder = await ServiceOrderService.startServiceOrder(id);
            if (serviceOrder.success) {
                bootstrap.Modal.getInstance(modal).hide();
                this.showSuccessToast("Ordem de serviço iniciada com sucesso.")
            }
        } else if (action == 'Completar') {
            const serviceOrder = await ServiceOrderService.completeServiceOrder(id);
            if (serviceOrder.success) {
                bootstrap.Modal.getInstance(modal).hide();
                this.showSuccessToast("Ordem de serviço completada com sucesso.")
            }
        } else if (action == 'Cancelar') {
            const serviceOrder = await ServiceOrderService.cancelServiceOrder(id);
            if (serviceOrder.success) {
                bootstrap.Modal.getInstance(modal).hide();
                this.showSuccessToast("Ordem de serviço cancelada com sucesso.")
            }
        } else {
            const serviceOrder = await ServiceOrderService.deleteServiceOrder(id);
            if (serviceOrder.success) {
                bootstrap.Modal.getInstance(modal).hide();
                this.showSuccessToast("Ordem de serviço deletada com sucesso.")
            }
        }

        await ServiceOrderService.loadContent();
    }

    static showSuccessToast(successMessage) {
        toastBody.innerText = successMessage;
        const toastEl = new bootstrap.Toast(toast, {
            delay: 4000,
            autohide: true
        });
        toastEl.show();
    }

    static showErrorAlert(errorMessage) {
        errorAlert.innerText = errorMessage;
        errorAlert.classList.remove('visually-hidden');
        errorAlert.style.whiteSpace = 'pre-line';
    };

    static resetFields() {
        entryDateInput.value = '';
        estimatedDateInput.value = '';
        defectTextarea.value = '';
        priorityInput.value = '';
        notesTextarea.value = '';
        technicianSelect.value = '';
        equipmentInput.value = '';
        customerInput.value = '';
        servicesContainer.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => cb.checked = false);
        errorAlert.classList.add('visually-hidden');
    }
}