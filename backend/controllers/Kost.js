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
            attributes: ["url1", "url2", "url3", "url4"],
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
            attributes: ["url1", "url2", "url3", "url4"],
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
            attributes: ["url1", "url2", "url3", "url4"],
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
            attributes: ["url1", "url2", "url3", "url4"],
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
  const fotoFiles = req.files; // Mengambil semua file foto yang diupload

  // Mengatur ukuran maksimal dan jenis file yang diizinkan
  const allowedTypes = [".png", ".jpg", ".jpeg"];
  const maxSize = 5000000; // 5MB
  try {
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
    // Menyimpan informasi foto ke dalam tabel "Foto"
    const fotoUrls = []; // Menampung URL foto

    // Mengunggah dan menyimpan setiap file foto
    for (let i = 1; i <= 4; i++) {
      const file = fotoFiles[`url${i}`];

      if (!file)
        // Jika file tidak ada, lanjutkan ke iterasi berikutnya
        continue;

      const fileSize = file.data.length;
      const ext = path.extname(file.name);
      const fileName = file.md5 + ext;
      const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

      if (!allowedTypes.includes(ext.toLowerCase()))
        return res.status(422).json({ msg: `Invalid Image Type for foto${i}` });

      if (fileSize > maxSize)
        return res
          .status(422)
          .json({ msg: `Image for foto${i} must be less than 5 MB` });

      await file.mv(`./public/images/${fileName}`);

      // Menyimpan URL foto ke dalam array
      fotoUrls.push(url);
    }

    // Menyimpan informasi foto ke dalam tabel "Foto"
    await Foto.create({
      url1: fotoUrls[0],
      url2: fotoUrls[1],
      url3: fotoUrls[2],
      url4: fotoUrls[3],
      kostId: newKost.id,
    });

    //================================================================
    // Menyimpan Peraturan kost
    const existingPeraturan = [];
    const peraturanArray = peraturan.split(","); // Ubah string menjadi array
    for (let i = 0; i < peraturanArray.length; i++) {
      const peraturanName = peraturanArray[i];
      let peraturan = await Peraturan.findOne({
        where: { peraturan: peraturanName },
      });

      if (!peraturan) {
        peraturan = await Peraturan.create({
          peraturan: peraturanName,
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

      let fasilitas = await Fasilitas.findOne({
        where: { nama_f: fasilitasName },
      });

      if (!fasilitas) {
        fasilitas = await Fasilitas.create({
          nama_f: fasilitasName,
        });
      }

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
};
export const updateKost = async (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const fotoFiles = req.files; // Mengambil semua file foto yang diupload

  // Mengatur ukuran maksimal dan jenis file yang diizinkan
  const allowedTypes = [".png", ".jpg", ".jpeg"];
  const maxSize = 5000000; // 5MB
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
      nama_f,
      peraturan,
      catatan_tambahan,
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
          catatan_tambahan,
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
          catatan_tambahan,
          kordinat,
        },
        {
          where: {
            [Op.and]: [{ id: kost.id }, { userId: req.userId }],
          },
        }
      );
    }
    // Menyimpan data peraturan
    await KostPeraturan.destroy({ where: { kostId: kost.id } });
    const existingPeraturan = [];
    const peraturanArray = peraturan;
    for (let i = 0; i < peraturanArray.length; i++) {
      const peraturanName = peraturanArray[i];
      let peraturan = await Peraturan.findOne({
        where: { peraturan: peraturanName },
      });

      if (!peraturan) {
        peraturan = await Peraturan.create({
          peraturan: peraturanName,
        });
      }
      if (peraturan) {
        existingPeraturan.push(peraturan.id); // Simpan ID fasilitas yang ada atau yang baru dibuat
        await KostPeraturan.create({
          kostId: kost.id,
          peraturanId: peraturan.id, // Gunakan ID fasilitas yang ada atau yang baru dibuat
        });
      }
    }

    // Menyimpan data fasilitas
    await KostFasilitas.destroy({ where: { kostId: kost.id } });
    const existingFasilitas = [];
    const fasilitasArray = nama_f;
    for (let i = 0; i < fasilitasArray.length; i++) {
      const fasilitasName = fasilitasArray[i].trim();
      let fasilitas = await Fasilitas.findOne({
        where: { nama_f: fasilitasName },
      });

      if (!fasilitas) {
        fasilitas = await Fasilitas.create({
          nama_f: fasilitasName,
        });
      }

      if (fasilitas) {
        existingFasilitas.push(fasilitas.id); // Simpan ID fasilitas yang ada atau yang baru dibuat
        await KostFasilitas.create({
          kostId: kost.id,
          fasilitaId: fasilitas.id, // Gunakan ID fasilitas yang ada atau yang baru dibuat
        });
      }
    }

    // Menyimpan informasi foto
    const existingFoto = await Foto.findOne({ where: { kostId: kost.id } });

    let fileName = "";
    if (req.files === null) {
      fileName = existingFoto.url1;
    } else {
      const fotoFiles = req.files;

      for (let i = 1; i <= 4; i++) {
        const file = fotoFiles[`url${i}`];

        if (!file) continue;

        const fileSize = file.size;
        const ext = path.extname(file.name);
        fileName = `${i}${ext}`;
        const allowedTypes = [".png", ".jpg", ".jpeg"];

        if (!allowedTypes.includes(ext.toLowerCase()))
          return res
            .status(422)
            .json({ msg: `Invalid Image Type for foto${i}` });

        if (fileSize > 5000000)
          return res
            .status(422)
            .json({ msg: `Image for foto${i} must be less than 5 MB` });

        const filepath = `./public/images/${existingFoto[`url${i}`]}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/images/${fileName}`, (err) => {
          if (err) return res.status(500).json({ msg: err.message });
        });

        existingFoto[`url${i}`] = fileName;
      }
    }

    await existingFoto.save();

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
    await KostPeraturan.destroy({
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
          attributes: ["url1", "url2", "url3", "url4"],
        },
      ],
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
      attributes: ["uuid", "nama", "harga"],
      include: [
        {
          model: Users,
          attributes: ["name", "email"],
        },
        {
          model: KostPeraturan,
          attributes: ["peraturan"],
        },
        {
          model: KostFasilitas,
          attributes: ["nama_f"],
          where: {
            f_kamar: {
              [Op.or]: facilitiesArray.map((facility) => ({
                [Op.like]: `%${facility}%`,
              })),
            },
          },
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
        "catatan_tambahan",
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
        "catatan_tambahan",
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
          attributes: ["url1", "url2", "url3", "url4"],
        },
      ],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getKordinat = async (req, res) => {
  try {
    let response;
    if (req.role === "admin" || !req.userId) {
      response = await Kost.findAll({
        attributes: [
          "uuid",
          "nama",
          "desa",
          "alamat",
          "harga",
          "jk",
          "kordinat"
        ],
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          }
        ],
      });
    } else {
      response = await Kost.findAll({
        attributes: [
          "uuid",
          "nama",
          "desa",
          "alamat",
          "harga",
          "jk",
          "kordinat"
        ],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          }
        ]
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

