import { Sequelize } from "sequelize";

const database = process.env.DATABASE_NAME;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const dialect = process.env.DIALECT;

if (!database || !username || !password || !host || !dialect) {
  throw new Error("Missing required database environment variables.");
}

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  logging: (...msg) => console.log("Sequalize logging", msg), // Disable logging; set to console.log for debugging
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export default sequelize;
