const Sequelize = require('sequelize');
const sequelize = new Sequelize('sql10348228', 'sql10348228', '3BVwdlGr9N', {
    host: 'sql10.freesqldatabase.com',
    dialect: 'mysql'
  });

  sequelize
  .authenticate()
  .then(() => {
    console.log('Connection BD has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  module.exports = sequelize;