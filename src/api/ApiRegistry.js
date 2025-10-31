import { registerIfApi } from "./internalApi";
import { pontoIfApi } from "./externalApi";

export const ApiRegistry = {
  internal: internalApi,
  external: externalApi,
};
