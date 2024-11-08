import { User } from "./src/user/entitly/user.entity";
import { DataSource } from "typeorm";

const dotenv = require("dotenv");
dotenv.config();

const dataSource = new DataSource({
  type: "mysql",
  host: process.env.dbHost,
  port: 3306,
  username: process.env.dbUser,
  password: process.env.dbPassword,
  database: process.env.database,
  entities: [User],
  migrations: [__dirname + "/src/migrations/*.ts"],
  charset: "utf8mb4",
  synchronize: false,
  // logging: true,
  logging: false,
  extra: {
    collation: "utf8mb4_unicode_ci", // Add the collation property here
  },
});

export default dataSource;
