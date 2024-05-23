import { decode } from 'base-64';

import 'core-js/stable/atob';

const { jwtDecode } = require('jwt-decode');

const DecodeToken = (token) => {
  try {
    global.atob = decode;
    const decodedToken = jwtDecode(token);
    return {
      username: decodedToken.username,
      role: decodedToken.role,
      exp: decodedToken.exp,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = { DecodeToken };
