import { verifyJWT, verifyAccess } from "../middlewares/index.js"
import { Router } from "express";
import {
    getAllMeetingMinutes, 
    getMeetingMinutesById, 
    createMeetingMinutes, 
    updateMeetingMinutes, 
    deleteMeetingMinutes
} from "../controllers/meetingMinutesController.js"

const router = Router()
router.use(verifyJWT)

router.route('/select').get(getAllMeetingMinutes)
router.route('/select/:id').get(getMeetingMinutesById)
router.route('/create').post(verifyAccess("hpN_VC5SbLEcpLZXAh6d", "3AYbpym8ISACIL5RB9M3"), createMeetingMinutes)
router.route('/update/:id').put(verifyAccess("hpN_VC5SbLEcpLZXAh6d", "3AYbpym8ISACIL5RB9M3"), updateMeetingMinutes)
router.route('/delete/:id').delete(verifyAccess("hpN_VC5SbLEcpLZXAh6d", "3AYbpym8ISACIL5RB9M3"), deleteMeetingMinutes)

export default router