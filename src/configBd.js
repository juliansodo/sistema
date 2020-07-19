const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://bd97c3cce1bd53:3e43baa3@us-cdbr-east-05.cleardb.net/heroku_c549a86d0e2b51f', {
    dialect: 'mysql',
    dialectOptions: {
      timeout: 42
    }
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