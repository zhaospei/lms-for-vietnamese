import { DataTypes} from "sequelize";
import sequelize from "../database/db.js";
const PageReport = sequelize.define("PageReport", {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    ReportId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    PageType: {
        type: DataTypes.CHAR,
        allowNull: false,
        validate: {
            isIn: {
                args: [['D', 'S', 'C']],
                msg: "Must be D, S or C"
            }
        }
    },

    PageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

 }, {
    timestamps: false
 });

 export default PageReport;