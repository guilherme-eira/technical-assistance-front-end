const URL_BASE = "http://localhost:8080"

export default class ServiceOrderApiClient {

    static async postServiceOrder(serviceOrder) {
        try {
            const response = await fetch(`${URL_BASE}/service-orders`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(serviceOrder),
            });
            const data = await response.json();
            if (!response.ok) throw data;
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async getAllServiceOrders() {
        try {
            const response = await fetch(`${URL_BASE}/service-orders/table-data`);
            const data = await response.json();
            if (!response.ok) {
                throw data;
            }
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async getServiceOrderById(id) {
        try {
            const response = await fetch(`${URL_BASE}/service-orders/${id}`);
            const data = await response.json();
            if (!response.ok) {
                throw data;
            }
            return data;
        } catch (error) {
            throw error
        }
    }

    static async getServiceOrderByCustomerName(name) {
        try {
            const response = await fetch(`${URL_BASE}/service-orders/table-data/customer?name=${name}`);
            const data = await response.json();
            if (!response.ok) {
                throw data;
            }
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async updateServiceOrder(id, serviceOrder) {
        try {
            const response = await fetch(`${URL_BASE}/service-orders/${id}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(serviceOrder),
            });
            const data = await response.json();
            if (!response.ok) {
                throw data;
            }
            return data;
        } catch (error) {
            throw error;
        }
    }

    static async startServiceOrder(id) {
        try {
            const response = await fetch(`${URL_BASE}/service-orders/${id}/start`, { method: 'PATCH' });
            if (!response.ok) {
                throw await response.json();
            }
            return;
        } catch (error) {
            throw error
        }
    }

    static async cancelServiceOrder(id) {
        try {
            const response = await fetch(`${URL_BASE}/service-orders/${id}/cancel`, { method: 'PATCH' });
            if (!response.ok) {
                throw await response.json();
            }
            return;
        } catch (error) {
            throw error
        }
    }

    static async completeServiceOrder(id) {
        try {
            const response = await fetch(`${URL_BASE}/service-orders/${id}/complete`, { method: 'PATCH' });
            if (!response.ok) {
                throw await response.json();
            }
            return;
        } catch (error) {
            throw error
        }
    }

    static async deleteServiceOrder(id) {
        try {
            const response = await fetch(`${URL_BASE}/service-orders/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw await response.json();
            }
            return;
        } catch (error) {
            throw error
        }
    }

}