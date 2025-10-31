import GenericDAO from "./GenericDAO";
import { ApiRegistry } from "../api/ApiRegistry";

class CourseDAO extends GenericDAO {
  constructor() {
    super(ApiRegistry.registerIF, "/course");
  }
}

export default new CourseDAO();
