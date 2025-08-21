import { verifyJWT, verifyAccess } from "../middlewares/index.js"
import { Router } from "express";
import {
    getAllTaskStatuses, 
    getTaskStatusById, 
    createTaskStatus, 
    updateTaskStatus, 
    deleteTaskStatus
} from "../controllers/taskStatusesController.js"

const router = Router()
router.use(verifyJWT)

router.route('/select').get(getAllTaskStatuses)
router.route('/select/:id').get(getTaskStatusById)
router.route('/create').post(verifyAccess("hpN_VC5SbLEcpLZXAh6d"), createTaskStatus)
router.route('/update/:id').put(verifyAccess("hpN_VC5SbLEcpLZXAh6d"), updateTaskStatus)
router.route('/delete/:id').delete(verifyAccess("hpN_VC5SbLEcpLZXAh6d"), deleteTaskStatus)

export default router