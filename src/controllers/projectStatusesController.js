import { apiError, apiResponse, asyncHandler, generateUniqueId } from "../utils/index.js"
import model from "../models/projectStatusesModel.js"

const getAllProjectStatuses = asyncHandler( async (req, res) => {
    const result = await model.getAllProjectStatuses()
    
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `All project status details fetched successfully`)
        )
})

const getProjectStatusById = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.getProjectStatusById(id)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `Project status with id: ${id} does not exist!`)
            )
    }
        
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `Project status details fetched successfully`)
        )
})

const createProjectStatus = asyncHandler( async (req, res) => {
    const { status_name } = req.body
    if (!status_name || typeof status_name !== 'string') {
        return res
            .status(400)
            .json(
                new apiError(400, `Status Name is required and must be a string!`)
            )
    }
    const id = await generateUniqueId()
    const result = await model.createProjectStatus(id, status_name)
    
    return res
        .status(201)
        .json(
            new apiResponse(201, result, `Project status created successfully`)
        )
})

const updateProjectStatus = asyncHandler( async (req, res) => {
    const { id } = req.params
    const { status_name } = req.body
    if (!status_name) {
        return res
            .status(400)
            .json(
                new apiError(400, `Status Name is required!`)
            )
    }
    const result = await  model.updateProjectStatus(id, status_name)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `Project status with id: ${id} does not exist!`)
            )
    }
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `Project status updated successfully`)
        )
})

const deleteProjectStatus = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.deleteProjectStatus(id)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `Project status with id: ${id} does not exist!`)
            )
    }
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `Project status deleted successfully`)
        )
})

export { 
    getAllProjectStatuses,
    getProjectStatusById,
    createProjectStatus,
    updateProjectStatus,
    deleteProjectStatus
}