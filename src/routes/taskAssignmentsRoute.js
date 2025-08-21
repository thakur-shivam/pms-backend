import { verifyJWT, verifyAccess } from "../middlewares/index.js"
import { Router } from "express"

import {
    getAllTaskAssignments, 
    createTaskAssignment, 
    deleteTaskAssignment
} from "../controllers/taskAssignmentsController.js"

const router = Router()
router.use(verifyJWT)

router.route('/select').get(verifyAccess("hpN_VC5SbLEcpLZXAh6d", "3AYbpym8ISACIL5RB9M3"), getAllTaskAssignments)
router.route('/create').post(verifyAccess("hpN_VC5SbLEcpLZXAh6d", "3AYbpym8ISACIL5RB9M3"), createTaskAssignment)
router.route('/delete/:id').delete(verifyAccess("hpN_VC5SbLEcpLZXAh6d", "3AYbpym8ISACIL5RB9M3"), deleteTaskAssignment)

export default router