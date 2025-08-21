import { apiError, apiResponse, asyncHandler, generateUniqueId } from "../utils/index.js"
import model from "../models/userProjectsModel.js"

const getAllUserProjects = asyncHandler( async (req, res) => {
    const result = await model.getAllUserProjects()
    
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `All user project details fetched successfully`)
        )
})

const getUserProjectById = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.getUserProjectById(id)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `User project with id: ${id} does not exist!`)
            )
    }
    
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `User project details fetched successfully`)
        )
})

const createUserProject = asyncHandler( async (req, res) => {
    const { user_id, project_id } = req.body
    if (!user_id || !project_id) {
        return res
            .status(400)
            .json(
                new apiError(400, `userId and projectId are required!`)
            )
    }
    const id = await generateUniqueId()
    const result = await model.createUserProject(id, user_id, project_id)
    
    return res
        .status(201)
        .json(
            new apiResponse(201, result, `User project created successfully`)
        )
})

const updateUserProject = asyncHandler( async (req, res) => {
    const { id } = req.params
    const { user_id, project_id } = req.body
    const result = await model.updateUserProject(id, user_id, project_id)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `User project with id: ${id} does not exits!`)
            )
    }
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `User porject updated successfully`)
        )
})

const deleteUserProject = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.deleteUserProject(id)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `User project with id: ${id} does not exist!`)
            )
    }
    
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `User project deleted successfully`)
        )
})

export { 
    getAllUserProjects,
    getUserProjectById,
    createUserProject,
    updateUserProject,
    deleteUserProject
}