import GenericDAO from "./GenericDAO";
import { ApiRegistry } from "../api/ApiRegistry";

class ClassSessionDAO extends GenericDAO {
  constructor() {
    super(ApiRegistry.pontoIF, "/class-session");
  }

  startSession(offerId) {
    return this.api.post(`/class-session/${offerId}`);
  }
}

export default new ClassSessionDAO();
