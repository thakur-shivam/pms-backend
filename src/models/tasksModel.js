import { connection } from "../config/database/index.js"

const getAllTasks  = async () => {
    try {
        const [result] = await connection.promise().query(
            `SELECT * FROM tasks`
        )
        return result
    } catch (error) {
        throw new Error(`Failed to fetch all task details`)
    }
}


const getAllTaskById = async (id) => {
    try {
        const [result] = await connection.promise().query(
            `SELECT * FROM tasks where id = ?`, 
            [id]
        )
        return result.length ? result[0] : null
    } catch (error) {
        throw new Error(`Failed to fetch task details`)
    }
}

const createTask = async (id, name, project_id, status_id, priority_id, due_date) => {
    try {
        const [result] = await connection.promise().query(
            `INSERT INTO tasks (id, name, project_id, status_id, priority_id, due_date) VALUES (?, ?, ?, ?, ?, ?)`,
            [id, name, project_id, status_id, priority_id, due_date]
        )
        return { 
            id, 
            name, 
            project_id, 
            status_id, 
            priority_id, 
            due_date 
        }
    } catch (error) {
        throw new Error(`Failed to create task`)
    }
}

const updateTask = async (id, name, project_id, status_id, priority_id, due_date) => {
    try {
        const [result] = await connection.promise().query(
            `UPDATE tasks SET name = ?, project_id = ?, status_id = ?, priority_id = ?, due_date = ? WHERE id = ?`,
            [name, project_id, status_id, priority_id, due_date, id]
        )
        if (result.affectedRows === 0) return null
        return { 
            id, 
            name, 
            project_id, 
            status_id, 
            priority_id, 
            due_date 
        }
    } catch (error) {
        throw new Error(`Failed to update task`)
    }
}

const deleteTask = async (id) => {
    try {
        const [result] = await connection.promise().query(
            `DELETE FROM tasks WHERE id = ?`, 
            [id]
        )
        if (result.affectedRows === 0) return null
        return { 
            id, 
            message: `Task deleted successfully`
        }
    } catch (error) {
        throw new Error(`Failed to delete task`)
    }
}

export default { 
    getAllTasks, 
    getAllTaskById, 
    createTask, 
    updateTask, 
    deleteTask 
}
