import GenericDAO from "./GenericDAO";
import { ApiRegistry } from "../api/ApiRegistry";

class StudentDAO extends GenericDAO {
  constructor() {
    super(ApiRegistry.pontoIF, "/user/student");
  }
}

export default new StudentDAO();
