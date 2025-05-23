const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "postgres",
  // host: 'localhost',
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_DATABASE || "library_db",
  entities: ["./entities/book.entity.ts", "./entities/author.entity.ts", "./entities/user.entity"],
  synchronize: process.env.NODE_ENV !== "production",
  logging: ["error", "warn", "migration"],
  migrations: ["src/migrations/*.ts"],
  migrationsRun: true,
});

module.exports = { AppDataSource }; 