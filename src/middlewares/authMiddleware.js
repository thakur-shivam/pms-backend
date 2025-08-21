import { apiError, asyncHandler, verifyAccessToken } from "../utils/index.js";
import model from "../models/usersModel.js";

const verifyJWT = asyncHandler( async (req, _, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1]

    if (!token) {
        new apiError(401, `Unauthorized request!`)
    }

    //  Verify JWT token
    const decodedToken = await verifyAccessToken(token)
    const user = await model.getUserById(decodedToken?.id)

    if(!user) {
        new apiError(401, `Invalid access token!`)
    }
    delete user.password
    delete user.refresh_token

    req.user = user
    next(); // Continue to the next middleware/controller
});

export { verifyJWT };
