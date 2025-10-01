const URL_BASE = "http://localhost:8080"

export default class TechnicianApiClient {

    static async getAllTechnicians(){
        try {
            const response = await fetch(`${URL_BASE}/technicians`);
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