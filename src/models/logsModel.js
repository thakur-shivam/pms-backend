import { connection } from "../config/database/index.js"

const getAllLogs = async () => {
    try {
        const [result] = await connection.promise().query(
            `SELECT * FROM logs`
        )
        return result
    } catch (error) {
        throw new Error(`Failed to fetch all log details`)
    }
}

const getLogById = async (id) => {
    try {
        const [result] = await connection.promise().query(
            `SELECT * FROM logs WHERE id = ?`, 
            [id]
        )
        return result.length ? result[0] : null
    } catch (error) {
        throw new Error(`Failed to fetch log details`)
    }
}

const createLog = async (id, user_id, action, timestamp) => {
    try {
        const [result] = await connection.promise().query(
            `INSERT INTO logs (id, user_id, action, timestamp) VALUES (?, ?, ?, ?)`,
            [id, user_id, action, timestamp]
        )
        return { 
            id, 
            user_id, 
            action,
            timestamp
        }
    } catch (error) {
        throw new Error(`Failed to create log`)
    }
}

const updateLog = async (id, user_id, action, timestamp) => {
    try {
        const [result] = await connection.promise().query(
            `UPDATE logs SET user_id = ?, action = ?, timestamp = ? WHERE id = ?`,
            [user_id, action, timestamp, id]
        )
        if (result.affectedRows === 0) return null
        return { 
            id, 
            user_id, 
            action, 
            timestamp
        }
    } catch (error) {
        throw new Error(`Failed to update log`)
    }
}

const deleteLog = async (id) => {
    try {
        const [result] = await connection.promise().query(
            `DELETE FROM logs WHERE id = ?`, 
            [id]
        )
        if (result.affectedRows === 0) return null
        return { 
            id,
            message: `Log deleted successfully` 
        }
    } catch (error) {
        throw new Error(`Failed to delete log`)
    }
}

export default { 
    getAllLogs, 
    getLogById, 
    createLog, 
    updateLog, 
    deleteLog 
}
