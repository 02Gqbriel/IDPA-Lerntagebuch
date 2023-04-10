/*
* creates the database 
* 
* type "node database.js" to run this file and create database
* 
* author: Nimai Leuenberger 
*/

const sqlite3 = require('sqlite3').verbose();

// open the database (or create database in current dir)
const db = new sqlite3.Database('./learndiary.db');

// create tables
db.run('CREATE TABLE IF NOT EXISTS User (' +
            'userID INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'username varchar(255) NOT NULL,' +
            'password varchar(255) NOT NULL,' +
            'role varchar(255) NOT NULL);');
db.run('CREATE TABLE IF NOT EXISTS Subject (' +
            'subjectID INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'name varchar(255));');
db.run('CREATE TABLE IF NOT EXISTS Entry (' +
            'entryID INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'subjectID INTEGER NOT NULL,' +
            'title varchar(255),' +
            'date DATE,' +
            'content TEXT,' +
            'FOREIGN KEY(subjectID) REFERENCES Subject(subjectID));');
