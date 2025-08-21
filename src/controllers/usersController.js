import { 
    apiError, 
    apiResponse, 
    asyncHandler, 
    generateAccessToken, 
    generateRefreshToken, 
    generateUniqueId, 
    encryptPassword, 
    comparePassword
} from "../utils/index.js"
import model from "../models/usersModel.js"
import nodemailer from "nodemailer"
import otpGenerator from "otp-generator"

const generateAccessAndRefreshToken = async (id) => {
    try {
        const user = await model.getUserById(id)
        const accessToken = generateAccessToken(user) 
        const refreshToken = generateRefreshToken(user) 
        await model.updateRefreshToken(user.id, refreshToken)
    
        return { accessToken, refreshToken }
    } catch (error) {
        throw new apiError(500, `Something went wrong while generating referesh and access token`)
    }
}

const getAllUsers = asyncHandler( async (req, res) => {
    const result = await model.getAllUsers()
    
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `All user details fetched successfully`)
        )
})

const getUserById = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.getUserById(id)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `User with id: ${id} does not exist!`)
            )
    }
    
    res
    .status(200)
    .json(
        new apiResponse(200, result, `User details fetched successfully`)
    )
})

const createUser = asyncHandler( async (req, res) => {
    const { name, email, password, role_id } = req.body
    if (!name || !email || !password || !role_id) {
        return res
            .status(400)
            .json(
                new apiError(400, `All fields are required!`)
            )
    }

    const user = await model.getUserByEmail(email)
    if(user) {
        return res
            .status(404)
            .json(
                new apiError(404, `User with email: ${email} already exists!`)
            )
    }
    const id = await generateUniqueId()
    const hashedPassword = await encryptPassword(password)
    
    const result = await model.createUser(id, name, email, hashedPassword, role_id)
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `User created successfully`)
        )
})

const updateUser = asyncHandler( async (req, res) => {
    const { id } = req.params
    const { name, email, password, role_id } = req.body
    if(password) {
        const result = await model.updateUser(id, name, email, role_id)
        if (!result) {
            return res
                .status(404)
                .json(
                    new apiError(404, `User with id: ${id} does not exist!`)
                )
        }
        const hashedPassword = await encryptPassword(password)
        await model.updatePassword(id, hashedPassword)
        return res
            .status(200)
            .json(
                new apiResponse(200, result, `User updated successfully`)
            )
    } else {
        const result = await model.updateUser(id, name, email, role_id)
        if (!result) {
            return res
                .status(404)
                .json(
                    new apiError(404, `User with id: ${id} does not exist!`)
                )
        }
        
        return res
            .status(201)
            .json(
                new apiResponse(200, result, `User updated successfully`)
            )
    }
    
})

const deleteUser = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.deleteUser(id)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `User with id: ${id} does not exist!`)
            )
    }
    
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `User deleted successfully`)
        )
})

const login = asyncHandler( async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res
            .status(400)
            .json(
                new apiError(400, `Email and password are required!`)
            )
    }

    const user = await model.getUserByEmail(email)
    if(!user) {
        return res
            .status(404)
            .json(
                new apiError(404, `User with email: ${email} does not exist!`)
            )
    }
    const isPasswordCorrect = await comparePassword(password, user.password)
    if(!isPasswordCorrect) {
        return res
            .status(404)
            .json(
                new apiError(404, `Invalid password!`)
            )
    }
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user.id)
    const loggedInUser = await model.getUserById(user.id)
    delete loggedInUser.password
    delete loggedInUser.refresh_token

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new apiResponse(
                200,
                {
                    user: loggedInUser, 
                    accessToken, 
                    refreshToken
                },
                `Login successfully`
            )
        )
})

const logout = asyncHandler( async (req, res) => {
    await model.updateRefreshToken(req.user.id, null)
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
           new apiResponse(
                200,
                {},
                `Logout successfully`
            )
        )

})

const profile = asyncHandler( async (req, res) => {
    const result = req.user

    return res
        .status(200)
        .json(
            new apiResponse(200, result, `Access granted`)
        )
})

const otpStore = {};

// Request OTP for Password Reset
const requestOtp = asyncHandler( async (req, res) => {
    const { email } = req.body
    const user = await model.getUserByEmail(email)
    if (!user) {
        return res
            .status(404)
            .json(
                new apiError(404, `User with id: ${id} does not exist!`)
            )
    }

    // Generate OTP
    const otp = otpGenerator.generate(
        6,
        { 
            digits: true,
            alphabets: false,
            upperCase: false,
            specialChars: false
        }
    )
    otpStore[email] = otp; // Store OTP temporarily

    // Send OTP via email (using Nodemailer)
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: "your-email@gmail.com", pass: "your-email-password" }
    })

    await transporter.sendMail({
        from: "your-email@gmail.com",
        to: email,
        subject: "Password Reset OTP",
        text: `Your OTP is: ${otp}`
    })

    return res
        .status(200)
        .json(
            new apiResponse(200, `OTP send on registered email id`)
        )
})

//  Verify OTP and Reset Password
const resetPassword = asyncHandler( async (req, res) => {
    const { email, otp, newPassword } = req.body
    if (otpStore[email] !== otp) {
        return res
            .status(400)
            .json(
                new apiError(400, `Invalid otp!`)
            )
    }

    const hashedPassword = await bcrypt.hash(newPassword, 5)
    await usersModel.updatePassword(email, hashedPassword)

    delete otpStore[email]; // Remove OTP after successful reset
    
    return res
        .status(200)
        .json(
            new apiResponse(200, `Password reset successfully`)
        )
})


export {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login,
    logout, 
    profile,
    requestOtp,
    resetPassword
}