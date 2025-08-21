import { apiError, apiResponse, asyncHandler, generateUniqueId } from "../utils/index.js"
import model from "../models/taskStatusesModel.js"

const getAllTaskStatuses = asyncHandler( async (req , res) => {
    const result = await model.getAllTaskStatuses()
    
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `All task status details fetched successfully`)
        )
})

const getTaskStatusById = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.getTaskStatusById(id)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `Task status with id: ${id} does not exist!`)
            )
    }

    return res
        .status(200)
        .json(
            new apiResponse(200, result, `Task status details fetched successfully`)
        )
})

const createTaskStatus = asyncHandler( async (req, res) => {
    const { status_name } = req.body
    if (!status_name || typeof status_name !== 'string') {
        return res
            .status(400)
            .json(
                new apiError(400, `Status Name is required and must be a string!`)
            )
    }
    const id = await generateUniqueId()
    const result = await model.createTaskStatus(id, status_name)
    
    return res
        .status(201)
        .json(
            new apiResponse(201, result, `Task status created successfully`)
        )
})

const updateTaskStatus = asyncHandler( async (req, res) => {
    const { id } = req.params
    const { status_name } = req.body
    if (!status_name) {
        return res
            .status(400)
            .json(
                new apiError(400, `Status Name is required!`)
            )
    }
    const result = await model.updateTaskStatus(id, status_name)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `Task status with id: ${id} does not exist!`)
            )
    }
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `Task status updated successfully`)
        )
})

const deleteTaskStatus = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.deleteTaskStatus(id)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `Task status with id: ${id} does not exist!`)
            )
    }
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `Task status deleted successfully`)
        )
})

export {
    getAllTaskStatuses,
    getTaskStatusById,
    createTaskStatus,
    updateTaskStatus,
    deleteTaskStatus 
}