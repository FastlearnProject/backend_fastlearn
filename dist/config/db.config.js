"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _promise = require("mysql2/promise");
var _dotenv = require("dotenv");
(0, _dotenv.config)();

/**
 * Conexión a la base de datos MySQL utilizando un pool de conexiones.
 * 
 * @type {Object}
 * 
 */
var conexion = (0, _promise.createPool)({
  host: process.env.MYSQLHOST || "db4free.net",
  user: process.env.MYSQLUSER || "basedatos_fl",
  password: process.env.MYSQLPASSWORD || "basedatos_fl",
  port: process.env.MYSQLPORT || 3306,
  database: process.env.MYSQLDATABASE || "basedatos_fl",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
var _default = exports["default"] = conexion;