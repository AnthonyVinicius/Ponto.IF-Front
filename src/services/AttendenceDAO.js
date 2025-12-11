import GenericDAO from "./GenericDAO";
import { ApiRegistry } from "../api/ApiRegistry";

class AttendenceDAO extends GenericDAO {
  constructor() {
    super(ApiRegistry.pontoIF, "/classrooms");
  }
}

export default new AttendenceDAO();
