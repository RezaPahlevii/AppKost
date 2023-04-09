import User from "../models/UserModel.js";
import argon2 from "argon2";

 export const getUsers = async(req, res) =>{
    try {
        const respons = await User.findAll();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.massage});
    }
 }

 export const getUsersById = async(req, res)=>{
    try {
        const respons = await User.findOne({
            where:{
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.massage});
    }
 }

 export const createUsers = async(req, res) =>{
    const {name, email, password, confPassword, role} = req.body;
    if(password !== confPassword) return res.status(400).json({msg:"Password dan Confirm Password tidak cocok"});
    const hashPassword = await argon2.hash(password);
    try {
        await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        });
        res.status(201).json({msg: "Register Berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.massage});
    }
 }

 export const updateUsers = (req, res) =>{

 }

 export const deleteUsers = (req, res) =>{
    
 }