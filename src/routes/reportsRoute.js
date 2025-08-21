import { verifyJWT, verifyAccess } from "../middlewares/index.js"
import { Router } from "express";
import {
    getAllReports, 
    getReportById, 
    createReport, 
    updateReport, 
    deleteReport,
    getAggregatedReport
} from "../controllers/reportsController.js"

const router = Router()
router.use(verifyJWT)

router.route('/select').get(getAllReports)
router.route('/aggregate').get(getAggregatedReport)
router.route('/select/:id').get(getReportById)
router.route('/create').post(verifyAccess("hpN_VC5SbLEcpLZXAh6d", "3AYbpym8ISACIL5RB9M3", "ew8j4L5Nbg0VI6lkUmR2"), createReport)
router.route('/update/:id').put(verifyAccess("hpN_VC5SbLEcpLZXAh6d", "3AYbpym8ISACIL5RB9M3", "ew8j4L5Nbg0VI6lkUmR2"), updateReport)
router.route('/delete/:id').delete(verifyAccess("hpN_VC5SbLEcpLZXAh6d", "3AYbpym8ISACIL5RB9M3", "ew8j4L5Nbg0VI6lkUmR2"), deleteReport)

export default router
