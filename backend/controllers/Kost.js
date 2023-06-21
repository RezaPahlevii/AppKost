import Kost from "../models/KostModel.js";
import Users from "../models/UserModel.js";
import { Op } from "sequelize";

export const getKost = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Kost.findAll({
        attributes: ["uuid", "name", "price","desa"],
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Kost.findAll({
        attributes: ["uuid", "name", "price","desa"],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.massage });
  }
};

export const getKostById = async (req, res) => {
  try {
    const kost = await Kost.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!kost) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    if (req.role === "admin") {
      response = await Kost.findOne({
        attributes: ["uuid", "name", "price","desa","gender","foto_kost"],
        where: {
          id: kost.id,
        },
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Kost.findOne({
        attributes: ["uuid", "name", "price","desa","gender","foto_kost"],
        where: {
          [Op.and]: [{ id: kost.id }, { userId: req.userId }],
        },
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.massage });
  }
};

export const createKost = async (req, res) => {
  const {
    name,
    no_hp,
    desa,
    alamat,
    gender,
    f_kamar,
    s_kamar,
    f_kamar_mandi,
    f_umum,
    f_parkir,
    peraturan_kost,
    cerita_pemmilik_kost,
    catatan_tambahan,
    maps,
    foto_kost,
    price,
  } = req.body;
  try {
    await Kost.create({
      name: name,
      no_hp: no_hp,
      desa: desa,
      alamat: alamat,
      gender: gender,
      f_kamar: f_kamar,
      s_kamar: s_kamar,
      f_kamar_mandi: f_kamar_mandi,
      f_umum: f_umum,
      f_parkir: f_parkir,
      peraturan_kost: peraturan_kost,
      cerita_pemmilik_kost,
      catatan_tambahan,
      maps,
      foto_kost,
      price,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Berhasil menambahkan kamar kost" });
  } catch (error) {
    res.status(500).json({ msg: error.massage });
  }
};

export const updateKost = async (req, res) => {
  try {
    const kost = await Kost.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!kost) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const {
      name,
      no_hp,
      desa,
      alamat,
      gender,
      f_kamar,
      s_kamar,
      f_kamar_mandi,
      f_umum,
      f_parkir,
      peraturan_kost,
      cerita_pemmilik_kost,
      catatan_tambahan,
      maps,
      foto_kost,
      price,
    } = req.body;
    if (req.role === "admin") {
      await Kost.update(
        {
          name,
          no_hp,
          desa,
          alamat,
          gender,
          f_kamar,
          s_kamar,
          f_kamar_mandi,
          f_umum,
          f_parkir,
          peraturan_kost,
          cerita_pemmilik_kost,
          catatan_tambahan,
          maps,
          foto_kost,
          price,
        },
        {
          where: {
            id: kost.id,
          },
        }
      );
    } else {
      if (req.userId !== kost.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await Kost.update(
        {
          name,
          no_hp,
          desa,
          alamat,
          gender,
          f_kamar,
          s_kamar,
          f_kamar_mandi,
          f_umum,
          f_parkir,
          peraturan_kost,
          cerita_pemmilik_kost,
          catatan_tambahan,
          maps,
          foto_kost,
          price,
        },
        {
          where: {
            [Op.and]: [{ id: kost.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Berhasil update kost" });
  } catch (error) {
    res.status(500).json({ msg: error.massage });
  }
};

export const deleteKost = async (req, res) => {
  try {
    const kost = await Kost.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!kost) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const {
      name,
      no_hp,
      desa,
      alamat,
      gender,
      f_kamar,
      s_kamar,
      f_kamar_mandi,
      f_umum,
      f_parkir,
      peraturan_kost,
      cerita_pemmilik_kost,
      catatan_tambahan,
      maps,
      foto_kost,
      price,
    } = req.body;
    if (req.role === "admin") {
      await Kost.destroy({
        where: {
          id: kost.id,
        },
      });
    } else {
      if (req.userId !== kost.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await Kost.destroy({
        where: {
          [Op.and]: [{ id: kost.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Berhasil delete kost" });
  } catch (error) {
    res.status(500).json({ msg: error.massage });
  }
};

export const getRekomendasiKost = async (req, res) => {
  try {
    let response;
    // Implementasi logika untuk mengambil data rekomendasi kost
    response = await Kost.findAll({
      attributes: ["uuid", "name", "price","desa","alamat"],
      include: {
        model: Users,
        attributes: ["name"],
      },
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
