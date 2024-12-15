import { DataTypes } from 'sequelize';
import sequelize from '../config/connection.js'; // Adjust the path to your sequelize connection file

const AcknowledgmentLog = sequelize.define('AcknowledgmentLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Assuming you have a 'Users' table
      key: 'id',
    },
  },
  medicineId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Medicines', // Assuming you have a 'Medicines' table
      key: 'id',
    },
  },
  status: {
    type: DataTypes.ENUM('Taken', 'Skipped'),
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Automatically set to the current timestamp
    allowNull: false,
  },
}, {
  timestamps: false, // Disable automatic createdAt and updatedAt fields
  tableName: 'AcknowledgmentLogs', // Define the table name
});

export default AcknowledgmentLog;
