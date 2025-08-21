import { connection } from "../config/database/index.js"

const getAllRoles = async () => {
    try {
        const [result] = await connection.promise().query(
            `SELECT * FROM roles`
        )
        return result
    } catch (error) {
        throw new Error(`Failed to fetch all role details`)
    }
}

const getRoleById = async (id) => {
    try {
        const [rows] = await connection.promise().query(
            `SELECT * FROM roles WHERE id = ?`, 
            [id]
        )
        return rows.length ? rows[0] : null
    } catch (error) {
        throw new Error(`Failed to fetch role details`)
    }
}

const createRole = async (id, role_name) => {
    try {
        const [result] = await connection.promise().query(
            `INSERT INTO roles (id, role_name) VALUES (?, ?)`,
            [id, role_name]
        )
        return { 
            id, 
            role_name 
        }
    } catch (error) {
        throw new Error(`Failed to create role`)
    }
}

const updateRole = async (id, role_name) => {
    try {
        const [result] = await connection.promise().query(
            `UPDATE roles SET role_name = ? WHERE id = ?`, 
            [role_name, id] 
        )
        if (result.affectedRows === 0) return null
        return { 
            id, 
            role_name
        }
    } catch (error) {
        throw new Error(`Failed to update role`)
    }
}

const deleteRole = async (id) => {
    try {
        const [result] = await connection.promise().query(
            `DELETE FROM roles WHERE id = ?`,
            [id]
        )
        if (result.affectedRows === 0) return null
        return {
            id, 
            message: `Role deleted successfully`
        }
    } catch (error) {
        throw new Error(`Failed to delete role`)
    }
}

export default {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
}
