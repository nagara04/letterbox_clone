// Walaupun di examplenya sudah menggunakan "import"
// Namun karena di sini kita masih menggunakan CommonJS
// Maka masih menggunakan require
const { MongoClient } = require("mongodb");

// Cara penulisan connectionString
// [protocol]://[ipaddress]:[port]/?[options1=value1]&[options2=value2]&[...]

require("dotenv").config();

// const connectionString = "mongodb://127.0.0.1:27017"; // nanti ganti dengan dotenv
const connectionString = process.env.MONGODB; // nanti ganti dengan dotenv

// Kita akan membuat sebuah global variable yang akan menahan database
// Untuk mengetahui apakah database masih ada atau tidak

// Karena bisa berubah, maka harus menggunakan let
let db = null;

// Fungsi untuk koneksi ke db
const mongoConnect = async () => {
  const client = new MongoClient(connectionString);

  try {
    // client.db("nama-database-yang-akan-digunakan")
    const database = client.db("chal2-phas3-hck8");

    //  console.log(database, " di>>>>>>>>>>>>>>>>>> connection");

    // Nilai variable global yang akan diset
    db = database;

    return database;
  } catch (err) {
    await client.close();
  }
};

// Fungsi untuk mengambil db
// Wajib dibuat, karena mongoConnect bersifat async
// Jadi tidak diketahui kapan selesainya
// (Itu juga alasannya kita menggunakan variable global "db")
const getDatabase = () => db;

module.exports = {
  mongoConnect,
  // Export getDatabase-nya
  getDatabase,
};
