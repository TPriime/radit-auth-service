const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const _privateKeyPath = "../keys/private.pem";

const SIGN_ALGORITHM = "HS256";
const TOKEN_EXPIRED = "Token Expired";
const FILE_ENCODING_UTF8 = "utf8";


class JWTHandler {

  constructor () {
    this._cert = fs.readFileSync(
      path.join(__dirname, _privateKeyPath),
      FILE_ENCODING_UTF8
    );
    this._expiry = process.env.ACCESS_TOKEN_EXPIRES || '600s'
  }

  // returns accessToken's payload
  _payloadAccessToken(authId) {
    return {
      authId: authId,
      extra: 'some_youverify_extra_data'
    };
  } 

  // Creates an accessToken storing the username as payload
  genAccessToken(username) {
    return jwt.sign(
      this._payloadAccessToken(username), 
      this._cert, {
      expiresIn: this._expiry,
      algorithm: SIGN_ALGORITHM,
    });
  }

  // returns decoded data of accessToken
  verifyAccessToken(token) {
    try {
      return { valid: true, data: jwt.verify(token, this._cert) };
    } catch (err) {
      if (err.name.includes("TokenExpiredError")) {
        return { valid: false, error: TOKEN_EXPIRED };
      }
      return { valid: false, error: err };
    }
  }

}


const jwtInstance = new JWTHandler();

module.exports = jwtInstance;
