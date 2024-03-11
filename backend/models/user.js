import { DataTypes} from "sequelize";
import sequelize from "../database/db.js"
import bcrypt from 'bcrypt'

const User = sequelize.define("User", {
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
    PasswordHash: {
        type: DataTypes.STRING,
        defaultValue: '$2b$10$hTsDW4WCT/MRULdZ1bdZoOPPWkb34Sck9DmXG55.HmjTR7UuWB5qa',
        // allowNull: false
    },
    Birth: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()')
    },
    StudentId: {
        type: DataTypes.STRING
    },
    Role: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        // allowNull: false
    },
    Status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
    },
    Bio: {
        type: DataTypes.STRING,
    },
    Avatar: {
        type: DataTypes.TEXT,
        defaultValue: "https://www.shareicon.net/data/128x128/2016/05/24/770137_man_512x512.png"
    }
 },
 {
    timestamps: false,
 }
);

 User.prototype.validatePassword = function (plainText) {
    console.log(plainText, this.PasswordHash)
    return bcrypt.compareSync(plainText, this.PasswordHash)
  }

User.prototype.isMod = async (id) => {
    const user = await User.find({
      where: {
        Id: id
      }    
    })
    if (!user) {
        return false
    } 
    if (user.Role != 1) {
        return false
    }
    return true
  }

 export default User;