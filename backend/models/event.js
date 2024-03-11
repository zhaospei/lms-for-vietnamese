import { DataTypes} from "sequelize";
import sequelize from "../database/db.js";
import Class from "./class.js";
import EventClass from "./eventClass.js";
const Event= sequelize.define("Event", {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    TimeStart: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    TimeEnd: {
        type: DataTypes.TIME,
        allowNull: false,
    },

    Location: {
        type: DataTypes.STRING,
        allowNull: false
    },

    Info: {
        type: DataTypes.STRING,
    },

    day: {
        type: DataTypes.DATE
    },
    color: {
        type: DataTypes.STRING,
        defaultValue: "#ffffff00"
    },

    ScheduleId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
 }, {
    timestamps: false
 });
 Event.belongsToMany(Class, {through: 'EventClass'});
 export default Event;
