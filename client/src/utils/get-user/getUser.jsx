/* import { DecodeToken } from "../auth/DecodeToken";
import { getUserInfo } from "../../api/routes/routesEndpoints";

async function getUserData(session) {
  let userInfo = null;

  if (typeof window !== 'undefined') {
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    userInfo = storedUserInfo || null;
  }

  const getInfo = async (username, token) => {
    try {
      let storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (!storedUserInfo) {
        const res = await getUserInfo(username, token);
        storedUserInfo = res.data;
        if (typeof window !== 'undefined') {
          localStorage.setItem('userInfo', JSON.stringify(storedUserInfo));
        }
      }
      userInfo = storedUserInfo;
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  if (session?.token) {
    const decoded = DecodeToken(session.token);
    const username = decoded.username;
    await getInfo(username, session.token);
  }

  if (userInfo && session?.token) {
    await getInfo(userInfo.username, session.token);
  }

  return userInfo;
}

export default getUserData; */
