import GenericDAO from "./GenericDAO";
import { ApiRegistry } from "../api/ApiRegistry";

class StudentDAO extends GenericDAO {
  constructor() {
    super(ApiRegistry.pontoIF, "/user/student");
  }

  async getAllStudents() {
    const res = await this.api.get("/user/students");
    return res.data;
  }
}

export default new StudentDAO();
