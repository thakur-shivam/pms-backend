import { verifyJWT, verifyAccess } from "../middlewares/index.js"
import { Router } from "express"
import { 
    getAllDocuments,
    getDocumentById,
    createDocument,
    updateDocument,
    deleteDocument
} from "../controllers/documentsController.js"

const router = Router()
router.use(verifyJWT)

router.route('/select').get(getAllDocuments)
router.route('/select/:id').get(getDocumentById)
router.route('/create').post(verifyAccess("hpN_VC5SbLEcpLZXAh6d", "3AYbpym8ISACIL5RB9M3"), createDocument)
router.route('/update/:id').put(verifyAccess("hpN_VC5SbLEcpLZXAh6d", "3AYbpym8ISACIL5RB9M3"), updateDocument)
router.route('/delete/:id').delete(verifyAccess("hpN_VC5SbLEcpLZXAh6d", "3AYbpym8ISACIL5RB9M3"), deleteDocument)

export default router