import { createPool } from "mysql2/promise";
import { config } from "dotenv";

config();

/**
 * Conexión a la base de datos MySQL utilizando un pool de conexiones.
 * 
 * @type {Object}
 * 
 */
const conexion = createPool({
    host: process.env.MYSQLHOST || "db4free.net",
    user: process.env.MYSQLUSER || "basedatos_fl",
    password: process.env.MYSQLPASSWORD || "basedatos_fl",
    port: process.env.MYSQLPORT || 3306,
    database: process.env.MYSQLDATABASE || "basedatos_fl",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export default conexion;