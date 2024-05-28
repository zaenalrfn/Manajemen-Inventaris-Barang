import mysql from "mysql";
// koneksi database mysql
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "inventaris_barang",
});
db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database Berhasil Konek abangku");
  }
});

export default db;
