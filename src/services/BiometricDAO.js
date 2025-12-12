import GenericDAO from "./GenericDAO";
import { ApiRegistry } from "../api/ApiRegistry";

class BiometricDAO extends GenericDAO {
  constructor() {
    super(ApiRegistry.biometric, "/biometric");
  }

  async insertSample(role, sessionId) {
    const res = await this.api.post(
      "/api/biometry/match",
      {
        role,
        sessionId
      }
    );
    return res.data;
  }

  async insertBiometric(userId) {
    const res = await this.api.post(
      `${this.baseURL}/register`,
      { userId }
    );
    return res.data;
  }
}

export default new BiometricDAO();
