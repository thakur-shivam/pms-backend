import { connection } from "../config/database/index.js"

const getAllMeetingMinutes = async () => {
    try {
        const [result] = await connection.promise().query(`
            SELECT * FROM meeting_minutes
        `)
        return result
    } catch (error) {
        throw new Error(`Failed to fetch all meeting minutes details`)
    }
}

const getMeetingMinutesById = async (id) => {
    try {
        const [result] = await connection.promise().query(
            `SELECT * FROM meeting_minutes WHERE id = ?`, 
            [id]
        )
        return result.length ? result[0] : null
    } catch (error) {
        throw new Error(`Failed to fetch meeting minutes details`)
    }
}

const createMeetingMinutes = async (id, project_id, date, attendees, notes, created_by) => {
    try {
        const [result] = await connection.promise().query(
            `INSERT INTO meeting_minutes (id, project_id, date, attendees, notes, created_by) VALUES (?, ?, ?, ?, ?, ?)`,
            [id, project_id, date, attendees, notes, created_by]
        )
        return {
            id, 
            project_id,
            date,
            attendees,
            notes,
            created_by
        }
    } catch (error) {
        throw new Error(`Failed to create meeting minutes`)
    }
}

const updateMeetingMinutes = async (id, project_id, date, attendees, notes) => {
    try {
        const [result] = await connection.promise().query(
            `UPDATE meeting_minutes SET project_id = ?, date = ?, attendees = ?, notes = ? WHERE id = ?`,
            [project_id, date, attendees, notes, id]
        )
        if (result.affectedRows === 0) return null
        return { 
            id, 
            project_id, 
            date, 
            attendees, 
            notes 
        }
    } catch (error) {
        throw new Error(`Failed to update meeting minutes`)
    }
}

const deleteMeetingMinutes = async (id) => {
    try {
        const [result] = await connection.promise().query(
            `DELETE FROM meeting_minutes WHERE id = ?`, 
            [id]
        )
        if (result.affectedRows === 0) return null
        return { 
            id,
            message: `Meeting minutes deleted successfully`
        }
    } catch (error) {
        throw new Error(`Failed to delete meeting minutes`)
    }
}

export default {
    getAllMeetingMinutes,
    getMeetingMinutesById,
    createMeetingMinutes,
    updateMeetingMinutes,
    deleteMeetingMinutes
}
