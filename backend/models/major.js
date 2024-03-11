import { DataTypes} from "sequelize";
import sequelize from "../database/db.js";
const Major = sequelize.define("Major", {
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
      type: DataTypes.STRING,
      allowNull: false
    },
    Info: {
      type: DataTypes.TEXT,
      allowNull: false
    }
 }, {
    timestamps: false,
 });

 export default Major;