const bodyParser = require("body-parser");
const express = require("express");

// importing user routes
const authRoute = require("../interface/http/routes/auth");

function _configureServer(app, appConfig) {
  console.log("Configuring server...");
  app.use((req, _, next) => { // TODO log to rabbit mq
    console.log(
      `\nReq: ${req.method} ${req.url} ${new Date().toString()} ${
        req.connection.remoteAddress
      }`
    );
    next();
  });

  //  body parser
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  _setRoutes(app, appConfig);
}

function _setRoutes(app, appConfig) {
  app.use(authRoute);

  app.use(function (req, res, next) {
    res.status(404).send({ error: `Route not found in ${appConfig.app.name}` });
    return;
  });
}


module.exports.initServer = (app, appConfig) => {
  // setup the server before starting it
  _configureServer(app, appConfig);

  console.log("Starting server...");
  app.listen(appConfig.app.port, (err) => {
    if (err) {
      // server run failed
      console.log(`Failed to listen on port ${appConfig.app.port}`);
      console.error(err);
      process.exit(1);
    } else {
      // server run success
      console.log(`Listening on port ${appConfig.app.port}`);
    }
  });
};
