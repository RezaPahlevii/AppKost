export const updateProduct = async (req, res) => {
  // Dapatkan informasi produk dari basis data
  const product = await Product.findOne({
    where: {
      id: req.params.id
    }
  });
  if (!product) return res.status(404).json({ msg: "No Data Found" });

  const files = [
    req.files.file1,
    req.files.file2,
    req.files.file3,
    req.files.file4
  ];
  const allowedTypes = ['.png', '.jpg', '.jpeg'];
  const fileUrls = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!file) continue; // Skip if no file provided for that field

    // (sama seperti metode 1) - verifikasi tipe dan ukuran gambar

    // Remove old image (if exists) before saving the new one
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const filepath = `./public/images/${fileName}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });

    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    fileUrls.push(url);
  }

  const name = req.body.title;
  // Update the product with new information (assuming the product model has fields for each image)
  try {
    // Update product data
    await product.update({
      name: name,
      // ... other fields of the product model ...
    });

    // Create or update photos
    for (let i = 0; i < fileUrls.length; i++) {
      const photo = await Photo.findOne({ where: { ProductId: req.params.id, id: i + 1 } });
      if (photo) {
        await photo.update({ url: fileUrls[i] });
        // Update field yang sesuai di tabel 'products'
        await product.update({ [`photo${i + 1}`]: fileUrls[i] });
      } else {
        await Photo.create({ url: fileUrls[i], ProductId: req.params.id });
        // Simpan URL foto-foto ke field yang sesuai di tabel 'products'
        await product.update({ [`photo${i + 1}`]: fileUrls[i] });
      }
    }

    res.status(200).json({ msg: "Product Updated Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
};
