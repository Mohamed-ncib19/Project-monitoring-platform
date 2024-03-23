import axios from "axios";

axios.defaults.baseURL = process.env.URL_ENDPOINTS;

async function LoginRoute(userData) {
  try {
    const { username, password } = userData;
    const userLoginInfo = { username, password };
    console.log(userLoginInfo)
    const res = await axios.post("/login", userLoginInfo);
    console.log(res)
    return res.data
  } catch (error) {
    throw error;
  }
}

async function registerRoute(userData ,token){
  try {
    console.log(token)
    const data = {
      ...userData.step1,
      ...userData.step2,
      ...userData.step3
    }
     const res = await axios.post("/register", data ,{
      headers:{'token' : token}
     });
    return res.data;
    } catch (error) {
    throw error
  }
}

export { LoginRoute,registerRoute };
