import { DataTypes} from "sequelize";
import sequelize from "../database/db.js";
import Semester from "./semester.js";
import Score from "./score.js";
import Subject from "./subject.js";
const UserScore = sequelize.define("UserScore", {
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
        allowNull: false
    },
    ScoreId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    SemesterId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
 }, {
    timestamps: false
 });

Score.hasOne(UserScore);
UserScore.belongsTo(Score, {
    foreignKey: 'ScoreId'
});

Semester.hasMany(UserScore);
UserScore.belongsTo(Semester, {
    foreignKey: 'SemesterId'
});

Subject.hasMany(UserScore);
UserScore.belongsTo(Subject, {
    foreignKey: 'SubjectId'
})

export default UserScore;