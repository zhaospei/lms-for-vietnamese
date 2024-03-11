import { DataTypes} from "sequelize";
import sequelize from "../database/db.js";
const UserLike = sequelize.define("UserLike", {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },

    PageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    PageType: {
        type: DataTypes.CHAR,
        allowNull: false,
        validate: {
            isIn: {
                args: [['D', 'S', 'R', 'C']],
                msg: "Must be D, S, C or R"
            }
        }
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
 }, {
    timestamps: false
 });

export default UserLike;