const mysql = require("mysql2");
var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "!Apex.oracal01",
  database: "employeedb",
});

mysqlConnection.connect((err) => {
  if (err) {
    console.log("Error in DB Connection: " + JSON.stringify(err, undefined, 2));
  } else {
    console.log("DB connected Successfully");
  }
});

module.exports = mysqlConnection;