import GenericDAO from "./GenericDAO";
import { registerIfApi } from "../api/registerIfApi";

class CourseDAO extends GenericDAO {
  constructor() {
    super(registerIfApi, "/course");
  }
}

export default new CourseDAO();
