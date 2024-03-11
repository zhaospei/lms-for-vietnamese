import { DataTypes} from "sequelize";
import sequelize from "../database/db.js";
const Score = sequelize.define("Score", {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    midExamScore: {
        type: DataTypes.FLOAT
    },
    finalExamScore: {
        type: DataTypes.FLOAT
    },
    midExamWeight: {
        type: DataTypes.FLOAT
    },
    finalExamWeight: {
        type: DataTypes.FLOAT
    },
    total10: {
        type: DataTypes.FLOAT
    },
    total4: {
        type: DataTypes.FLOAT
    }

 }, {
    timestamps: false
 });

export default Score;