import GenericDAO from "./GenericDAO";
import { pontoIfApi } from "../api/pontoIfApi";

class SubjectDAO extends GenericDAO {
  constructor() {
    super(pontoIfApi, "/api/subjects");
  }

  async getByCourse(courseId) {
    return this.api
      .get(`/api/subjects/course/${courseId}/`)
      .then(res => res.data);
  }

  async addCourseToSubject(courseId, subjectId) {
    return this.api
      .post(`/api/subjects/add-course`, {
        courseId,
        subjectId,
      })
      .then(res => res.data);
  }

  async removeCourseFromSubject(courseId, subjectId) {
    return this.api
      .delete(`/api/subjects/remove-course/${courseId}/subject/${subjectId}`)
      .then(res => res.data);
  }

async startOffering(offeringId, teacherId) {
  return this.api
    .post(
      `/api/subjects/offerings/${offeringId}/start`,
      null,
      { params: { teacherId } }
    )
    .then(res => res.data);
}


  async finalizeOffering(offeringId, teacherId) {
    return this.api.post(
      `/api/subjects/offerings/${offeringId}/finalize`,
      null,
      {
        params: { teacherId }
      }
    );
  }
}

export default new SubjectDAO();
