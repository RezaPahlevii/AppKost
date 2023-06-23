import Kost from "../models/KostModel.js";
import TipeKost from "../models/TipeKostModel.js";
import Users from "../models/UserModel.js";
import { Op } from "sequelize";

export const getTipeKost = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await TipeKost.findAll({
        attributes: ["uuid", "f_kamar", "f_umum", "peraturan_kost", "catatan_tambahan", "foto_kost", "jumlah_kamar","ukuran_kamar", "harga"],
        include: [
          {
            model: Users,
            attributes: ["name", "email"]
          }
          // {
          //   model: Kost,
          //   attributes:["nama_kost", "no_hp"]
          // }
        ],
      });
    } else {
      response = await TipeKost.findAll({
        attributes: ["uuid", "f_kamar", "f_umum", "peraturan_kost", "catatan_tambahan", "foto_kost", "jumlah_kamar","ukuran_kamar", "harga"],
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

export const getTipeKostById = async (req, res) => {
  try {
    const tipe_kamar = await TipeKost.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!tipe_kamar) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    if (req.role === "admin") {
      response = await TipeKost.findOne({
        attributes: ["uuid", "nama_kost", "no_hp", "desa", "alamat", "jk"],
        where: {
          id: tipe_kamar.id,
        },
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await TipeKost.findOne({
        attributes: ["uuid", "nama_kost", "no_hp", "desa", "alamat", "jk"],
        where: {
          [Op.and]: [{ id: tipe_kamar.id }, { userId: req.userId }],
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

export const createTipeKost = async (req, res) => {
  const {
    f_kamar,
    f_umum,
    peraturan_kost,
    catatan_tambahan,
    foto_kost,
    jumlah_kamar,
    ukuran_kamar,
    harga } = req.body;
  try {
    // const kostId = req.kostId; // Mengambil userId dari informasi pengguna yang diautentikasi
    await TipeKost.create({
        f_kamar,
        f_umum,
        peraturan_kost,
        catatan_tambahan,
        foto_kost,
        jumlah_kamar,
        ukuran_kamar,
        harga,
        kostId: req.kostId
    });
    res.status(201).json({ msg: "Berhasil menambahkan kamar kost" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateTipeKost = async (req, res) => {
  try {
    const kost = await TipeKost.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!kost) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const {
        f_kamar,
        f_umum,
        peraturan_kost,
        catatan_tambahan,
        foto_kost,
        jumlah_kamar,
        ukuran_kamar,
        harga } = req.body;
    if (req.role === "admin") {
      await TipeKost.update(
        {
            f_kamar,
            f_umum,
            peraturan_kost,
            catatan_tambahan,
            foto_kost,
            jumlah_kamar,
            ukuran_kamar,
            harga
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
      await TipeKost.update(
        {
            f_kamar,
            f_umum,
            peraturan_kost,
            catatan_tambahan,
            foto_kost,
            jumlah_kamar,
            ukuran_kamar,
            harga
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

export const deleteTipeKost = async (req, res) => {
  try {
    const kost = await Kost.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!kost) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const {
        f_kamar,
        f_umum,
        peraturan_kost,
        catatan_tambahan,
        foto_kost,
        jumlah_kamar,
        ukuran_kamar,
        harga } = req.body;
    if (req.role === "admin") {
      await TipeKost.destroy({
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
    res.status(500).json({ msg: error.message });
  }
};

// export const getRekomendasiKost = async (req, res) => {
//   try {
//     let response;
//     // Implementasi logika untuk mengambil data rekomendasi kost
//     response = await Kost.findAll({
//       attributes: ["uuid", "nama_kost", "no_hp", "desa", "alamat", "jk"],
//       include: {
//         model: Users,
//         attributes: ["name"],
//       },
//     });
//     res.json(response);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
