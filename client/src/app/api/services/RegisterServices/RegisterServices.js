import axiosClient from "@/app/api/services/RegisterServices/RegisterServices";

export const RegisterServices = {

  async Register(userData) {
    try {
      const res = await axiosClient.post('/register', userData);
     return res.data;
    } catch (error) {
      return { ok: false, msg: error };
    }
  },

};