import axios from 'axios';

axios.defaults.baseURL = process.env.URL_ENDPOINTS;

async function getPrograms() {
  try {
    const res = await axios.get('http://192.168.1.31:3000/programs');
    if (res.data.ok) {
      return { ok: true, status: 200, data: res.data.data };
    } else {
      return { ok: false, status: 404, msg: res.data.msg };
    }
  } catch (error) {
    return { ok: false, status: 500, msg: 'failed to get ' };
  }
}
async function getProductsByPrograms(id) {
  try {
    const res = await axios.post('http://localhost:5000/program/products', {
      id: id,
    });
    if (res.data.ok) {
      console.log(res.data.data.products);
      return { ok: true, data: res.data.data };
    } else {
      return { ok: false, msg: res.data.error };
    }
  } catch (error) {
    return { ok: false, status: 500, msg: 'server error' };
  }
}

export {
  /* LoginRoute,registerRoute, refreshToken,*/ getPrograms,
  getProductsByPrograms,
};
