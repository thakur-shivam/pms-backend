import { connection } from "../config/database/index.js"

const getAllUserProjects = async () => {
    try {
        const [result] = await connection.promise().query(`
            SELECT up.*, 
            u.name AS user_name, 
            p.name AS project_name 
            FROM user_projects up 
            JOIN users u ON up.user_id = u.id 
            JOIN projects p ON up.project_id = p.id
        `)
        return result
    } catch (error) {
        throw new Error(`Failed to fetch all user project details`)
    }
}

const getUserProjectById = async (id) => {
    try {
        const [result] = await connection.promise().query(`
            SELECT up.*, 
            u.name AS user_name, 
            p.name AS project_name 
            FROM user_projects up 
            JOIN users u ON up.user_id = u.id 
            JOIN projects p ON up.project_id = p.id 
            WHERE up.id = ?`, 
            [id]
        )
        return result.length ? result[0] : null
    } catch (error) {
        throw new Error(`Failed to fetch user project details`)
    }
}

const createUserProject = async (id, user_id, project_id) => {
    try {
        const [result] = await connection.promise().query(
            `INSERT INTO user_projects (id, user_id, project_id) VALUES (?, ?, ?)`,
            [id, user_id, project_id]
        )
        return { 
            id, 
            user_id, 
            project_id 
        }
    } catch (error) {
        throw new Error(`Failed to create user project`)
    }
}

const updateUserProject = async (id, user_id, project_id) => {
    try {
        const [result] = await connection.promise().query(
            `UPDATE user_projects SET user_id = ?, project_id = ? WHERE id = ?`,
            [user_id, project_id, id]
        )
        if (result.affectedRows === 0) return null
        return { 
            id, 
            user_id, 
            project_id 
        }
    } catch (error) {
        throw new Error(`Failed to update user project`)
    }
}

const deleteUserProject = async (id) => {
    try {
        const [result] = await connection.promise().query(
            `DELETE FROM user_projects WHERE id = ?`, 
            [id]
        )
        if (result.affectedRows === 0) return null
        return { 
            id, 
            message: `User project assignment deleted successfully`
        }
    } catch (error) {
        throw new Error(`Failed to delete user project`)
    }
}

export default { 
    getAllUserProjects, 
    getUserProjectById, 
    createUserProject, 
    updateUserProject, 
    deleteUserProject 
}
