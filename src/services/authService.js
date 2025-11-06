import { registerIfApi } from "../api/registerIfApi";

export async function login(email, password) {
  try {
    const payload = { email, password };
    const response = await registerIfApi.post("/auth/login", payload);

    const token = response.data.token;
    localStorage.setItem("user-token", token);

    return token;
  } catch (error) {
    console.error("Erro no authService:", error);
    throw error;
  }
}
