import axios from 'axios';

axios.defaults.baseURL = process.env.URL_ENDPOINTS;

console.log(axios.defaults.baseURL);
const AuthRoute = {
  async LoginRoute(userData) {
    try {
      console.log(userData)
      const { username, password } = userData;
      const userLoginInfo = { username, password };
      const res = await axios.post("https://a65d-197-244-121-167.ngrok-free.app/login", userLoginInfo);
      return res.data
    } catch (error) {
      throw error;
    }
  },
    
  async registerRoute(userData, token) {
    try {
      
       const res = await axios.post("https://a65d-197-244-121-167.ngrok-free.app/register", userData, {
        headers: { 'Authorization': token }
      });
      console.log(res)
      return res.data ;
    } catch (error) {
      return {ok:false,msg:error}
    }
  },

  async refreshToken(refreshToken){
    try {  
     const refreshRes = await axios.post("https://a65d-197-244-121-167.ngrok-free.app/refresh_token", { refreshToken });
     const newToken = refreshRes.data.accessToken;
     return newToken;
    } catch (error) {
     return {ok:false,msg:error}
    }
}
};

export default AuthRoute;
