import { connection } from "../config/database/index.js"

const getAllReports = async () => {
    try {
        const [result] = await connection.promise().query(
            `SELECT * FROM reports`
        )
        return result
    } catch (error) {
        throw new Error(`Failed to fetch all report details`)
    }
}

const getReportById = async (id) => {
    try {
        const [result] = await connection.promise().query(
            `SELECT * FROM reports WHERE id = ?`, 
            [id]
        )
        return result.length ? result[0] : null
    } catch (error) {
        throw new Error(`Failed to fetch report details`)
    }
}

const createReport = async (id, project_id, generated_by, report_type, data) => {
    try {
        const [result] = await connection.promise().query(
            `INSERT INTO reports (id, project_id, generated_by, report_type, data) VALUES (?, ?, ?, ?, ?)`,
            [id, project_id, generated_by, report_type, data]
        )
        return { 
            id, 
            project_id, 
            generated_by, 
            report_type, 
            data 
        }
    } catch (error) {
        throw new Error(`Failed to create report`)
    }
}

const updateReport = async (id, project_id, generated_by, report_type, data) => {
    try {
        const [result] = await connection.promise().query(
            `UPDATE reports SET project_id = ?, generated_by = ?, report_type = ?, data = ? WHERE id = ?`,
            [project_id, generated_by, report_type, data, id]
        )
        if (result.affectedRows === 0) return null
        return { 
            id, 
            project_id, 
            generated_by, 
            report_type, 
            data 
        }
    } catch (error) {
        throw new Error(`Failed to update report`)
    }
}

const deleteReport = async (id) => {
    try {
        const [result] = await connection.promise().query(
            `DELETE FROM reports WHERE id = ?`, 
            [id]
        )
        if (result.affectedRows === 0) return null
        return { 
            id,
            message: `Report deleted successfully`
        }
    } catch (error) {
        throw new Error(`Failed to delete report`)
    }
}

const getAggregateReport = async () => {
    try {
        const [result] = await connection.promise().query(`
            SELECT 
            p.id AS project_id,
            p.name AS project_name,
            COUNT(t.id) AS total_tasks,
            SUM(CASE WHEN ts.status_name = 'Completed' THEN 1 ELSE 0 END) AS completed_tasks,
            SUM(CASE WHEN ts.status_name = 'Pending' THEN 1 ELSE 0 END) AS pending_tasks,
            ROUND((SUM(CASE WHEN ts.status_name = 'Completed' THEN 1 ELSE 0 END) / COUNT(t.id)) * 100, 2) AS completion_percentage,
            ps.status_name AS project_status
            FROM projects p
            LEFT JOIN tasks t ON p.id = t.project_id
            LEFT JOIN task_statuses ts ON t.status_id = ts.id
            LEFT JOIN project_status ps ON p.status_id = ps.id
            GROUP BY p.id, p.name, ps.status_name;
        `)
        return result
    } catch (error) {
        throw new Error(`Failed to fetch aggregate report`)
    }
}



export default { 
    getAllReports,
    getReportById,
    createReport,
    updateReport,
    deleteReport,
    getAggregateReport
}
