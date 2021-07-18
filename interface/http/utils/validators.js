// validation
const Joi = require("@hapi/joi");

const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(256).required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

module.exports.loginValidation = loginValidation;
