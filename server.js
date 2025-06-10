import "dotenv/config";
import express from "express";
import cors from "cors";
import { syncDatabase } from "./src/config/sequelize.js";
import userRouter from "./src/routes/userRoutes.js";

const app = express();

// connect and sync database
await syncDatabase();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Specify in production

// api routes
app.use("/api/users", userRouter);

app.get("/", (_, res) => res.send("API Working."));

// port
const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
