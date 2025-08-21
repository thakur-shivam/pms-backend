import { apiError, apiResponse, asyncHandler, generateUniqueId } from "../utils/index.js"
import model from "../models/taskAssigneesModel.js"

const getAllTaskAssignees = asyncHandler( async (req, res) => {
    const result = await model.getAllTaskAssignees()
    
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `All task assignee details fetched successfully`)
        )
})

const getTaskAssigneeById = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.getTaskAssigneeById(id)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `Task assignee with id: ${id} does not exist!`)
            )
    }
    
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `Task assignee details fetched successfully`)
        )
})

const createTaskAssignee = asyncHandler( async (req, res) => {
    const { task_id, user_id } = req.body
    if (!task_id || !user_id) {
        return res
            .status(400)
            .json(
                new apiError(400, `All fields are required!`)
            )
    }
    const id = await generateUniqueId()
    const result = await model.createTaskAssignee(id, task_id, user_id)
    
    return res
        .status(201)
        .json(
            new apiResponse(201, result, `Task assignee created successfully`)
        )
})

const updateTaskAssignee = asyncHandler( async (req, res) => {
    const { id } = req.params
    const { task_id, user_id } = req.body
    const result = await model.updateTaskAssignee(id, task_id, user_id)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `Task assignee with id: ${id} does not exist!`)
            )
    }
    
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `Task assignee updated successfully`)
        )
})

const deleteTaskAssignee = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.deleteTaskAssignee(id)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `Task assignee with id: ${id} does not exist!`)
            )
    }
    
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `Task assignee deleted successfully`)
        )
})

export { 
    getAllTaskAssignees,
    getTaskAssigneeById,
    createTaskAssignee,
    updateTaskAssignee,
    deleteTaskAssignee
}
