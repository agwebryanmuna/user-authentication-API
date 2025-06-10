import { Sequelize } from "sequelize";
import dbDetails from "./config.js";

const sequelize = new Sequelize(
  dbDetails.database,
  dbDetails.username,
  dbDetails.password,
  {
    host: dbDetails.host,
    dialect: dbDetails.dialect,
    logging: false, // Disable logging; set to console.log for debugging
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Unable to connect to database: ", error);
  }
};

const syncDatabase = async () => {
  try {
    await testConnection();
    await sequelize.sync();
    console.log("Database synchronized.");
  } catch (error) {
    console.log(error);
  }
};

export { syncDatabase };
export default sequelize;
