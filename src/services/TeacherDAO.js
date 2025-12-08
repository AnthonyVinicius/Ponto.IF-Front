import GenericDAO from "./GenericDAO";
import { ApiRegistry } from "../api/ApiRegistry";

class TeacherDAO extends GenericDAO {
  constructor() {
    super(ApiRegistry.pontoIF, "/user/teachers");
  }

  async getOfferings(teacherId) {
    if (!teacherId) {
      throw new Error("ID do professor não encontrado!");
    }

    return this.api
      .get(`${this.baseURL}/${teacherId}/offerings`, {
        params: { id: teacherId }
      })
      .then(res => res.data);
  }
}

export default new TeacherDAO();
