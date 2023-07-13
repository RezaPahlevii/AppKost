import Kost from "../models/KostModel.js";
import Users from "../models/UserModel.js";
import { Op } from "sequelize";
import path from "path";
import Foto from "../models/FotoModel.js";
import Peraturan from "../models/PeraturanModel.js";
import KostPeraturan from "../models/KostPeraturanModel.js";
import Fasilitas from "../models/FasilitasModel.js";
import KostFasilitas from "../models/KostFasilitasModel.js";
// import fs from "fs";

export const getKost = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Kost.findAll({
        attributes: [
          "uuid",
          "nama",
          "harga",
          "no_hp",
          "desa",
          "alamat",
          "jk",
          "catatan_tambahan",
          "kordinat",
        ],
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
          {
            model: Peraturan,
            attributes: ["peraturan"],
          },
          {
            model: Fasilitas,
            attributes: ["nama_f"],
          },
          {
            model: Foto,
            attributes: ["foto_kost", "url"],
          },
        ],
      });
    } else {
      response = await Kost.findAll({
        attributes: [
          "uuid",
          "nama",
          "harga",
          "no_hp",
          "desa",
          "alamat",
          "jk",
          "catatan_tambahan",
          "kordinat",
        ],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
          {
            model: Peraturan,
            attributes: ["peraturan"],
          },
          {
            model: Fasilitas,
            attributes: ["nama_f"],
          },
          {
            model: Foto,
            attributes: ["foto_kost", "url"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
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
        attributes: [
          "uuid",
          "nama",
          "harga",
          "no_hp",
          "desa",
          "alamat",
          "jk",
          "catatan_tambahan",
          "foto_kost",
          "url",
          "kordinat",
        ],
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
        attributes: [
          "uuid",
          "nama",
          "harga",
          "no_hp",
          "desa",
          "alamat",
          "jk",
          "catatan_tambahan",
          "foto_kost",
          "url",
          "kordinat",
        ],
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
    res.status(500).json({ msg: error.message });
  }
};

export const createKost = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const file = req.files.foto_kost;
  if (!file) return res.status(400).json({ msg: "Invalid File" });
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  const {
    nama,
    no_hp,
    harga,
    desa,
    alamat,
    jk,
    peraturan,
    nama_f,
    catatan_tambahan,
    kordinat,
  } = req.body;

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      const newKost = await Kost.create({
        nama: nama,
        no_hp: no_hp,
        harga: harga,
        desa: desa,
        alamat: alamat,
        jk: jk,
        catatan_tambahan: catatan_tambahan,
        kordinat: kordinat,
        userId: req.userId,
      });
      // Simpan informasi foto ke tabel Foto
      await Foto.create({
        foto_kost: fileName,
        url: url,
        kostId: newKost.id, // Gunakan ID kost yang baru dibuat
      });

      //=================================================================
      await Peraturan.create({
        peraturan: peraturan,
        kostId: newKost.id,
      });

      // Menyimpan Peraturan kost
      const existingPeraturan = [];
      const peraturanArray = peraturan.split(","); // Ubah string menjadi array
      for (let i = 0; i < peraturanArray.length; i++) {
        const peraturanName = peraturanArray[i];
        let peraturan = await Peraturan.findOne({
          where: { nama_f: peraturanName },
        });

        if (!peraturan) {
          peraturan = await Peraturan.create({
            nama_f: peraturanName,
          });
        }
        if (peraturan) {
          existingPeraturan.push(peraturan.id); // Simpan ID fasilitas yang ada atau yang baru dibuat
          await KostPeraturan.create({
            kostId: newKost.id,
            peraturanId: peraturan.id, // Gunakan ID fasilitas yang ada atau yang baru dibuat
          });
        }
      }
      console.log(existingPeraturan);

      //==================================================================
      // Menyimpan fasilitas kost
      const existingFasilitas = [];
      const fasilitasArray = nama_f.split(","); // Ubah string menjadi array
      for (let i = 0; i < fasilitasArray.length; i++) {
        const fasilitasName = fasilitasArray[i];

        // Mencari fasilitas berdasarkan nama
        let fasilitas = await Fasilitas.findOne({
          where: { nama_f: fasilitasName },
        });

        if (!fasilitas) {
          // Jika fasilitas belum ada, buat fasilitas baru
          fasilitas = await Fasilitas.create({
            nama_f: fasilitasName,
          });
        }

        // Menyimpan relasi antara kost dan fasilitas
        if (fasilitas) {
          existingFasilitas.push(fasilitas.id); // Simpan ID fasilitas yang ada atau yang baru dibuat
          await KostFasilitas.create({
            kostId: newKost.id,
            fasilitaId: fasilitas.id, // Gunakan ID fasilitas yang ada atau yang baru dibuat
          });
        }
      }

      console.log(existingFasilitas);

      res.status(201).json({ msg: "Berhasil menambahkan kamar kost" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
      console.log(error.message);
    }
  });
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
      nama,
      no_hp,
      harga,
      desa,
      alamat,
      jk,
      f_kamar,
      peraturan_kost,
      catatan_tambahan,
      foto_kost,
      kordinat,
    } = req.body;
    if (req.role === "admin") {
      await Kost.update(
        {
          nama,
          no_hp,
          harga,
          desa,
          alamat,
          jk,
          f_kamar,
          peraturan_kost,
          catatan_tambahan,
          foto_kost,
          kordinat,
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
          nama,
          no_hp,
          harga,
          desa,
          alamat,
          jk,
          f_kamar,
          peraturan_kost,
          catatan_tambahan,
          foto_kost,
          kordinat,
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
    res.status(500).json({ msg: error.message });
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
    await KostFasilitas.destroy({
      where: {
        kostId: kost.id,
      },
    });
    await Peraturan.destroy({
      where: {
        kostId: kost.id,
      },
    });
    await Foto.destroy({
      where: {
        kostId: kost.id,
      },
    });
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
    res.status(500).json({ msg: error.message });
  }
};

export const getRekomendasiKost = async (req, res) => {
  try {
    let response;
    // Implementasi logika untuk mengambil data rekomendasi kost
    response = await Kost.findAll({
      attributes: [
        "uuid",
        "nama",
        "harga",
        "no_hp",
        "desa",
        "alamat",
        "jk",
        "f_kamar",
        "peraturan_kost",
        "catatan_tambahan",
        "foto_kost",
        "kordinat",
      ],
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

export const filterKostByFacilities = async (req, res) => {
  try {
    const { facilities } = req.query;

    // Split string facilities menjadi array
    const facilitiesArray = facilities.split(",");

    // Filter pencarian berdasarkan fasilitas
    const response = await Kost.findAll({
      attributes: ["uuid", "nama", "harga", "f_kamar"],
      where: {
        f_kamar: {
          [Op.or]: facilitiesArray.map((facility) => ({
            [Op.like]: `%${facility}%`,
          })),
        },
      },
      include: [
        {
          model: Users,
          attributes: ["name", "email"],
        },
      ],
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getKostView = async (req, res) => {
  try {
    let response;
    // Implementasi logika untuk mengambil data rekomendasi kost
    response = await Kost.findAll({
      attributes: [
        "uuid",
        "nama",
        "harga",
        "no_hp",
        "desa",
        "alamat",
        "jk",
        "f_kamar",
        "peraturan_kost",
        "catatan_tambahan",
        "foto_kost",
        "kordinat",
      ],
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

export const getKostViewById = async (req, res) => {
  try {
    const kost = await Kost.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!kost) return res.status(404).json({ msg: "Data tidak ditemukan" });
    let response;
    response = await Kost.findOne({
      attributes: [
        "uuid",
        "nama",
        "harga",
        "no_hp",
        "desa",
        "alamat",
        "jk",
        "f_kamar",
        "peraturan_kost",
        "catatan_tambahan",
        "foto_kost",
        "kordinat",
      ],
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
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// export const saveFoto =(req, res)=>{
//   if(req.file === null) return res.status(400).json({msg: "No File Uploaded"});
//   const file = req.files.file;
//   const fileSize = file.data.length;
//   const ext = path.extname(file.name);
//   const url = `${req.protocol}://${req.get("host")}/image/${fileName}`;
//   const allowedType = [' png','.jpg','jpeg'];

//   if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "foto harus di bawah 5 MB"});
// }

// file.mv(`.public/images/${fileName}`), async(err)=>{
//   if(err) return res.status(500).json({msg: err.message});
//   try {
//     await Kost.create({image: fileName, url: url});
//     res.status(201).json({msg: "foto kost berhasil di upload"});
//   } catch (error) {
//     console.log(error.message);
//   }
// }
