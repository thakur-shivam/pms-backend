import dotenv from "dotenv"

dotenv.config({
    path: "./.env"
})

const env = {
    PORT: Number(process.env.PORT),
    DB_PORT: Number(process.env.DB_PORT),
    DB_HOST: String(process.env.DB_HOST),
    DB_USER: String(process.env.DB_USER),
    DB_PASSWORD: String(process.env.DB_PASSWORD),
    CORS_ORIGIN: String(process.env.CORS_ORIGIN),
    ACCESS_TOKEN_SECRET: String(process.env.ACCESS_TOKEN_SECRET),
    ACCESS_TOKEN_EXPIRY: String(process.env.ACCESS_TOKEN_EXPIRY),
    REFRESH_TOKEN_SECRET: String(process.env.REFRESH_TOKEN_SECRET),
    REFRESH_TOKEN_EXPIRY: String(process.env.REFRESH_TOKEN_EXPIRY),
    CLOUDINARY_CLOUD_NAME: String(process.env.CLOUDINARY_CLOUD_NAME),
    CLOUDINARY_API_KEY: String(process.env.CLOUDINARY_API_KEY),
    CLOUDINARY_API_SECRET: String(process.env.CLOUDINARY_API_SECRET)
}

export { env }
