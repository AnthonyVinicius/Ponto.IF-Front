import GenericDAO from "./GenericDAO";
import { ApiRegistry } from "../api/ApiRegistry";

class ClassroomDAO extends GenericDAO {
  constructor() {
    super(ApiRegistry.pontoIF, "/classroom");
  }
}

export default new ClassroomDAO();
