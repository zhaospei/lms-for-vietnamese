import { DataTypes} from "sequelize";
import Subject from "./subject.js";
import sequelize from "../database/db.js";
const Document = sequelize.define("Document", {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },

    PageType: {
        type: DataTypes.CHAR,
        defaultValue: 'D'
    },
    Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    CreatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()')
    },

    Download: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },

    Category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Content: {
        type: DataTypes.STRING,
        allowNull: false
      },
    Link: {
      type: DataTypes.STRING,
      allowNull: false
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    SubjectId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

 }, {
    timestamps: false
 });


Subject.hasMany(Document);
Document.belongsTo(Subject, {
    foreignKey: 'SubjectId'
})
 export default Document;