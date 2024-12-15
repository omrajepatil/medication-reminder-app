// models/medicine.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/connection.js';

const Medicine = sequelize.define('Medicine', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Refers to Users table
      key: 'id',
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dosage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  scheduleTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
}, {
  timestamps: false,
});

export default Medicine;
