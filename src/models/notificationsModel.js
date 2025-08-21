import { connection } from "../config/database/index.js"

const getAllNotifications = async () => {
    try {
        const [result] = await connection.promise().query(
            `SELECT * FROM notifications`
        )
        return result
    } catch (error) {
        throw new Error(`Failed to fetch all notification details`)
    }
}

const getNotificationById = async (id) => {
    try {
        const [result] = await connection.promise().query(
            `SELECT * FROM notifications WHERE id = ?`, 
            [id]
        )
        return result.length ? result[0] : null
    } catch (error) {
        throw new Error(`Failed to fetch notification details`)
    }
}

const createNotification = async (id, message, status) => {
    try {
        const [result] = await connection.promise().query(
            `INSERT INTO notifications (id, message, status) VALUES (?, ?, ?)`,
            [id, message, status]
        )
        return { 
            id, 
            message, 
            status 
        }
    } catch (error) {
        throw new Error(`Failed to create notification`)
    }
}

const updateNotification = async (id, message, status) => {
    try {
        const [result] = await connection.promise().query(
            `UPDATE notifications SET message = ?, status = ? WHERE id = ?`,
            [message, status, id]
        )
        if (result.affectedRows === 0) return null
        return { 
            id, 
            message, 
            status 
        }
    } catch (error) {
        throw new Error(`Failed to update notification`)
    }
}

const deleteNotification = async (id) => {
    try {
        const [result] = await connection.promise().query(
            `DELETE FROM notifications WHERE id = ?`, 
            [id]
        )
        if (result.affectedRows === 0) return null
        return { 
            id,
            message: `Notification deleted successfully`
        }
    } catch (error) {
        throw new Error(`Failed to delete notification`)
    }
}

const markNotificationAsRead = async (id) => {
    try {
        const [result] = await connection.promise().query(
            `UPDATE notifications SET status = ? WHERE id = ?`,
            ['read', id]
        )
        if (result.affectedRows === 0) return null
        return { 
            id, 
            status: 'Read' 
        }
    } catch (error) {
        throw new Error(`Failed to mark notification as read`)
    }
}

export default { 
    getAllNotifications,
    getNotificationById,
    createNotification,
    updateNotification,
    deleteNotification,
    markNotificationAsRead
}
