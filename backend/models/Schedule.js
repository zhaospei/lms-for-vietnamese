import { DataTypes} from "sequelize";
import sequelize from "../database/db.js";
const Schedule = sequelize.define("Schedule", {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true

    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
});

export default Schedule;