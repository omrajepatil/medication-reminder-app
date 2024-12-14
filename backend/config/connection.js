import {Sequelize} from 'sequelize'

const sequelize = new Sequelize('medication','root','omraje',{
    host : 'localhost',
    dialect:'mysql',
});


export default sequelize;