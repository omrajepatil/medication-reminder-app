import Router from 'express';
import { createMedicine, deleteData, fetchAllMedicine , updateMedicine} from '../controllers/medicine.js';
import { authMiddleware } from '../middleware/auth.js';

const medicineRouter = Router();

medicineRouter.post('/create',authMiddleware, createMedicine);

medicineRouter.get('/get',authMiddleware,fetchAllMedicine);

medicineRouter.put('/update/:id',authMiddleware,updateMedicine);

medicineRouter.delete('/delete/:id',authMiddleware,deleteData);


export default medicineRouter