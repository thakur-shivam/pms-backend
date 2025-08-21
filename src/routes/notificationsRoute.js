import { verifyJWT, verifyAccess } from '../middlewares/index.js'
import { Router } from "express";
import {
    getAllNotifications, 
    getNotificationById, 
    createNotification, 
    updateNotification, 
    deleteNotification,
    markNotificationAsRead
} from "../controllers/notificationsController.js"

const router = Router()
router.use(verifyJWT)

router.route('/select').get(getAllNotifications)
router.route('/select/:id').get(getNotificationById)
router.route('/create').post(verifyAccess("hpN_VC5SbLEcpLZXAh6d"), createNotification)
router.route('/update/:id').put(verifyAccess("hpN_VC5SbLEcpLZXAh6d"), updateNotification)
router.route('/mark-read/:id').put(markNotificationAsRead)
router.route('/delete/:id').delete(verifyAccess("hpN_VC5SbLEcpLZXAh6d"), deleteNotification)

export default router