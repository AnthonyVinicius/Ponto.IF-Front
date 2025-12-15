import GenericDAO from "./GenericDAO";
import { ApiRegistry } from "../api/ApiRegistry";

class AttendanceDAO extends GenericDAO {
  constructor() {
    super(ApiRegistry.pontoIF, "/api/attendance");
  }

  async getByOffering(offeringId) {
    const res = await this.api.get(`${this.baseURL}/offering/${offeringId}`);
    return res.data;
  }

  async getBySession(sessionId) {
    const res = await this.api.get(`${this.baseURL}/session/${sessionId}`);
    return res.data;
  }

  async getReportByOffering(offeringId) {
    const res = await this.api.get(
      `${this.baseURL}/report/offering/${offeringId}`
    );
    return res.data;
  }

  exportCsvByOffering(offeringId) {
    return this.api.get(
      `${this.baseURL}/offering/${offeringId}/export/csv`,
      { responseType: "blob" }
    );
  }
}

export default new AttendanceDAO();
