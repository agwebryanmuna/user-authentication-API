import "dotenv/config";
import express from "express";
import cors from "cors";
import sequelize from "./src/config/db.config.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors()); // Specify in production

app.get("/", (_, res) => res.send("API Working."));

// port
const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
