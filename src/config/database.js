const mongose = require('mongoose');

const connectdb = async () =>{
   await  mongose.connect("mongodb+srv://sakshiarya884_db_user:uEeMGzmmfffDS5Ms@cluster0.rwgihbz.mongodb.net/?appName=Cluster0")
}

module.exports = connectdb ; 
