import { createPool } from "mysql2/promise";
import { config } from "dotenv";

config();

const conexion = createPool({
    host: process.env.MYSQLHOST || "db4free.net",
    user: process.env.MYSQLUSER || "basedatos_fl",
    password: process.env.MYSQLPASSWORD || "basedatos_fl",
    port: process.env.MYSQLPORT || 3306,
    database: process.env.MYSQLDATABASE || "basedatos_fl",
    waitForConnections: process.env.WAIT || true,
    connectionLimit: process.env.WAIT || 10,
    queueLimit: process.env.QUEUE || 0
})

export default conexion;