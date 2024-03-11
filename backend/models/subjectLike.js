import { DataTypes} from "sequelize";
import sequelize from "../database/db.js";

const SubjectLike = sequelize.define("SubjectLike", {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true

    },

    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    SubjectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }

}, {
    timestamps: false,
});

export default SubjectLike;