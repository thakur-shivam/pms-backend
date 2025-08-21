import { verifyJWT } from "../middlewares/index.js"
import { Router } from "express";
import {
    getAllLogs,
    getLogById,
    createLog,
    updateLog,
    deleteLog
} from "../controllers/logsController.js"

const router = Router()
router.use(verifyJWT)

router.route('/select').get(getAllLogs)
router.route('/select/:id').get(getLogById)
router.route('/create').post(createLog)
router.route('/update/:id').put(updateLog)
router.route('/delete/:id').delete(deleteLog)

export default router