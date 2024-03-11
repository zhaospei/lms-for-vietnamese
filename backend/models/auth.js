// import { DataTypes} from "sequelize";
// import sequelize from "../database/db.js"
// import bcrypt from 'bcrypt'

// const Auth = sequelize.define("Auth", {
//     StudentId: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       primaryKey: true
//     },
//     CodeHash: {
//         type: DataTypes.NUMBER,
//         allowNull: false
//     },
//     CreateAt: {
//         type: DataTypes.DATE,
//         defaultValue: sequelize.literal('NOW()')
//     },
//  },
//  {
//     timestamps: false,
//  }
// );

//  Auth.prototype.validateCode = function (plainText) {
//     return bcrypt.compareSync(plainText, this.CodeHash)
//   }

//  export default Auth; 