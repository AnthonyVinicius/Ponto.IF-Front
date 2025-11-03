import GenericDAO from "./GenericDAO";
import { ApiRegistry } from "../api/ApiRegistry"; 

class BiometricDAO extends GenericDAO {
  constructor() {
    super(ApiRegistry.registerIF, "/biometric");
  }
}

export default new BiometricDAO();
