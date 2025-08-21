import { connection } from "../config/database/index.js"

const getAllDocuments = async () => {
    try {
        const [result] = await connection.promise().query(
            `SELECT * FROM documents`
        )
        return result
    } catch (error) {
        throw new Error(`Failed to fetch all document details`)
    }
}

const getDocumentById = async (id) => {
    try {
        const [result] = await connection.promise().query(
            `SELECT * FROM documents WHERE id = ?`, 
            [id]
        )
        return result.length? result[0] : null
    } catch (error) {
        throw new Error(`Failed to fetch document details`)
    }
}

const createDocument = async (id, name, project_id, uploaded_by, file_path) => {
    try {
        const [result] = await connection.promise().query(
            `INSERT INTO documents (id, name, project_id, uploaded_by, file_path) VALUES (?, ?, ?, ?, ?)`,
            [id, name, project_id, uploaded_by, file_path]
        )
        return { 
            id,  
            name, 
            project_id, 
            uploaded_by, 
            file_path 
        }
    } catch (error) {
        throw new Error(`Failed to create document`)
    }
}

const updateDocument = async (id, name, project_id, uploaded_by, file_path) => {
    try {
        const [result] = await connection.promise().query(
            `UPDATE documents SET name = ?, project_id = ?, uploaded_by = ?, file_path = ? WHERE id = ?`,
            [name, project_id, uploaded_by, file_path, id]
        )
        if (result.affectedRows === 0) return null
        return { 
            id, 
            name, 
            project_id, 
            uploaded_by, 
            file_path 
        }
    } catch (error) {
        throw new Error(`Failed to update document`)
    }
}

const deleteDocument = async (id) => {
    try {
        const [result] = await connection.promise().query(
            `DELETE FROM documents WHERE id = ?`, 
            [id]
        )
        if (result.affectedRows === 0) return null
        return { 
            id, 
            message: `Document deleted successfully` 
        }
    } catch (error) {
        throw new Error(`Failed to delete document`)
    }
}

export default {
    getAllDocuments,
    getDocumentById,
    createDocument,
    updateDocument,
    deleteDocument
}
