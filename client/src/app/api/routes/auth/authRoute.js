import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_ENDPOINTS_URL;
const endPoint = process.env.NEXT_PUBLIC_ENDPOINTS_URL;

const AuthRoute = {
  async LoginRoute(userData) {
    try {
      const { username, password } = userData;
      const userLoginInfo = { username, password };
      const res = await axios.post('/login', userLoginInfo);
      return res.data;
    } catch (error) {
      throw error;
    }
  },

  async registerRoute(userData) {
    console.log(userData)
    try {
      const response = await axios.post(`${endPoint}/register`, userData);
      console.log(response)
     return response.data;
    } catch (error) {
      throw { ok: false, msg: error };
    }
  },

  async refreshToken(refreshToken) {
    try {
      const refreshRes = await axios.post('/refresh_token', {
        refreshToken,
      });
      const newToken = refreshRes.data.data.accessToken;
      return newToken;
    } catch (error) {
      return { ok: false, msg: error };
    }
  },
};

export default AuthRoute;
