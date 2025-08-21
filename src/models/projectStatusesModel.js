import { connection } from  "../config/database/index.js"

const getAllProjectStatuses = async () => {
    try {
        const [result] = await connection.promise().query(
            `SELECT * FROM project_statuses`
        )
        return result
    } catch (error) {
        throw new Error(`Failed to fetch all project status details`)
    }
}

const getProjectStatusById = async (id) => {
    try {
        const [result] = await connection.promise().query(
            `SELECT * FROM project_statuses WHERE id = ?`, 
            [id]
        )
        return result.length ? result[0] : null
    } catch (error) {
        throw new Error(`Failed to fetch project status details`)
    }
}

const createProjectStatus = async (id, status_name) => {
    try {
        const [result] = await connection.promise().query(
            `INSERT INTO project_statuses (id, status_name) VALUES (?, ?)`, 
            [id, status_name]
        )
        return {
            id, 
            status_name
        }
        
    } catch (error) {
        throw new Error(`Failed to create project status`)
    }
}

const updateProjectStatus = async (id, status_name) => {
    try {
        const [result] = await connection.promise().query(
            `UPDATE project_statuses SET status_name = ? WHERE id = ?`, 
            [status_name, id] 
        )
        if (result.affectedRows === 0) return null
        return { 
            id, 
            status_name
        }
    } catch (error) {
        throw new Error(`Failed to update project status`)
    }
}

const deleteProjectStatus = async (id) => {
    try {
        const [result] = await connection.promise().query(
            `DELETE FROM project_statuses WHERE id = ?`,
            [id]
        )
        if (result.affectedRows === 0) return null
        return {
            id, 
            message: `Project status deleted successfully`
        }
    } catch (error) {
        throw new Error(`Failed to delete project status`)
    }
}

export default {
    getAllProjectStatuses,
    getProjectStatusById,
    createProjectStatus,
    updateProjectStatus,
    deleteProjectStatus
}
