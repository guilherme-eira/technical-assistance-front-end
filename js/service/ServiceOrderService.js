import TechnicianApiClient from "../api/TechnicianApiClient.js";
import ServiceApiClient from "../api/ServiceApiClient.js";
import ServiceOrderApiClient from "../api/ServiceOrderApiClient.js";
import ServiceOrderView from "../ui/ServiceOrderView.js"

export default class ServiceOrderService {

    static async loadContent() {
        try {
            const technicians = await TechnicianApiClient.getAllTechnicians();
            const services = await ServiceApiClient.getAllServices();
            const serviceOrders = await ServiceOrderApiClient.getAllServiceOrders();
            ServiceOrderView.populateForm(technicians, services);
            ServiceOrderView.populateTable(serviceOrders);
        } catch (error) {
            console.error("Ocorreu um erro ao carregar o conteúdo: ", error)
        }
    }

    static async postServiceOrder(serviceOrder) {
        try {
            const createdServiceOrder = await ServiceOrderApiClient.postServiceOrder(serviceOrder)
            return { success: true, data: createdServiceOrder }
        } catch (error) {
            console.error("Ocorreu um erro ao criar a ordem de serviço: ", error)
            return { success: false, error: this.formatError(error) }
        }
    }

    static async getServiceOrderById(id) {
        try {
            const serviceOrder = await ServiceOrderApiClient.getServiceOrderById(id);
            return { success: true, data: serviceOrder }
        } catch (error) {
            console.error("Ocorreu um erro ao buscar a ordem de serviço por id: ", error)
            return { success: false, error: this.formatError(error) }
        }
    }

    static async getServiceOrdersByCustomerName(name) {
        try {
            const serviceOrders = await ServiceOrderApiClient.getServiceOrderByCustomerName(name);
            return { success: true, data: serviceOrders }
        } catch (error) {
            console.error("Ocorreu um erro ao buscar as ordens de serviço por nome: ", error)
            return { success: false, error: this.formatError(error) }
        }
    }

    static async updateServiceOrder(id, update) {
        try {
            const updatedServiceOrder = await ServiceOrderApiClient.updateServiceOrder(id, update);
            return { success: true, data: updatedServiceOrder }
        } catch (error) {
            console.error("Ocorreu um erro ao atualizar a ordem de serviço: ", error)
            return { success: false, error: this.formatError(error) }
        }
    }

    static async startServiceOrder(id) {
        try {
            await ServiceOrderApiClient.startServiceOrder(id);
            return { success: true }
        } catch (error) {
            console.error("Ocorreu um erro ao iniciar a ordem de serviço: ", error)
        }
    }

    static async completeServiceOrder(id) {
        try {
            await ServiceOrderApiClient.completeServiceOrder(id);
            return { success: true }
        } catch (error) {
            console.error("Ocorreu um erro ao completar a ordem de serviço: ", error)
        }
    }

    static async cancelServiceOrder(id) {
        try {
            await ServiceOrderApiClient.cancelServiceOrder(id);
            return { success: true }
        } catch (error) {
            console.error("Ocorreu um erro ao cancelar a ordem de serviço: ", error)
        }
    }

    static async deleteServiceOrder(id) {
        try {
            await ServiceOrderApiClient.deleteServiceOrder(id);
            return { success: true }
        } catch (error) {
            console.error("Ocorreu um erro ao deletar a ordem de serviço: ", error)
        }
    }

    static formatError(error) {
        const invalidFields = error.invalidFields || {};
        const fieldDetails = Object.values(invalidFields).join('; ');
        const errorMessage = `Erro: ${error.error || ''}\n\nMensagem: ${String(error.message).replace("'invalidFields'", "'Detalhes'")}\n\nDetalhes: ${fieldDetails || 'Sem detalhes'}`;
        return errorMessage;
    }
}