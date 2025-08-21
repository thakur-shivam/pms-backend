import { apiError, apiResponse, asyncHandler, generateUniqueId } from "../utils/index.js"
import model from "../models/notificationsModel.js"

const getAllNotifications = asyncHandler( async (req, res) => {
    const result = await model.getAllNotifications()
    
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `All notification details fetched successfully`)
        )
})

const getNotificationById = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.getNotificationById(id)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `Notification with id: ${id} does not exist!`)
            )
    }
    
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `Notification details fetched successfully`)
        )
})

const createNotification = asyncHandler( async (req, res) => {
    const { message, status } = req.body
    if (!message) {
        return res
            .status(400)
            .json(
                new apiError(400, `Message is required!`)
            )
    }

    const id = await generateUniqueId()
    const result = await model.createNotification(id, message, status || 'unread')
    
    return res
        .status(201)
        .json(
            new apiResponse(201, result, `Notification created successfully`)
        )
})

const updateNotification = asyncHandler( async (req, res) => {
    const { id } = req.params
    const { user_id, message, status } = req.body
    const result = await model.updateNotification(id, user_id, message, status)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `Notification with id: ${id} does not exist!`)
            )
    }
    
    return res
        .status(201)
        .json(
            new apiResponse(201, result, `Notification updated successfully`)
        )
})

const deleteNotification = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.deleteNotification(id)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `Notification with id: ${id} does not exist!`)
            )
    }
    
    return res
        .status(201)
        .json(
            new apiResponse(201, result, `Notification deleted successfully`)
        )
})

const markNotificationAsRead = asyncHandler( async (req, res) => {
    const { id } = req.params
    const result = await model.markNotificationAsRead(id)
    if (!result) {
        return res
            .status(404)
            .json(
                new apiError(404, `Notification with id: ${id} does not exist!`)
            )
    }
        
    return res
        .status(200)
        .json(
            new apiResponse(200, result, `Notification mark as "Read" successfully`)
        )
})

export { 
    getAllNotifications,
    getNotificationById,
    createNotification,
    updateNotification,
    deleteNotification,
    markNotificationAsRead
}