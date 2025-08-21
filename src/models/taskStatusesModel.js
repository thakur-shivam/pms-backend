import { connection } from "../config/database/index.js"

const getAllTaskStatuses = async () => {
    try {
        const [result] = await connection.promise().query(
            `SELECT * FROM task_statuses`
        )
        return result
    } catch (error) {
        throw new Error(`Failed to fetch all task status details`)
    }
}

const getTaskStatusById = async (id) => {
    try {
        const [result] = await connection.promise().query(
            `SELECT *FROM task_statuses WHERE id =?`, 
            [id]
        )
        return result.length ? result[0] : null
    } catch (error) {
        throw new Error(`Failed to fetch task status details`)
    }
}

const createTaskStatus = async (id, status_name) => {
    try {
        const [result] = await connection.promise().query(
            `INSERT INTO task_statuses (id, status_name) VALUES (?, ?)`, 
            [id, status_name]
        )
        return {
            id, 
            status_name
        }
    } catch (error) {
        throw new Error(`Failed to create task status`)
    }
}

const updateTaskStatus = async (id, status_name) => {
    try {
        const [result] = await connection.promise().query(
            `UPDATE task_statuses SET status_name = ? WHERE id = ?`, 
            [status_name, id] 
        )
        if (result.affectedRows === 0) return null
        return { 
            id,  
            status_name
        }
    } catch (error) {
        throw new Error(`Failed to update task status`)
    }
}


const deleteTaskStatus = async (id) => {
    try {
        const [result] = await connection.promise().query(
            `DELETE FROM task_statuses WHERE id = ?`,
            [id]
        )
        if (result.affectedRows === 0) return null
        return {
            id, 
            message: `Task Status deleted successfully`
        }
    } catch (error) {
        throw new Error(`Failed to delete task status`)
    }
}

export default { 
    getAllTaskStatuses, 
    getTaskStatusById, 
    createTaskStatus, 
    updateTaskStatus, 
    deleteTaskStatus 
}
