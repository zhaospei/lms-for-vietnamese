import { DataTypes} from "sequelize";
import sequelize from "../database/db.js";
const Subject = sequelize.define("Subject", {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true

    },

    PageType: {
        type: DataTypes.CHAR,
        defaultValue: 'S'
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Code: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Credit: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    MajorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }

}, {
    timestamps: false,
});


export default Subject;