import Bio from "../models/BioUserModel.js";
import Users from "../models/UserModel.js";
import { Op } from "sequelize";

export const getBioUsers = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Bio.findAll({
        attributes: ["uuid","nama", "jk", "umur", "NoWA", "asal"],
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Bio.findAll({
        attributes: ["uuid","nama", "jk", "umur", "NoWA", "asal"],
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

export const getBioUsersById = async (req, res) => {
  try {
    const bio = await Bio.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!bio) return res.status(404).json({ msg: "Biodata tidak ditemukan" });
    
    const response = {
      nama: bio.nama,
      jk: bio.jk,
      umur: bio.umur,
      NoWA: bio.NoWA,
      asal: bio.asal,
      user: bio.User
    };
    
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: "Terjadi masalah" });
  }
};

export const createBioUsers = async (req, res) => {
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

export const updateBioUsers = async (req, res) => {
  try {
    const { nama, jk, umur, NoWA, asal } = req.body;
    const userId = req.userId;
    const bioId = req.params.id;

    const bio = await Bio.findOne({
      where: {
        uuid: bioId,
        userId: userId
      }
    });

    if (!bio) {
      return res.status(404).json({ msg: "Biodata tidak ditemukan" });
    }

    if (req.role !== "admin" && req.userId !== bio.userId) {
      return res.status(403).json({ msg: "Akses terlarang" });
    }

    await bio.update({
      nama: nama,
      jk: jk,
      umur: umur,
      NoWA: NoWA,
      asal: asal
    });

    res.status(200).json({ msg: "Berhasil update Biodata", biodata: bio });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const deleteBioUsers = async (req, res) => {
  try {
    const bio = await Bio.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!bio) return res.status(404).json({ msg: "Biodata tidak di temukan" });
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
