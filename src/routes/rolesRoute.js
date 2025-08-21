import { verifyJWT, verifyAccess } from "../middlewares/index.js"
import { Router } from "express";
import {
    getAllRoles, 
    getRoleById, 
    createRole, 
    updateRole, 
    deleteRole
} from "../controllers/rolesController.js"

const router = Router()
router.use(verifyJWT)

router.route('/select').get(getAllRoles)
router.route('/select/:id').get(getRoleById)
router.route('/create').post(verifyAccess("hpN_VC5SbLEcpLZXAh6d"), createRole)
router.route('/update/:id').put(verifyAccess("hpN_VC5SbLEcpLZXAh6d"), updateRole)
router.route('/delete/:id').delete(verifyAccess("hpN_VC5SbLEcpLZXAh6d"), deleteRole)

export default router