import { Router } from "express";

import { logAcknowledgment } from "../controllers/acknowledgment.js";

const logRouter = Router();

logRouter.post('/create',logAcknowledgment);


export default logRouter;