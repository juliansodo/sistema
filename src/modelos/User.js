var Sequelize = require("sequelize")
var sequelize = require("../configBd");

var User = sequelize.define('user', {
    // attributes
    googleId: {
      type: Sequelize.STRING,
      allowNull: false
    },
    displayName: {
      type: Sequelize.STRING
      // allowNull defaults to true
    },
    familyName:
    {
        type: Sequelize.STRING
    },
    givenName:
    {
        type: Sequelize.STRING
    },
    picture:
    {
        type:Sequelize.STRING
    },
    token:
    {
        type:Sequelize.STRING
    }
  }, {
    // options
  });

User.sync({ /*force: true*/ }).then(() => {
    // Now the `users` table in the database corresponds to the model definition
  /*  return User.create({
      id: 'John',
      lastName: 'Hancock'
    });
    */
  });

  module.exports = User;