import { Sequelize } from "sequelize";
import "dotenv/config";

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  dialectOptions: { ssl: true },
});

try {
  await sequelize.authenticate();
  console.log("Database connection successful");
} catch (error) {
  console.error("Database connection error: ", error.message);
  process.exit(1);
}

export default sequelize;
