import GenericDAO from "./GenericDAO";
import { ApiRegistry } from "../api/ApiRegistry";

class BiometricDAO extends GenericDAO {
  constructor() {
    super(ApiRegistry.biometric, "/biometric");
  }

    async insertSample(data) {
    const res = await this.api.post(`${this.baseURL}/sample`, data);
    return res.data;
  }
}

export default new BiometricDAO();
