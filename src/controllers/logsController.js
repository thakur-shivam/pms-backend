import { apiError, apiResponse, asyncHandler, generateUniqueId } from "../utils/index.js"
import model from "../models/logsModel.js"

const getAllLogs = asyncHandler( async (req, res) => {
    const result = await model.getAllLogs()

    return res
        .status(200)
        .json(
            new apiResponse(200, result, `All log details fetched successfully`)
        )
})

const getLogById = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.getLogById(id)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `Log with id: ${id} does not exist!`)
            )
    }
    
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `Log details fetched successfully`)
        )
})

const createLog = asyncHandler( async (req, res) => {
    const { user_id, action, timestamp } = req.body
    if (!user_id || !action) {
        return res
            .status(400)
            .json(
                new apiError(400, `All fields are required!`)
            )
    }
    const id = await generateUniqueId()

    // Use current timestamp if not provided
    const currentTimestamp = timestamp || new Date().toISOString();
    const result = await model.createLog(id, user_id, action, currentTimestamp)
    
    return res
        .status(201)
        .json(
            new apiResponse(201, result, `Log created successfully`)
        )
})

const updateLog = asyncHandler( async (req, res) => {
    const { id } = req.params
    const { user_id, action, timestamp } = req.body
    const result = await model.updateLog(id, user_id, action, timestamp)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `Log with id: ${id} does not exist!`)
            )
    }
    
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `Log updated successfully`)
        )
})

const deleteLog = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.deleteLog(id)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `Log with id: ${id} does not exist!`)
            )
    }
    
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `Log deleted successfully`)
        )
})

export { 
    getAllLogs,
    getLogById,
    createLog,
    updateLog,
    deleteLog
}