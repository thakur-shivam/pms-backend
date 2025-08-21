import { apiError, apiResponse, asyncHandler, generateUniqueId } from "../utils/index.js"
import model from "../models/rolesModel.js"

const getAllRoles = asyncHandler( async (req, res) => {
    const result = await model.getAllRoles()
    
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `All role details fetched successfully`)
        )
})

const getRoleById = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.getRoleById(id)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `Role with id: ${id} does not exist!`)
            )
    }
        
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `Role details fetched successfully`)
        )
})

const createRole = asyncHandler( async (req, res) => {
    const { role_name } = req.body
    if (!role_name || typeof role_name !== 'string') {
        return res
            .status(400)
            .json(
                new apiError(400, `Role Name is required and must be a string!`)
            )
    }
    const id = await generateUniqueId()
    const result = await model.createRole(id, role_name)
    
    return res
        .status(201)
        .json(
            new apiResponse(200, result, `Role created successfully`)
        )
})

const updateRole = asyncHandler( async (req, res) => {
    const { id } = req.params
    const { role_name } = req.body
    if (!role_name) {
        return res
            .status(400)
            .json(
                new apiError(400, `Role Name is required!`)
            )
    }
    const result = await model.updateRole(id, role_name)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `Role with id: ${id} does not exist!`)
            )
    }
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `Role updated successfully`)
        )
})

const deleteRole = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.deleteRole(id)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `Role with id: ${id} does not exist!`)
            )
    }
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `Role deleted successfully`)
        )
})

export {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
}