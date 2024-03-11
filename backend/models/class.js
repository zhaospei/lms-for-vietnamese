import { DataTypes} from "sequelize";
import sequelize from "../database/db.js";
import Subject from "./subject.js";
const Class = sequelize.define("Class", {
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
    Code: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    lessonStart: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    lessonEnd: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Teacher: {
        type: DataTypes.STRING
    },

    weekDay: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    group: {
        type: DataTypes.STRING,
        allowNull: false
    },

    SubjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }

}, {
    timestamps: false,
});
Class.belongsTo(Subject);
Subject.hasMany(Class);
export default Class;