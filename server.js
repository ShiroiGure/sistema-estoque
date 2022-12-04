const express = require("express");
const app = express();
const routers = require('./router');
const cors = require("cors");
// Import Sequelize instance
const database = require('./database/database');

const PORT = 5555 || process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/', routers);

database.sync()
  .then(response => console.log("Successfully connected to DB"))
  .catch(err => console.log(err));

app.listen(PORT,
  () => console.log(`Server running at port ${PORT}`));