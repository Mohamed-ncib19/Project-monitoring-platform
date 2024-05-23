import axios from 'axios';

const UserRoute = {
  async getUserInfo(username, token) {
    try {
      const res = await axios.get(`http://localhost:5000/users/${username}`, {
        headers: { Authorization: token },
      });
      console.log(res);
      if (res.status) {
        return { ok: true, data: res.data.data };
      } else {
        return { ok: false, status: 404 };
      }
    } catch (error) {
      return { ok: false, status: 500, msg: 'system error' };
    }
  },

  async editUserInfo(userData, username, token) {
    try {
      const res = await axios.put(`http://localhost:5000/users/me`, userData, {
        headers: { Authorization: token },
      });

      console.log(res);
      if (res.status === 200) {
        return { ok: true, status: 201 };
      } else {
        return { ok: false, status: 404, msg: 'failed to update' };
      }
    } catch (error) {
      return { ok: false, status: 500, msg: 'System error' };
    }
  },

  async getPendingUsers() {
    const users = [];
    try {
      const res = await axios.get('http://localhost:5000/users?pending=true', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      console.log(res.data);
      if (res.status === 200) {
        /*     res.data.data.map((user)=>{
               users.push({
                id:user._id,
                email:user.email,
                firstName:user.firstname,
                lastName : user.lastname,
                position:user.position
               });
              }); */
        console.log(users);
        return { ok: true, status: 200, data: res.data.data };
      } else {
        return { ok: false, msg: res };
      }
    } catch (error) {
      return { ok: false, msg: error };
    }
  },
};

export default UserRoute;
