import { verifyJWT, verifyAccess } from "../middlewares/index.js"
import { Router } from "express";
import { 
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} from "../controllers/tasksController.js"

const router = Router()
router.use(verifyJWT)

router.route('/select').get(getAllTasks)
router.route('/select/:id').get(getTaskById)
router.route('/create').post(verifyAccess("hpN_VC5SbLEcpLZXAh6d"), createTask)
router.route('/update/:id').put(verifyAccess("hpN_VC5SbLEcpLZXAh6d"), updateTask)
router.route('/delete/:id').delete(verifyAccess("hpN_VC5SbLEcpLZXAh6d"), deleteTask)

export default router