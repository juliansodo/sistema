const Sequelize = require('sequelize');
const sequelize = new Sequelize('pruebatesting', 'pruebatest', '123123jJ', {
    host: 'db4free.net',
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