import GenericDAO from "./GenericDAO";
import { ApiRegistry } from "../api/ApiRegistry";

class ClassSessionDAO extends GenericDAO {
  constructor() {
    super(ApiRegistry.pontoIF, "/api/class-session");
  }

  async getByOffering(offeringId) {
    return this.api
      .get(`/api/class-session/${offeringId}`)
      .then(res => res.data);
  }
}

export default new ClassSessionDAO();
