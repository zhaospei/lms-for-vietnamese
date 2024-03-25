import { DataTypes} from "sequelize";
import sequelize from "../database/db.js";
const Learnd = sequelize.define("Learnd", {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true

    },

    Score: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    Link: {
        type: DataTypes.STRING,
        allowNull: false
    },

    CreatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()')
    },
    

    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
 }, {
    timestamps: false,
 });

 export default Learnd;