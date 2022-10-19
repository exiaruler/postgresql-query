/***************************************************************************************************************
 *    Title: chapter08_sql_raw
 *    Author: Benjamin Johnston
 *    Date: 2020
 *    Code version: 1.0
 *    Availability: https://github.com/benatuts/aipjs/blob/master/chapter08_sql_raw/index.js
 *
 ***************************************************************************************************************/
/***************************************************************************************************************
 *    Title: pern-todo-app
 *    Author: Henry (The Stoic Programmer)
 *    Date: 2020
 *    Code version: 6.0
 *    Availability: https://github.com/l0609890/pern-todo-app/tree/master/server
 *
 ***************************************************************************************************************/
const express = require("express");
const app = express();
const cors = require("cors");
const { query } = require("./db");
//middleware
app.use(cors());
app.use(express.json());
// ------------------------------------------------
// Create database table and initialize
// ------------------------------------------------
// Reference :  chapter08_sql_raw
// ------------------------------------------------
async function initialize() {
  
}

// ------------------------------------------------
// Start serving and initialize
// ------------------------------------------------
initialize().then(() =>
  app.listen(5000, () => {
    console.log("server has started on port 5000");
  })
);
app.use("/sql",require("./routers/SQL"));


