import { apiError, apiResponse, asyncHandler, generateUniqueId } from "../utils/index.js"
import model from "../models/tasksModel.js"

const getAllTasks = asyncHandler( async (req, res) => {
    const result = await model.getAllTasks()
    
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `All task details fetched successfully`)
        )
})

const getTaskById = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.getTaskById(id)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `Task with id: ${id} does not exist!`)
            )
    }
    
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `Task details fetched successfully`)
        )
})

const createTask = asyncHandler( async (req, res) => {
    const { name, project_id, status_id, priority_id, due_date } = req.body
    if (!name || !priority_id || !status_id || !project_id || !due_date) {
        return res
            .status(400)
            .json(
                new apiError(400, `All fields are required!`)
            )
    }
    const id = await generateUniqueId()
    const result = await model.createTask(id, name, project_id, status_id, priority_id, due_date)
    return res
        .status(201)
        .json(
            new apiResponse(201, result, `Task created successfully`)
        )
})

const updateTask = asyncHandler( async (req, res) => {
    const { id } = req.params
    const { name, project_id, status_id, priority_id, due_date } = req.body
    const result = await model.updateTask(id, name, project_id, status_id, priority_id, due_date)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `Task with id: ${id} does not exist!`)
            )
    }
    
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `Task updated successfully`)
        )
})

const deleteTask = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.deleteTask(id)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `Task with id: ${id} does not exist!`)
            )
    }
    
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `Task deleted successfully`)
        )
})

export {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
}