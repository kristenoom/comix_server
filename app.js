require('dotenv').config();
let express = require("express");
let app = express();
let sequelize = require("./db");
var cors = require('cors');

const user = require("./controllers/user-controller");
const comix = require('./controllers/comic-controller');
const wishlist = require('./controllers/wishlist-controller');

sequelize.sync();
// sequelize.sync({force:true});

app.use(cors());
app.use(express.json());
app.use(require("./middleware/headers"));

//Exposed
app.use("/user", user);

//Protected
//app.use(require('./middleware/validate-session'));
app.use('/comic', comix);
app.use('/wishlist', wishlist);

app.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${process.env.PORT}`);
});
