import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

const VersionComment = sequelize.define("VersionComment", {
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

  Content: {
    type: DataTypes.STRING,
    allowNull: false
  },

  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  CommentId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

}, {
  timestamps: false
})

VersionComment.prototype.getVersion = async (id) => {
  const replies = await VersionComment.findAll({
    where: {
        CommentId: id,
    },
  })

  return replies
} 


export default VersionComment;