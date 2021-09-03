const Sequelize = require('sequelize');

//Option 1: passing parameters separately
const sequelize = new Sequelize('Comix', 'postgres', 'Aliyah&Nathan', {
    host: 'localhost',
    dialect: 'postgres',
});

sequelize
    .authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;