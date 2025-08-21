import { verifyJWT, verifyAccess } from "../middlewares/index.js"
import { Router } from "express";
import { 
    getAllTaskAssignees, 
    getTaskAssigneeById, 
    createTaskAssignee, 
    updateTaskAssignee, 
    deleteTaskAssignee
} from "../controllers/taskAssigneesController.js"

const router = Router()
router.use(verifyJWT)

router.route('/select').get(getAllTaskAssignees)
router.route('/select/:id').get(getTaskAssigneeById)
router.route('/create').post(verifyAccess("hpN_VC5SbLEcpLZXAh6d", "3AYbpym8ISACIL5RB9M3"), createTaskAssignee)
router.route('/update/:id').put(verifyAccess("hpN_VC5SbLEcpLZXAh6d", "3AYbpym8ISACIL5RB9M3"), updateTaskAssignee)
router.route('/delete/:id').delete(verifyAccess("hpN_VC5SbLEcpLZXAh6d", "3AYbpym8ISACIL5RB9M3"), deleteTaskAssignee)

export default router