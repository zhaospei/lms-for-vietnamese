import { DataTypes} from "sequelize";
import sequelize from "../database/db.js";
const Page = sequelize.define("Page", {
    PageId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    PageType: {
        type: DataTypes.CHAR,
        primaryKey: true,
        allowNull: false,
        validate: {
            isIn: {
                args: [['D', 'S', 'R', 'C']],
                msg: "Must be D, S, R or C"
            }
        }
    },
    PageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'XYZ',
    }

 }, {
    timestamps: false
 });

 export default Page;