require("dotenv").config();

const PROD_KEY = "prod";
const DEV_KEY = "dev";
const TEST_KEY = "test";

const DEFAULT_PORT = 6000
const DEFAULT_DB_NAME = "radit-customers"

const EXPRESS_CONFIG = Object.freeze({
  MAX_REQ_BODY_SIZE: "200kb",
  PUBLIC_DIRECTORY: "../public",
});

const dev = {
  name: DEV_KEY,
  app: {
    name: process.env.NAME,
    port: process.env.PORT || DEFAULT_PORT,
  },
  db: {
    name: `${process.env.DB_NAME || DEFAULT_DB_NAME}-${DEV_KEY}`,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
};

const test = {
  name: TEST_KEY,
  app: {
    name: process.env.NAME,
    port: process.env.PORT || DEFAULT_PORT,
  },
  db: {
    name: `${process.env.DB_NAME || DEFAULT_DB_NAME}-${TEST_KEY}`,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
};

const prod = {
  name: PROD_KEY,
  app: {
    name: process.env.NAME,
    port: process.env.PORT || DEFAULT_PORT,
  },
  db: {
    name: `${process.env.DB_NAME || DEFAULT_DB_NAME}`,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
};

const config = {
  dev,
  test,
  prod,
};

// 'dev' or 'test' or 'prod'
const env = _getEnvironment();

// pulls the [NODE_ENV] string from .env and creates environment config file
// if no valid env string is placed in .env then dev environment will be choosen as default
function _getEnvironment() {
  const tEnv = process.env.NODE_ENV;
  if (tEnv == PROD_KEY || tEnv == DEV_KEY || tEnv == TEST_KEY) return tEnv;
  console.log(
    "[Warning]: Invalid environment config in .env for key NODE_ENV\nPicking dev environment for running server"
  );
  return DEV_KEY;
}

// this method performs basic checks to check if environment config is valid
function checkIfEnvIsValid(env) {
  if (!env || !env.db || !env.db.name) {
    return false;
  }
  return true;
}

module.exports = config[env] || config[DEV_KEY];
module.exports.checkIfEnvIsValid = checkIfEnvIsValid;
module.exports.EXPRESS_CONFIG = EXPRESS_CONFIG;
