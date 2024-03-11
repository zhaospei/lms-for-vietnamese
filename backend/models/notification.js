import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";
import User from "../models/user.js"


const Notification = sequelize.define("Notification", {
  Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },

  CreatedAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal('NOW()')
  },

  Content: {
    type: DataTypes.STRING,
    allowNull: false
  },

  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  SenderId: {
    type: DataTypes.INTEGER,
  },

  Seen: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  Link: {
    type: DataTypes.STRING,
    defaultValue: null
  },

}, {
  timestamps: false
})
User.hasMany(Notification);
Notification.belongsTo(User, {
  foreignKey: 'UserId',
})

export default Notification;