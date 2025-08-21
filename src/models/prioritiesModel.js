import { connection } from "../config/database/index.js"

const getAllPriorities = async () => {
    try {
        const [result] = await connection.promise().query(
            `SELECT * FROM priorities`
        )
        return result
    } catch (error) {
        throw new Error(`Failed to fetch all priority details`)
    }
}

const getPriorityById = async (id) => {
    try {
        const [result] = await connection.promise().query(
            `SELECT * FROM priorities WHERE id = ?`, 
            [id]
        )
        return result.length ? result[0] : null
    } catch (error) {
        throw new Error(`Failed to fetch priority details`)
    }
}

const createPriority = async (id, priority_name) => {
    try {
        const [result] = await connection.promise().query(
            `INSERT INTO priorities (id, priority_name) VALUES (?, ?)`,
            [id, priority_name]
        )
        return { 
            id, 
            priority_name 
        }
    } catch (error) {
        throw new Error(`Failed to create priority`)
    }
}

const updatePriority = async (id, priority_name) => {
    try {
        const [result] = await connection.promise().query(
            `UPDATE priorities SET priority_name = ? WHERE id = ?`, 
            [priority_name, id] 
        )
        if (result.affectedRows === 0) return null
        return { 
            id, 
            priority_name
        }
    } catch (error) {
        throw new Error(`Failed to update priority`)
    }
}

const deletePriority = async (id) => {
    try {
        const [result] = await connection.promise().query(
            `DELETE FROM priorities WHERE id = ?`,
            [id]
        )
        if (result.affectedRows === 0) return null
        return {
            id,
            message: `Priority deleted successfully`
        }
    } catch (error) {
        throw new Error(`Failed to delete priority`)
    }
}

export default {
    getAllPriorities,
    getPriorityById,
    createPriority,
    updatePriority,
    deletePriority
}
