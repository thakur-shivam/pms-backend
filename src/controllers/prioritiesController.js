import { apiError, apiResponse, asyncHandler, generateUniqueId } from "../utils/index.js"
import model from "../models/prioritiesModel.js"

const getAllpriorities =  asyncHandler( async (req, res) => {
    const result = await model.getAllPriorities()
    
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `All priority details fetched successfully`)
        )
})

const getPriorityById = asyncHandler( async(req, res) => {
    const { id } = req.body
    const result = await model.getPriorityById(id)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `Priority with id: ${id} does not exist!`)
            )
    }
        
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `Priority details fetched successfully`)
        )
})

const createPriority = asyncHandler( async (req, res) => {
    const { priority_name } = req.body
    if (!priority_name || typeof priority_name !== 'string') {
        return res
            .status(400)
            .json(
                new apiError(400, `Priority Name is required and must be a string!`)
            )
    }
    const id = await generateUniqueId()
    const result = await model.createPriority(id, priority_name)
    
    return res
        .status(201)
        .json(
            new apiResponse(201, result, `Priority created successfully`)
        )
})

const updatePriority = asyncHandler( async (req, res) => {
    const { id } = req.params
    const { priority_name } = req.body
    if (!priority_name) {
        return res
            .status(400)
            .json(
                new apiError(400, `Priority Name is required!`)
            )
    }
    
    const result = await model.updatePriority(id, priority_name)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `Priority with id: ${id} does not exist!`)
            )
    }
    
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `Priority updated successfully`)
        )
})

const deletePriority = asyncHandler( async (req, res) => {
    const { id } = req.params
    
    const result = await model.deletePriority(id)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `Priority with id: ${id} does not exist!`)
            )
    }
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `Priority deleted successfully`)
        )
})

export {
    getAllpriorities,
    getPriorityById,
    createPriority,
    updatePriority,
    deletePriority
}