import { apiError, apiResponse, asyncHandler, generateUniqueId } from "../utils/index.js"
import model from "../models/projectsModel.js"

const getAllProjects = asyncHandler( async (req, res) => {
    const result = await model.getAllProjects()
    
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `All project details fetched successfully`)
        )
})

const getProjectById = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.getProjectById(id)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `Project with id: ${id} does not exist!`)
            )
    }

    return res
        .status(200)
        .json(
            new apiResponse(200, result, `Project details fetched successfully`)
        )
})

const createProject = asyncHandler( async (req, res) => {
    const { name, status_id, start_date, end_date } = req.body

    if(!name || !status_id || !start_date || !end_date) {
        return res
            .status(400)
            .json(
                new apiError(400, `All fields are required!`)
            )
    }
    const id = await generateUniqueId()
    const result = await model.createProject(id, name, status_id, start_date, end_date)
    
    return res
        .status(201)
        .json(
            new apiResponse(201, result, `Project created successfully`)
        )
})

const updateProject = asyncHandler( async (req, res) => {
    const { id } = req.params
    const { name, status_id, start_date, end_date } = req.body
    const result = await model.updateProject(id, name, status_id, start_date, end_date)
    
    if(!result) {
        return res
        .status(404)
        .json(
            new apiError(404, `Project with id: ${id} does not exist!`)
        )
    }
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `Project updated successfully`)
        )
})

const deleteProject = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.deleteProject(id)
    
    if(!result) {
        return res
        .status(404)
        .json(
            new apiError(404, `Project with id: ${id} does not exist!`)
        )
    }
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `Project deleted successfully`)
        )
})

const projectSummary = asyncHandler( async (req, res) => {
    const result = await model.projectSummary()
    
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `Project summary details fetched successfully`)
        )
})

export {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    projectSummary
}