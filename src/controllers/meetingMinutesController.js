import { apiError, apiResponse, asyncHandler, generateUniqueId } from "../utils/index.js"
import model from "../models/meetingMinutesModel.js"

const getAllMeetingMinutes = asyncHandler( async (req, res) => {
    const result = await model.getAllMeetingMinutes()
    
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `All meeting minutes detail fetched successfully`)
        )
})

const getMeetingMinutesById = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.getMeetingMinutesById(id)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `Meeting minutes with id: ${id} does not exist!`)
            )
    }
    
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `Meeting minutes detail fetched successfully`)
        )
})

const createMeetingMinutes = asyncHandler( async (req, res) => {
    const { project_id, date, attendees, notes } = req.body
    if (!project_id || !date || !attendees || !notes) {
        return res
            .status(400)
            .json(
                new apiError(400, `All fields are required!`)
            )
    }
    
    // Get the user from the authenticated request
    const created_by = req.user?.id || 'Unknown User'

    const id = await generateUniqueId()
    const result = await model.createMeetingMinutes(id, project_id, date, attendees, notes, created_by)
    
    return res
        .status(201)
        .json(
            new apiResponse(201, result, `Meeting minutes created successfully`)
        )
})

const updateMeetingMinutes = asyncHandler( async (req, res) => {
    const { id } = req.params
    const { project_id, date, attendees, notes } = req.body
    const result = await model.updateMeetingMinutes(id, project_id, date, attendees, notes)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `Meeting minutes with id: ${id} does not exist!`)
            )
    }

    return res
        .status(201)
        .json(
            new apiResponse(201, result, `Meeting minutes updated successfully`)
        )
})

const deleteMeetingMinutes = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.deleteMeetingMinutes(id)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `Meeting minutes with id: ${id} does not exist!`)
            )
    }
        
    return res
        .status(201)
        .json(
            new apiResponse(201, result, `Meeting minutes deleted successfully`)
        )
})

export { 
    getAllMeetingMinutes,
    getMeetingMinutesById,
    createMeetingMinutes,
    updateMeetingMinutes,
    deleteMeetingMinutes
}