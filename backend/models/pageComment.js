import { DataTypes} from "sequelize";
import sequelize from "../database/db.js";
import Comment from "./comment.js";
const PageComment = sequelize.define("PageComment", {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    CommentId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    PageType: {
        type: DataTypes.CHAR,
        allowNull: false,
        validate: {
            isIn: {
                args: [['D', 'S', 'R']],
                msg: "Must be D, S or R"
            }
        }
    },

    PageId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ParentId: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },

 }, {
    timestamps: false
 });

 Comment.hasMany(PageComment);
 PageComment.belongsTo(Comment, {
     foreignKey: 'CommentId'
 });

 export default PageComment;