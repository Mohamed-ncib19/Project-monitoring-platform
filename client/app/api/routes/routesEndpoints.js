//import { DecodeToken } from "@/app/utils/auth/DecodeToken";
import axios from "axios";

axios.defaults.baseURL = process.env.URL_ENDPOINTS;

async function LoginRoute(userData) {
  try {
    const { username, password } = userData;
    const userLoginInfo = { username, password };
    const res = await axios.post("/login", userLoginInfo);
    return res.data
  } catch (error) {
    throw error;
  }
}

async function registerRoute(userData, token) {
  try {
   
 
    const data = {
      username: userData.username,
      ...userData.step1,
      ...userData.step2,
      ...userData.step3,
      pending: true
    };
     const res = await axios.post("https://6813-41-224-220-155.ngrok-free.app/register", data, {
      headers: { 'Authorization': token }
    });
 
    return res.data ;
  } catch (error) {
    throw error;
  }
}

async function refreshToken(refreshToken){
     try {  
      const refreshRes = await axios.post("https://6813-41-224-220-155.ngrok-free.app/refresh_token", { refreshToken });
      const newToken = refreshRes.data.accessToken;
      console.log(newToken);
      return newToken;
     } catch (error) {
      throw error;
     }
}



export { LoginRoute,registerRoute,refreshToken };
