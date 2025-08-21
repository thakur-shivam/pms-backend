import { verifyJWT, verifyAccess } from "../middlewares/index.js"
import { Router } from "express";
import {
    getAllUserProjects, 
    getUserProjectById, 
    createUserProject, 
    updateUserProject, 
    deleteUserProject
} from "../controllers/userProjectsController.js"

const router = Router()
router.use(verifyJWT)

router.route('/select').get(getAllUserProjects)
router.route('/select/:id').get(getUserProjectById)
router.route('/create').post(verifyAccess("hpN_VC5SbLEcpLZXAh6d"), createUserProject)
router.route('/update:id').put(verifyAccess("hpN_VC5SbLEcpLZXAh6d"), updateUserProject)
router.route('/delete/:id').delete(verifyAccess("hpN_VC5SbLEcpLZXAh6d"), deleteUserProject)

export default router