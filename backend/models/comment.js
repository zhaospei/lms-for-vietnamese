import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";
import User from "../models/user.js"
import Page from "../models/page.js"

const Comment = sequelize.define("Comment", {
  Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },

  PageType: {
    type: DataTypes.CHAR,
    defaultValue: 'C',
    allowNull: false,
    validate: {
      equals: 'C'
    }
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

  PreCommentId: {
    type: DataTypes.INTEGER
  },

  ParentId: {
    type: DataTypes.INTEGER,
  },

  PageId: {
    type: DataTypes.INTEGER,
  },

}, {
  timestamps: false
})

Comment.belongsToMany(User, {
  through: 'UserLike',
  as: 'likedUsers',
  foreignKey: 'UserId',
})

Comment.belongsToMany(Page, {
  through: 'PageComment',
  as: 'pages',
  foreignKey: 'PageId',
})



Comment.prototype.getReplies = async (id) => {
  const replies = await Comment.findAll({
    where: {
      ParentId: id,
    },
  })

  return replies
} 

Comment.prototype.getPreVersion = async (id) => {
  const comment = await Comment.find({
    where: {
      Id: id
    }    
  })

  return comment
}



export default Comment;