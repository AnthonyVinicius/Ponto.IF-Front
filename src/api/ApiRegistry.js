import { registerIfApi } from "./registerIfApi";
import { pontoIfApi } from "./pontoIfApi";
import { biometricApi } from "./biometricApi";

export const ApiRegistry = {
  pontoIF: pontoIfApi,
  registerIF: registerIfApi,
  biometric: biometricApi
};
