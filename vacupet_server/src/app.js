"use strict";
exports.__esModule = true;
var application_1 = require("./application");
require("reflect-metadata");
var port = parseInt(process.env.PORT) || 3000;
var app = new application_1.App(port, []);
app.listen();
