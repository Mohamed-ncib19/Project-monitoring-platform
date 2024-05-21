const { default: AuthRoute } = require("../../app/api/routes/auth/authRoute");

const GetNewToken = async (refToken) =>{
    const newToken =  await AuthRoute.refreshToken(refToken);
    return newToken;
}
module.exports = {GetNewToken}