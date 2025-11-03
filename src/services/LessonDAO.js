import GenericDAO from "./GenericDAO";
import { ApiRegistry } from "../api/ApiRegistry";

class LessonDAO extends GenericDAO {
  constructor() {
    super(ApiRegistry.pontoIF, "/lesson");
  }
}

export default new LessonDAO();
