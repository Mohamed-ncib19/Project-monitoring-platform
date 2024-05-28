import axiosClient from "@/app/api/services/axiosServices";

export const UserServices = {

  async getPendingUsers() {
    try {
      const response = await axiosClient.get('/users?pending=true');
      return response.data.users
    } catch (error) {
      throw new Error(
        JSON.stringify({
          status:error.response?.status,
          code : error?.code,
          data : error.response?.data,
        })
      )
    }
  },
  
  async getUsers(){
    try {
      const response = await axiosClient.get('/users?approved=true');
      return response.data.users
    } catch (error) {
      throw new Error(
        JSON.stringify({
          status:error.response?.status,
          code : error?.code,
          data : error.response?.data,
        })
      )
    }
  },


  async getBannedUsers(){
    try {
      const response = await axiosClient.get('/users?banned=true');
      return response.data.users
    } catch (error) {
      throw new Error(
        JSON.stringify({
          status:error.response?.status,
          code : error?.code,
          data : error.response?.data,
        })
      )
    }
  },


  async getUserInfo(username) {
    try {
      const response = await axiosClient.get(`/users/${username}`);
      return response.data.data
    } catch (error) {
      throw new Error(
        JSON.stringify({
          status:error.response?.status,
          code : error?.code,
          data : error.response?.data,
        })
      )
    }
  },

  async editUserInfo(userData) {
    try {
      const response = await axiosClient.put(`/users/me`,userData);
      return response.data.data;
    } catch (error) {
      throw new Error(
        JSON.stringify({
          status:error.response?.status,
          code : error?.code,
          data : error.response?.data,
        })
      )
    }
  }
};

