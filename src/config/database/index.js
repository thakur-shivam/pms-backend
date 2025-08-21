import { env } from "../env/index.js"
import mysql from "mysql2"
import { DB_NAME } from "../../constants.js"
import fs from "fs"

const connection = mysql.createConnection({
  host: env.DB_HOST,
  port: env.DB_PORT,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: DB_NAME,
  ssl: {
    ca: fs.readFileSync("./src/config/database/ca.pem")
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
