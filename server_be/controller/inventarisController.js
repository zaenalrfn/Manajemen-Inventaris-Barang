// import database
import exp from "constants";
import db from "../database.js";
import util from "util";
import { error } from "console";
const queryAsync = util.promisify(db.query).bind(db);

// get semua data
export const getAllData = async (req, res) => {
  const countQuery = "SELECT COUNT(*) AS total_count FROM barang";
  db.query(countQuery, (err, countResult) => {
    if (err) {
      return res.status(500).json({
        message: "Gagal menghitung total data",
        error: err.message,
      });
    }
    const totalCount = countResult[0].total_count;
    const queryBarang = "Select * FROM barang";
    db.query(queryBarang, (err, result) => {
      if (err) {
        res.status(500).json({
          message: "Gagal mengambil semua data",
          error: error.message,
        });
      } else {
        res.status(200).json({
          data: result,
          total: totalCount,
          message: "Berhasil mengambil semua data",
        });
      }
    });
  });
};

// get | get halaman data
export const getData = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const queryPagination = "SELECT * FROM barang LIMIT ? OFFSET ?";
  const totalBarang = "SELECT COUNT(*) as count FROM barang";

  try {
    // Execute both queries in parallel using Promise.all
    const [dataBarang, hasilTotal] = await Promise.all([queryAsync(queryPagination, [limit, offset]), queryAsync(totalBarang)]);

    const total = hasilTotal[0].count;
    const totalHalaman = Math.ceil(total / limit);

    res.status(200).json({
      data: dataBarang,
      pagination: {
        halaman: page,
        total,
        totalHalaman,
      },
      message: "Berhasil mengambil semua data",
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil semua data",
      error: error.message,
    });
  }
};

// get | get data by id
export const getDataById = (req, res) => {
  const id = req.params.id;
  const queryBarang = "SELECT * FROM barang WHERE id=?";
  db.query(queryBarang, id, (err, result) => {
    if (err) {
      res.status(500).json({
        message: "Gagal mengambil data by id",
        eror: err,
      });
    } else {
      res.status(200).json({
        data: result,
        message: "Berhasil mengambil data by id",
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
