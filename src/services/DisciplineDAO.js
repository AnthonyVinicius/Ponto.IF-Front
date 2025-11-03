import GenericDAO from "./GenericDAO";
import { ApiRegistry } from "../api/ApiRegistry";

class DisciplineDAO extends GenericDAO {
  constructor() {
    super(ApiRegistry.pontoIF, "/discipline");
  }
}

export default new DisciplineDAO();
