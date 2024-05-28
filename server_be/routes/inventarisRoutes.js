import express from "express";
import { getData, tambahBarang, editBarang, hapusBarang } from "../controller/inventarisController.js";

const router = express.Router();

// get | http://localhost:3000/api/getData
router.get("/getData", getData);

// post | http://localhost:3000/api/tambahBarang
router.post("/tambahBarang", tambahBarang);

// get | http://localhost:3000/api/editBarang/:id
router.put("/editBarang/:id", editBarang);

// delete | http://localhost:3000/api/hapusBarang/:id
router.delete("/hapusBarang/:id", hapusBarang);

export default router;
