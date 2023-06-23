import Kost from "../models/KostModel.js";
import Users from "../models/UserModel.js";
import { Op } from "sequelize";

export const getKost = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Kost.findAll({
        attributes: ["uuid", "nama_kost", "no_hp", "desa", "alamat", "jk"],
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Kost.findAll({
        attributes: ["uuid", "nama_kost", "no_hp", "desa", "alamat", "jk"],
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
        attributes: ["uuid", "nama_kost", "no_hp", "desa", "alamat", "jk"],
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
        attributes: ["uuid", "nama_kost", "no_hp", "desa", "alamat", "jk"],
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
  const { nama_kost, no_hp, desa, alamat, jk } = req.body;
  try {
    await Kost.create({
      nama_kost,
      no_hp,
      desa,
      alamat,
      jk,
      userId: req.userId
    });
    res.status(201).json({ msg: "Berhasil menambahkan kamar kost" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
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
    const { nama_kost, no_hp, desa, alamat, jk } = req.body;
    if (req.role === "admin") {
      await Kost.update(
        {
          nama_kost,
          no_hp,
          desa,
          alamat,
          jk,
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
          nama_kost,
          no_hp,
          desa,
          alamat,
          jk,
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
    const { nama_kost, no_hp, desa, alamat, jk } = req.body;
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
      attributes: ["uuid", "nama_kost", "no_hp", "desa", "alamat", "jk"],
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
