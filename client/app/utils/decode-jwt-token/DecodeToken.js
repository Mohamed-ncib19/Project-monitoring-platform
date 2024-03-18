const { jwtDecode } = require("jwt-decode");

const DecodeToken = (session) =>{
try {
    const token = session?.token;
    const decodedToken = jwtDecode(token);
    return decodedToken.email;
} catch (error) {
    throw error;
}
}


module.exports = {DecodeToken}