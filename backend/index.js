import express from 'express';
import sequelize from './config/connection.js'
import './models/user.js'
import userRouter from './routes/user.js';
import dotenv from 'dotenv'
import cors from "cors"
import medicineRouter from './routes/medicine.js';
import logRouter from './routes/acknowledgementRoute.js';

const app = express();

dotenv.config();

const port = 3000;

app.use(express.json());

app.use(cors())

// app.use((req, res, next) => {
//     res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
//     next();
//   });
  

app.use('/api/user',userRouter);

app.use('/api/medicine',medicineRouter);

app.use('/api/log', logRouter);

sequelize.sync().then(()=>{
    console.log('Database connected and synchronized');
    app.listen(port, () => console.log(`Server running on port ${port}`));
})

.catch(()=> console.log("error connecting to database"));