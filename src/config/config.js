const database = process.env.DATABASE_NAME;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const dialect = process.env.DIALECT;

const dbDetails = {
  database,
  username,
  password,
  host,
  dialect,
};

export default dbDetails;
