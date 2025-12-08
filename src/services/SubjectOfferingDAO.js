import GenericDAO from "./GenericDAO";
import { ApiRegistry } from "../api/ApiRegistry";

class SubjectOfferingDAO extends GenericDAO {
  constructor() {
    super(ApiRegistry.pontoIF, "/api/offerings");
  }
}

export default new SubjectOfferingDAO();
