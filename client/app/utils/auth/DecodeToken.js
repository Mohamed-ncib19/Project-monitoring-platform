const { jwtDecode } = require("jwt-decode");

const DecodeToken = (token) =>{
try {
    const decodedToken = jwtDecode(token);
    return {
       username: decodedToken.username,
       role : decodedToken.role,
       exp: decodedToken.exp,
    
    };
} catch (error) {
    throw error;
}
}


module.exports = {DecodeToken}