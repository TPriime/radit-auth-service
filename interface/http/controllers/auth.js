const JWTHandler = require("../../../core/jwt");
const Errors = require("../utils/constants").errors;
const Success = require("../utils/constants").successMessages;

const _dummyUser = Object.freeze({
  username: "user",
  password: "password"
})

/* 
  User login with username   
*/
module.exports.loginWithUsername = async (req, res) => {
  // Here I have used a hardcoded user data dummy.
  // User should be fetch from a db and password should
  // compared to a hash like bcrypt.

  if (req.body.username != _dummyUser.username 
    || req.body.password != _dummyUser.password)
    return res
      .status(400)
      .json({ status: Errors.FAILED, message: Errors.INVALID_USERNAME_PASSWORD });

  return res.status(200).json({
    status: Success.SUCCESS,
    message: Success.LOGIN_SUCCESS,
    token: JWTHandler.genAccessToken(req.body.username),
  });
};


// Helper method
module.exports.verifyAccessToken = (refreshToken) => {
  return JWTHandler.verifyAccessToken(refreshToken);
};