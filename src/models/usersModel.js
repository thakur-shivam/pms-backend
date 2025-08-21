import { connection } from "../config/database/index.js"

const getAllUsers = async () => {
    try {
        const [result] = await connection.promise().query(`
            SELECT u.id, u.name, u.email, u.password, u.role_id, r.role_name 
            FROM pms_db.users u 
            INNER JOIN pms_db.roles r ON r.id = u.role_id
        `)
        return result
    } catch (error) {
        throw new Error(`Failed to fetch all user details`)
    }
}

const getUserById = async (id) => {
    try {
        const [result] = await connection.promise().query(`
            SELECT u.id, u.name, u.email, u.password, u.role_id, r.role_name 
            FROM pms_db.users u  
            INNER JOIN pms_db.roles r ON r.id = u.role_id  
            WHERE u.id = ?`, 
            [id]
        )
        return result.length ? result[0] : null
    } catch (error) {
        throw new Error(`Failed to fetch user details`)
    }
}

const getUserByEmail = async (email) => {
    try {
        const [result] = await connection.promise().query(`
            SELECT u.id, u.name, u.email, u.password, u.role_id, r.role_name 
            FROM pms_db.users u  
            INNER JOIN pms_db.roles r ON r.id = u.role_id  
            WHERE email = ?`,
            [email]
        )
        return result.length ? result[0] : null
    } catch (error) {
        throw new Error(`Failed to fetch user details`)
    }
}

const createUser = async (id, name, email, password, role_id) => {
    try {
        const [result] = await connection.promise().query(
            `INSERT INTO users (id, name, email, password, role_id) VALUES (?, ?, ?, ?, ?)`,
            [id, name, email, password, role_id]
        )
        return { 
            id, 
            name, 
            email, 
            role_id 
        }
    } catch (error) {
        throw new Error(`Failed to create user`)
    }
}

const updateUser = async (id, name, email, role_id) => {
    try {
        const [result] = await connection.promise().query(
            `UPDATE users SET name = ?, email = ?, role_id = ? WHERE id = ?`,
            [name, email, role_id, id]
        )
        if (result.affectedRows === 0) return null
        return { 
            id, 
            name, 
            email, 
            role_id 
        }
    } catch (error) {
        throw new Error(`Failed to update user`)
    }
}

const updatePassword = async (id, password) => {
    try {
        const [result] = await connection.promise().query(`
            UPDATE users SET password = ? WHERE id = ?`, 
            [password, id]
        )
        if (result.affectedRows === 0) return null
        return {
            id, 
            message: `Password updated successfully`
        }
    } catch (error) {
        throw new Error(`Failed to update password`)
    }
}

const updateRefreshToken = async (id, refreshToken) => {
    try {
        const [result] = await connection.promise().query(`
            UPDATE users SET refresh_token = ? WHERE id = ?`, 
            [refreshToken, id]
        )
        if (result.affectedRows === 0) return null
        return {
            id, 
            refreshToken
        }
    } catch (error) {
        throw new Error(`Failed to update refresh token`)
    }
}

const deleteUser = async (id) => {
    try {
        const [result] = await connection.promise().query(
            `DELETE FROM users WHERE id = ?`, 
            [id]
        )
        if (result.affectedRows === 0) return null
        return { 
            id, 
            message: `User deleted successfully`
        }
    } catch (error) {
        throw new Error(`Failed to delete user`)
    }
}

export default { 
    getAllUsers, 
    getUserById, 
    getUserByEmail, 
    createUser, 
    updateUser, 
    updatePassword, 
    updateRefreshToken, 
    deleteUser 
}
