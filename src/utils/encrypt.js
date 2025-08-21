import bcrypt from "bcrypt"

const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const encryptedPassword = await bcrypt.hash(password, salt)
    return encryptedPassword
}

const comparePassword = async (password, encryptedPassword) => {
    const isPasswordCorrect = await bcrypt.compare(password, encryptedPassword)
    return isPasswordCorrect
}

export { encryptPassword, comparePassword }