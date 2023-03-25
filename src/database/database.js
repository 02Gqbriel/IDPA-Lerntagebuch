// type "node database.js" to run this file and create database

const sqlite3 = require('sqlite3').verbose();

// open the database (or create database in current dir)
const db = new sqlite3.Database('./database.learndiary');

// create tables
db.run('CREATE TABLE IF NOT EXISTS User (' +
            'userID INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'username varchar(255) NOT NULL,' +
            'password varchar(255) NOT NULL);');
db.run('CREATE TABLE IF NOT EXISTS Subject (' +
            'subjectID INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'name varchar(255));');
db.run('CREATE TABLE IF NOT EXISTS Entry (' +
            'entryID INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'title varchar(255),' +
            'date DATE,' +
            'content varchar(255));');
db.run('CREATE TABLE IF NOT EXISTS SubjectEntry (' +
            'subjectID int NOT NULL, entryID int NOT NULL,' +
            'PRIMARY KEY(subjectID, entryID),' +
            'FOREIGN KEY(subjectID) REFERENCES Subject(subjectID),' +
            'FOREIGN KEY(entryID) REFERENCES Entry(entryID));');
            
// query data to check the tables
db.all("SELECT name FROM sqlite_master WHERE type='table'", function(err, tables) {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Tables in the database:");
      tables.forEach(function(table) {
        console.log(table.name);
      });
    }
  });