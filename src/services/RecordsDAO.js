import GenericDAO from "./GenericDAO";
import { ApiRegistry } from "../api/ApiRegistry";

class RecordsDAO extends GenericDAO {
  constructor() {
    super(ApiRegistry.pontoIF, "/record");
  }
}

export default new RecordsDAO();
