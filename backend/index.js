import express from 'express';
import sequelize from './config/connection.js'
import './models/user.js'
import userRouter from './routes/user.js';
import dotenv from 'dotenv'

const app = express();

dotenv.config();

const port = 3000;

app.use(express.json());

app.use('/api/user',userRouter);

sequelize.sync({alter:true}).then(()=>{
    console.log('Database connected and synchronized');
    app.listen(port, () => console.log(`Server running on port ${port}`));
})

.catch(()=> console.log("error connecting to database"));