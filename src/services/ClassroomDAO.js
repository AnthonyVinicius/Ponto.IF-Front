import GenericDAO from "./GenericDAO";
import { ApiRegistry } from "../api/ApiRegistry";

class ClassroomDAO extends GenericDAO {
  constructor() {
    super(ApiRegistry.pontoIF, "/classrooms");
  }
}

export default new ClassroomDAO();
