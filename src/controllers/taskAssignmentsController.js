import { apiError, apiResponse, asyncHandler, generateUniqueId } from "../utils/index.js"
import model from "../models/taskAssigneesModel.js"

const getAllTaskAssignments = asyncHandler( async (req, res) => {
    const result = await model.getAllTaskAssignments()
    
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `All task assignment details fetched successfully`)
        )
})

const createTaskAssignment = asyncHandler( async (req, res) => {
    const { task_id, user_id } = req.body
    if (!task_id || !user_id) {
        return res
            .status(400)
            .json(
                new apiError(400, `All fields are required!`)
            )
    }
    const id = await generateUniqueId()
    const result = await model.createTaskAssignment(id, task_id, user_id)
    
    return res
        .status(201)
        .json(
            new apiResponse(201, result, `Task assignment created successfully`)
        )
})

const deleteTaskAssignment = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.deleteTaskAssignment(id)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `Task assignment with id: ${id} does not exist!`)
            )
    }
    
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `Task assignment deleted successfully`)
        )
})


export {
    getAllTaskAssignments,
    createTaskAssignment,
    deleteTaskAssignment
}
