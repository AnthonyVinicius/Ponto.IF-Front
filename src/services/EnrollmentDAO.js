import GenericDAO from "./GenericDAO";
import { ApiRegistry } from "../api/ApiRegistry";

class EnrollmentDAO extends GenericDAO {
  constructor() {
    super(ApiRegistry.pontoIF, "/api/enrollement");
  }

  async getByStudent(studentId) {
    return this.api.get(`/enrollement/student/${studentId}`).then(r => r.data);
  }

  async getStudentsByOffering(offeringId) {
    return this.api.get(`/api/offerings/${offeringId}/enrollments`).then(r => r.data);
  }
}
export default new EnrollmentDAO();
