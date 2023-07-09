import Bio from "../models/BioUserModel.js";
import Users from "../models/UserModel.js";
import { Op } from "sequelize";

export const getBio = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Bio.findAll({
        attributes: ["uuid", "nama", "jk", "umur", "NoWA", "asal"],
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Bio.findAll({
        attributes: ["uuid", "nama", "jk", "umur", "NoWA", "asal"],
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
    res.status(500).json({ msg: error.message });
  }
};

export const getBioById = async (req, res) => {
  try {
    const bio = await Bio.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!bio) return res.status(404).json({ msg: "Biodata tidak ditemukan" });
    let response;
    if (req.role === "admin") {
      response = await Bio.findOne({
        attributes: ["uuid", "nama", "jk", "umur", "NoWA", "asal"],
        where: {
          id: bio.id,
        },
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Bio.findOne({
        attributes: ["uuid", "nama", "jk", "umur", "NoWA", "asal"],
        where: {
          [Op.and]: [{ id: bio.id }, { userId: req.userId }],
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
    res.status(500).json({ msg: error.message });
  }
};

export const createBio = async (req, res) => {
  const { nama, jk, umur, NoWA, asal } = req.body;
  try {
    await Bio.create({
      nama: nama,
      jk: jk,
      umur: umur,
      NoWA: NoWA,
      asal: asal,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Berhasil menambahkan Biodata" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateBio = async (req, res) => {
  try {
    const bio = await Bio.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!bio) return res.status(404).json({ msg: "Biodata tidak ditemukan" });
    const { nama, jk, umur, NoWA, asal } = req.body;
    if (req.role === "admin") {
      await Bio.update(
        {
          nama,
          jk,
          umur,
          NoWA,
          asal,
        },
        {
          where: {
            id: bio.id,
          },
        }
      );
    } else {
      if (req.userId !== bio.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await Bio.update(
        {
          nama,
          jk,
          umur,
          NoWA,
          asal,
        },
        {
          where: {
            [Op.and]: [{ id: bio.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Berhasil update Biodata" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteBio = async (req, res) => {
  try {
    const bio = await Bio.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!bio) return res.status(404).json({ msg: "Biodata tidak ditemukan" });
    const { nama, jk, umur, NoWA, asal } = req.body;
    if (req.role === "admin") {
      await Bio.destroy({
        where: {
          id: bio.id,
        },
      });
    } else {
      if (req.userId !== bio.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await Bio.destroy({
        where: {
          [Op.and]: [{ id: bio.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Berhasil delete Biodata" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
