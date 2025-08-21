import { verifyJWT, verifyAccess } from "../middlewares/index.js"
import { Router } from "express";
import {
    getAllpriorities, 
    getPriorityById, 
    createPriority, 
    updatePriority, 
    deletePriority
} from "../controllers/prioritiesController.js"

const router = Router()
router.use(verifyJWT)

router.route('/select').get(getAllpriorities)
router.route('/select/:id').get(getPriorityById)
router.route('/create').post(verifyAccess("hpN_VC5SbLEcpLZXAh6d"), createPriority)
router.route('/update/:id').put(verifyAccess("hpN_VC5SbLEcpLZXAh6d"), updatePriority)
router.route('/delete/:id').delete(verifyAccess("hpN_VC5SbLEcpLZXAh6d"), deletePriority)

export default router