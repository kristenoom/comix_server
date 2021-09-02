require('dotenv').config()
let express = require('express');
let app = express()
let sequelize = require('./db');

let comix = require('./controllers/comic-controller')
let user = require('./controllers/user-controller')

sequelize.sync()
// sequlize.sync({force: true})

app.use(express.json())

app.use('/user', user);

app.use('/comic', comix)

app.listen(3000, function(){
    console.log('Exceslior');
})