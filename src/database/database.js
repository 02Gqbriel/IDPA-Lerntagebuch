/*
* creates the database 
* 
* type "node database.js" to run this file and create database
* 
* author: Nimai Leuenberger 
*/

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const dbPath = path.join(__dirname, 'learndiary.db');

// open the database (or create database in current dir)
const db = new sqlite3.Database(dbPath);

// create tables
db.run('CREATE TABLE IF NOT EXISTS User (' +
            'userID INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'username varchar(255) NOT NULL,' +
            'password varchar(255) NOT NULL,' +
            'role varchar(255) NOT NULL);');
db.run('CREATE TABLE IF NOT EXISTS Subject (' +
            'subjectID INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'name varchar(255), ' + 
            'userID INTEGER, ' + 
            'FOREIGN KEY (userID) REFERENCES User(userID));');
db.run('CREATE TABLE IF NOT EXISTS Entry (' +
            'entryID INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'subjectID INTEGER NOT NULL,' +
            'title varchar(255),' +
            'date varchar(20),' +
            'content TEXT,' +
            'userID INTEGER, ' + 
            'FOREIGN KEY (userID) REFERENCES User(userID)' +
            'FOREIGN KEY(subjectID) REFERENCES Subject(subjectID));');
