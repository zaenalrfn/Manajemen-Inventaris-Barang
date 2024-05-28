// import database
import db from "../database.js";

// get | get semua data
export const getData = async (req, res) => {
  const queryBarang = "SELECT * FROM barang";
  db.query(queryBarang, (error, result) => {
    if (error) {
      res.status(500).json({
        message: "Gagal mengambil semua data",
        error: error,
      });
    } else {
      res.status(200).json({
        data: result,
        message: "Berhasil mengambil semua data",
      });
    }
  });
};

// post | post tambah data
export const tambahBarang = async (req, res) => {
  const queryBarang = "INSERT INTO barang (nama, quantity, price) VALUES (?,?,?)";
  const { nama, quantity, price } = req.body;
  const dataBarang = [nama, quantity, price];
  try {
    await db.query(queryBarang, dataBarang);
    res.status(200).json({
      message: "Data barang berhasil ditambahkan",
    });
  } catch (error) {
    res.status(500).json({
      message: "Data barang gagal ditambahkan",
      error: error.message,
    });
  }
};

// put | put edit data
export const editBarang = async (req, res) => {
  const id = req.params.id;
  const { nama, quantity, price } = req.body;
  const dataBarangTerbaru = [nama, quantity, price, id];
  const queryBarang = "UPDATE barang SET nama = ?, quantity = ?, price = ? WHERE id = ?";
  try {
    await db.query(queryBarang, dataBarangTerbaru);
    res.status(200).json({
      message: `Data barang dengan id ${id} berhasil diedit`,
    });
  } catch (error) {
    res.status(500).json({
      message: `Data barang dengan id ${id} gagal diedit`,
      error: error.message,
    });
  }
};

// get | get semua data
export const hapusBarang = async (req, res) => {
  const id = req.params.id;
  const queryBarang = "DELETE FROM barang WHERE id = ?";
  try {
    await db.query(queryBarang, id);
    res.status(200).json({
      message: `Data barang dengan id ${id} berhasil dihapus`,
    });
  } catch (error) {
    res.status(500).json({
      message: `Data barang dengan id ${id} gagal dihapus`,
    });
  }
};
