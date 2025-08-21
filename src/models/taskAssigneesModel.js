import { connection } from "../config/database/index.js"

const getAllTaskAssignees = async () => {
    try {
        const [result] = await connection.promise().query(`
            SELECT ta.*, t.name as task_name, u.name as user_name 
            FROM task_assignees ta 
            JOIN tasks t ON ta.task_id = t.id 
            JOIN users u ON ta.user_id = u.id
        `)
        return result
    } catch (error) {
        throw new Error(`Failed to fetch all task assignee details`)
    }
}

const getTaskAssigneeById = async (id) => {
    try {
        const [result] = await connection.promise().query(`
            SELECT ta.*, t.name as task_name, u.name as user_name 
            FROM task_assignees ta 
            JOIN tasks t ON ta.task_id = t.id 
            JOIN users u ON ta.user_id = u.id 
            WHERE ta.id = ?`, 
            [id]
        )
        return result.length ? result[0] : null
    } catch (error) {
        throw new Error(`Failed to fetch task assignee details`)
    }
}

const createTaskAssignee = async (id, task_id, user_id) => {
    try {
        const [result] = await connection.promise().query(
            `INSERT INTO task_assignees (id, task_id, user_id) VALUES (?, ?, ?)`,
            [id, task_id, user_id]
        )
        return { 
            id, 
            task_id, 
            user_id 
        }
    } catch (error) {
        throw new Error(`Failed to create task assignee`)
    }
}

const updateTaskAssignee = async (id, task_id, user_id) => {
    try {
        const [result] = await connection.promise().query(
            `UPDATE task_assignees SET task_id = ?, user_id = ? WHERE id = ?`,
            [task_id, user_id, id]
        )
        if (result.affectedRows === 0) return null
        return { 
            id, 
            task_id, 
            user_id 
        }
    } catch (error) {
        throw new Error(`Failed to update task assignee`)
    }
}

const deleteTaskAssignee = async (id) => {
    try {
        const [result] = await connection.promise().query(
            `DELETE FROM task_assignees WHERE id = ?`, 
            [id]
        )
        if (result.affectedRows === 0) return null
        return { 
            id,  
            message: `Task assignee deleted successfully`
        }
    } catch (error) {
        throw new Error(`Failed to delete task assignee`)
    }
}

export default { 
    getAllTaskAssignees,
    getTaskAssigneeById,
    createTaskAssignee,
    updateTaskAssignee,
    deleteTaskAssignee
}