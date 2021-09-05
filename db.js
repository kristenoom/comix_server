const Sequelize = require('sequelize');

//Option 1: passing parameters separately
const sequelize = new Sequelize(process.env.NAME, 'postgres', process.env.PASS, {
    host: 'localhost',
    dialect: 'postgres',
});

sequelize
    .authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to OVERWATCH: ', err);
  });

module.exports = sequelize;