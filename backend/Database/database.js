const config =require("./config")

const { Sequelize, DataTypes } = require('sequelize');

const connection = new Sequelize(
    "todo",
    "root",
    "root",
    {
      host: "localhost",
      dialect: "mysql",
      define:{
        timestamps:false,
      }
    }
  );
// Define User model
const Task = connection.define('Task', {
    TaskID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    TaskName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Description: {
      type: DataTypes.TEXT
    }
  });
  
  // Synchronize the model with the database
 
connection.authenticate()
.then(()=>console.log("db connected"))
.catch((err)=>console.log("db didnt connect",err)) 
 



// connection
//   .sync({ force: true })
//   .then(() => {
//     console.log("db created successfully!");
//   })
//   .catch((error) => {
//     console.error("Unable to create db : ", error);
//   });

module.exports = {Task}