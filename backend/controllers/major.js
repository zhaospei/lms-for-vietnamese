import { QueryTypes } from "sequelize";
import sequelize from "../database/db.js";
import Major from "../models/major.js";

export const getMajorById = async (req, res) => {
    try{
        let id = req.query.id;
        const ans = await sequelize.query(`Select * from Majors where id = ${id}`, {type: QueryTypes.SELECT});
       // sequelize.close();
        res.status(200).json(ans);
    } catch(err){
        res.status(500).json(err.message);
    }
}


export const createMajor = async (req, res) => {
    try {
        const newMajor = await Major.create({
            Name: req.body.name,
            Code: req.body.code,
            Info: req.body.info
        });
        await newMajor.save();
        res.status(200).json("notexist");
    } catch (err) {
        res.status(500).json(err.message);
    }
};