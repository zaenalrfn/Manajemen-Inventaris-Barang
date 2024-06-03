import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import inventarisRouter from "./routes/inventarisRoutes.js";
import helmet from "helmet";

const app = express();
const port = 3000;

// middleware
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));

// router utama
app.use("/api", inventarisRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
