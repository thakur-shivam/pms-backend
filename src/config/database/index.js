import { env } from "../env/index.js"
import mysql from "mysql2"
import { DB_NAME } from "../../constants.js"
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const caCert = fs.readFileSync(path.join(__dirname, 'ca.pem'));

const connection = mysql.createConnection({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: DB_NAME,
  ssl: {
    ca: caCert
  }
})

const connectDB = () => (
  connection.connect((error) => {
    if (error) {
      console.log(`Database connection error: ${error}`)
      return
    }
    console.log(`Database connected successfully`)
  })
)

export { connection, connectDB }
