import { verifyJWT, verifyAccess } from "../middlewares/index.js"
import { Router } from "express";
import {
    getAllProjectStatuses, 
    getProjectStatusById, 
    createProjectStatus, 
    updateProjectStatus, 
    deleteProjectStatus
} from "../controllers/projectStatusesController.js"

const router = Router()
router.use(verifyJWT)

router.route('/select').get(getAllProjectStatuses)
router.route('/select/:id').get(getProjectStatusById)
router.route('/create').post(verifyAccess("hpN_VC5SbLEcpLZXAh6d"), createProjectStatus)
router.route('/update/:id').put(verifyAccess("hpN_VC5SbLEcpLZXAh6d"), updateProjectStatus)
router.route('/delete/:id').delete(verifyAccess("hpN_VC5SbLEcpLZXAh6d"), deleteProjectStatus)

export default router