const URL_BASE = "http://localhost:8080"

export default class ServiceApiClient {

    static async getAllServices(){
        try {
            const response = await fetch(`${URL_BASE}/services`);
            const data = await response.json();
            if (!response.ok) {
                throw data
            }
            return data;
        } catch (error) {
            throw error;
        }
    }
}