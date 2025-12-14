import GenericDAO from "./GenericDAO";
import { ApiRegistry } from "../api/ApiRegistry";

class ClassSessionDAO extends GenericDAO {
  constructor() {
    super(ApiRegistry.pontoIF, "/api/class-session");
  }

  async getByOffering(offeringId) {
    const res = await this.api.get(`${this.baseURL}/${offeringId}`);
    return res.data;
  }

  async getAllActive() {
    const res = await this.api.get(`${this.baseURL}/allActive`);
    return res.data; 
  }
}

export default new ClassSessionDAO();
