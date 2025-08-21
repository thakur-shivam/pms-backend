import { apiError, apiResponse, asyncHandler, generateUniqueId } from "../utils/index.js"
import model from "../models/documentsModel.js"

const getAllDocuments = asyncHandler( async (req, res) => {
    const result = await model.getAllDocuments()

    return res
        .status(200)
        .json(
            new apiResponse(200, result, `All document details fetched successfully`)
        )
})

const getDocumentById = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.getDocumentById(id)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `Document with id: ${id} does not exist!`)
            )
    }

    return res
        .status(200)
        .json(
            new apiResponse(200, result, `Document details fetched successfully`)
        )
})

const createDocument = asyncHandler( async (req, res) => {
    const { name, project_id, uploaded_by, file_path } = req.body
    if (!name || !project_id || !uploaded_by || !file_path) {
        return res
            .status(400)
            .json(
                new apiError(400, `All fields are required!`)
            )
    }
    const id = await generateUniqueId()
    const result = await model.createDocument(id, name, project_id, uploaded_by, file_path)

    return res
        .status(201)
        .json(
            new apiResponse(201, result, `Document created successfully`)
        )
})

const updateDocument = asyncHandler( async (req, res) => {
    const { id } = req.params
    const { name, project_id, uploaded_by, file_path } = req.body
    const result = await model.updateDocument(id, name, project_id, uploaded_by, file_path)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `Document with id: ${id} does not exist!`)
            )
    }
    
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `Document updated successfully`)
        )
})

const deleteDocument = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.deleteDocument(id)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `Document with id: ${id} does not exist!`)
            )
    }

    return res
        .status(200)
        .json(
            new apiResponse(200, result, `Document deleted successfully`)
        )
})

export {
    getAllDocuments,
    getDocumentById,
    createDocument,
    updateDocument,
    deleteDocument
}