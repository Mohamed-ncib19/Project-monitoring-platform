import axios from "axios";

axios.defaults.baseURL = process.env.URL_ENDPOINTS;

async function LoginRoute(userData) {
  try {
    const { email, password } = userData;
    const userLoginInfo = { email, password };
    const res = await axios.post("/login", userLoginInfo);
    return res.data
  } catch (error) {
    throw error;
  }
}

export { LoginRoute };
