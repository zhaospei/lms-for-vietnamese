import { DataTypes} from "sequelize";
import sequelize from "../database/db.js";
const Semester = sequelize.define("Semester", {
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
    TermId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
 }, {
    timestamps: false
 });

export default Semester;