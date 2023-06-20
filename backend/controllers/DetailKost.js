import Detail_Kost from "../models/DetailKostModel.js";
import Kost from "../models/KostModel.js";
import { Op } from "sequelize";

export const getDetailKost = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Detail_Kost.findAll({
        attributes: [
          "uuid",
          "no_hp",
          "gender",
          "fasilitas_kamar",
          "spesifikasi_kamar",
          "fasilitas_kamar_mandi",
          "fasilitas_umum",
          "fasilitas_parkir",
          "peraturan_kost",
          "cerita_pemilik",
          "catatan_tambahan",
          "maps",
          "foto_kost",
        ],
        include: [
          {
            model: Kost,
            attributes: ["name", "price"]
          }]
      });
    } else {
      response = await Detail_Kost.findAll({
        attributes: [
          "uuid",
          "no_hp",
          "gender",
          "fasilitas_kamar",
          "spesifikasi_kamar",
          "fasilitas_kamar_mandi",
          "fasilitas_umum",
          "fasilitas_parkir",
          "peraturan_kost",
          "cerita_pemilik",
          "catatan_tambahan",
          "maps",
          "foto_kost",
        ],
        where: {
          kostId: req.kostId,
        },
        include: [
          {
            model: Kost,
            attributes: ["name", "price"]
          }
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.massage });
  }
};

export const getDetailKostById = async (req, res) => {
  try {
    const detail_kost = await Detail_Kost.findOne({
      where: {
        uuid: req.params.id,
      }
    });
    if (!detail_kost)
      return res.status(404).json({ msg: "Data detail kost tidak ditemukan" });
    let response;
    if (req.role === "admin") {
      response = await Detail_Kost.findOne({
        attributes: [
          "uuid",
          "no_hp",
          "gender",
          "fasilitas_kamar",
          "spesifikasi_kamar",
          "fasilitas_kamar_mandi",
          "fasilitas_umum",
          "fasilitas_parkir",
          "peraturan_kost",
          "cerita_pemilik",
          "catatan_tambahan",
          "maps",
          "foto_kost",
        ],
        where: {
          id: detail_kost.id,
        },
        include: [
          {
            model: Kost,
            attributes: ["name", "price"],
          }]
      });
    } else {
      response = await Detail_Kost.findOne({
        attributes: [
          "uuid",
          "no_hp",
          "gender",
          "fasilitas_kamar",
          "spesifikasi_kamar",
          "fasilitas_kamar_mandi",
          "fasilitas_umum",
          "fasilitas_parkir",
          "peraturan_kost",
          "cerita_pemilik",
          "catatan_tambahan",
          "maps",
          "foto_kost",
        ],
        where: {
          [Op.and]: [{ id: detail_kost.id }, { kostId: req.kostId }],
        },
        include: [
          {
            model: Kost,
            attributes: ["name", "price"],
          }]
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.massage });
  }
};

export const createDetailKost = async (req, res) => {
  const {
    no_hp,
    gender,
    fasilitas_kamar,
    spesifikasi_kamar,
    fasilitas_kamar_mandi,
    fasilitas_umum,
    fasilitas_parkir,
    peraturan_kost,
    cerita_pemilik,
    catatan_tambahan,
    maps,
    foto_kost
  } = req.body;
  try {
    await Detail_Kost.create({
        no_hp: no_hp,
        gender: gender,
        fasilitas_kamar: fasilitas_kamar,
        spesifikasi_kamar: spesifikasi_kamar,
        fasilitas_kamar_mandi:fasilitas_kamar_mandi,
        fasilitas_umum: fasilitas_umum,
        fasilitas_parkir: fasilitas_parkir,
        peraturan_kost: peraturan_kost,
        cerita_pemilik: cerita_pemilik,
        catatan_tambahan: catatan_tambahan,
        maps: maps,
        foto_kost : foto_kost,
        kostId: req.kostId
    });
    res.status(201).json({ msg: "Berhasil menambahkan detail kamar kost" });
  } catch (error) {
    res.status(500).json({ msg: error.massage });
  }
};

export const updateDetailKost = async(req, res) =>{
    try {
        const detail_kost = await Detail_Kost.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!detail_kost) return res.status(404).json({msg: "Data tidak ditemukan"});
        const  {
            no_hp,
            gender,
            fasilitas_kamar,
            spesifikasi_kamar,
            fasilitas_kamar_mandi,
            fasilitas_umum,
            fasilitas_parkir,
            peraturan_kost,
            cerita_pemilik,
            catatan_tambahan,
            maps,
            foto_kost} = req.body;
        if(req.role === "admin"){
            await Kost.update({
                no_hp,
                gender,
                fasilitas_kamar,
                spesifikasi_kamar,
                fasilitas_kamar_mandi,
                fasilitas_umum,
                fasilitas_parkir,
                peraturan_kost,
                cerita_pemilik,
                catatan_tambahan,
                maps,
                foto_kost},{
                where:{
                    id: detail_kost.id
                }
            });
        }else{
            if(req.kostId !== detail_kost.kostId) return res.status(403).json({msg: "Akses data terlarang"})
            await Kost.update({
                no_hp,
                gender,
                fasilitas_kamar,
                spesifikasi_kamar,
                fasilitas_kamar_mandi,
                fasilitas_umum,
                fasilitas_parkir,
                peraturan_kost,
                cerita_pemilik,
                catatan_tambahan,
                maps,
                foto_kost},{
                where:{
                    [Op.and]:[{id: detail_kost.id}, {kostId: req.kostId}]
                }
            });
        }
        res.status(200).json({msg: "Berhasil update detail kost"});
    } catch (error) {
        res.status(500).json({msg: error.massage});
    }
 };

 export const deleteKost = async(req, res) =>{
    try {
        const detail_kost = await Detail_Kost.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!detail_kost) return res.status(404).json({msg: "Data detail kost tidak ditemukan"});
        const  {
            no_hp,
            gender,
            fasilitas_kamar,
            spesifikasi_kamar,
            fasilitas_kamar_mandi,
            fasilitas_umum,
            fasilitas_parkir,
            peraturan_kost,
            cerita_pemilik,
            catatan_tambahan,
            maps,
            foto_kost} = req.body;
        if(req.role === "admin"){
            await Detail_Kost.destroy({
                where:{
                    id: detail_kost.id
                }
            });
        }else{
            if(req.kostId !== detail_kost.kostId) return res.status(403).json({msg: "Akses data terlarang"})
            await Kost.destroy({
                where:{
                    [Op.and]:[{id: detail_kost.id}, {kostId: req.kostId}]
                }
            });
        }
        res.status(200).json({msg: "Berhasil delete detail kost"});
    } catch (error) {
        res.status(500).json({msg: error.massage});
    }
 };