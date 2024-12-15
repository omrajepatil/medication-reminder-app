import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";

import { logAcknowledgment,getLogData, getById } from "../controllers/acknowledgment.js";

const logRouter = Router();

logRouter.post('/create',authMiddleware, logAcknowledgment);

logRouter.get('/get',authMiddleware,getLogData);

logRouter.get('/getById/:id',getById);




export default logRouter;