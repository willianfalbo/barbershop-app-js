// this file should use the common js syntax e.g. "require" and "module.exports"
// because the sequelize interface can not read the es5+ "import" and "export" syntax

// TODO: add this to env config
module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'password',
  database: 'barbershop-js',
  define: {
    // to add createAt/updatedAt columns in each table
    timestamps: true,
    // to create table using the syntax underscore
    underscored: true,
    underscoredAll: true,
  },
};
