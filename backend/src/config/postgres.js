// this file should use the common js syntax e.g. "require" and "module.exports"
// because the sequelize interface can not read the es5+ "import" and "export" syntax

import 'dotenv/config';
import { checkConfig } from '.';

module.exports = {
  dialect: 'postgres',
  host: checkConfig(process.env.DB_HOST),
  username: checkConfig(process.env.DB_USER),
  password: checkConfig(process.env.DB_PASS),
  database: checkConfig(process.env.DB_NAME),
  define: {
    // to add createAt/updatedAt columns in each table
    timestamps: true,
    // to create table using the syntax underscore
    underscored: true,
    underscoredAll: true,
  },
};
