import mysql from "mysql2/promise";

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "rootpassword",
  database: "books",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
export default connection;
