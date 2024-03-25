import { DataTypes} from "sequelize";
import sequelize from "../database/db.js";
const Record = sequelize.define("Record", {
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
    
    Time: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    Score: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    Type: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
 }, {
    timestamps: false,
 });

 export default Record;