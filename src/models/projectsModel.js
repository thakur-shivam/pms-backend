import { connection } from "../config/database/index.js"

const getAllProjects = async () => {
    try {
        const [result] = await connection.promise().query(
            `SELECT * FROM projects`
        )
        return result
    } catch (error) {
        throw new Error(`Failed to fetch all project details`)
    }
}

const getProjectById = async (id) => {
    try {
        const [result] = await connection.promise().query(
            `SELECT * FROM projects WHERE id = ?`, 
            [id]
        )
        return result.length ? result[0] : null
    } catch (error) {
        throw new Error(`Failed to fetch project details`)
    }
}

const createProject = async (id, name, status_id, start_date, end_date) => {
    try {
        const [result] = await connection.promise().query(
            `INSERT INTO projects (id, name, status_id, start_date, end_date) VALUES (?, ?, ?, ?, ?)`,
            [id, name, status_id, start_date, end_date]
        )
        return { 
            id, 
            name, 
            status_id, 
            start_date, 
            end_date 
        }
    } catch (error) {
        throw new Error(`Failed to create project`)
    }
}


const updateProject = async (id, name, status_id, start_date, end_date) => {
    try {
        const [result] = await connection.promise().query(
            `UPDATE projects SET name = ?, status_id = ?, start_date = ?, end_date = ? WHERE id = ?`,
            [name, status_id, start_date, end_date, id]
        )
        if(result.affectedRows === 0) return null
        return { 
            id, 
            name, 
            status_id, 
            start_date, 
            end_date 
        }
    } catch (error) {
        throw new Error(`Failed to update project`)
    } 
}


const deleteProject = async (id) => {
    try {
        const [result] = await connection.promise().query(
            `DELETE FROM projects WHERE id = ?`, 
            [id]
        )
        if(result.affectedRows === 0) return null
        return { 
            id, 
            message: `Project deleted successfully` 
        }
    } catch (error) {
        throw new Error(`Failed to delete project`)
    }
}

const projectSummary = async () => {
    try {
        const [result] = await connection.promise().query(`
            SELECT 
            p.id AS project_id, 
            p.name AS project_name,
            COUNT(t.id) AS total_tasks,
            ROUND((SUM(CASE WHEN ts.status_name = 'Completed' THEN 1 ELSE 0 END) / COUNT(t.id)) * 100, 2) AS completion_percentage
            FROM projects p
            LEFT JOIN tasks t ON p.id = t.project_id
            LEFT JOIN task_statuses ts ON t.status_id = ts.id
            LEFT JOIN project_status ps ON p.status_id = ps.id
            GROUP BY p.id, p.name, ps.status_name;`
        )
        return result
    } catch (error) {
        throw new Error(`Failed to fetch project summary`)
    }
}

export default {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    projectSummary
}
