const router = require("express").Router();
const AuthMiddlewares = require("../middlewares/auth");
const AuthControllers = require("../controllers/auth");
const { internalServerError } = require("../utils/response");


/* user login route
    - validate body
    - validate password
*/
router.post(
  "/login",
  AuthMiddlewares.validateLoginFields,
  async (req, res) => {
    try {
      await AuthControllers.loginWithUsername(req, res);
    } catch (error) {
      internalServerError(res, error);
    }
  }
);


module.exports = router;
