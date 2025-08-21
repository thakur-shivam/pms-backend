import { apiError } from "../utils/index.js"

const verifyAccess = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res
        .status(403)
        .json(
          new apiError(403, `Unauthorized request!`)
        )
    }

    if (allowedRoles.includes(req.user.role_id)) {
      next()
    } else {
      res
        .status(403)
        .json(
          new apiError(403, `Access Denied: Only roles ${allowedRoles} can access this route`)
        )
    }
  }
}

export { verifyAccess }
