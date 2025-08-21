import { verifyJWT, verifyAccess } from "../middlewares/index.js"
import { Router } from "express";
import { 
    getAllProjects, 
    getProjectById, 
    createProject, 
    updateProject, 
    deleteProject, 
    projectSummary
} from "../controllers/projectsController.js"

const router = Router()
router.use(verifyJWT)

router.route('/select').get(getAllProjects)
router.route('/summary').get(projectSummary)
router.route('/select/:id').get(getProjectById)
router.route('/create').post(verifyAccess("hpN_VC5SbLEcpLZXAh6d", "3AYbpym8ISACIL5RB9M3"), createProject)
router.route('/update/:id').put(verifyAccess("hpN_VC5SbLEcpLZXAh6d", "3AYbpym8ISACIL5RB9M3"), updateProject)
router.route('/delete/:id').delete(verifyAccess("hpN_VC5SbLEcpLZXAh6d", "3AYbpym8ISACIL5RB9M3"), deleteProject)

export default router