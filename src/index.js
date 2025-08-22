import { env } from "../config/env/index.js"
import { connectDB } from "../config/database/index.js"
import app from "../app.js"

const PORT = env.PORT || 3000

connectDB()

app.on("ERROR", (error) => {
    console.log("ERROR: ", error)
    throw error
})
app.listen(PORT, () => {
    console.log(`sever is running on http://localhost:${PORT}`)
})
