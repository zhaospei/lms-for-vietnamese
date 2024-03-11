import { DataTypes} from "sequelize";
import sequelize from "../database/db.js";
const Report = sequelize.define("Report", {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    PageType: {
        type: DataTypes.CHAR,
        defaultValue: 'R'
    },
    CreatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()')
    },
    Content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Status: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
    }

 }, {
    timestamps: false
 });

 export default Report;