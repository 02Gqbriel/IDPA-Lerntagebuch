//import sqlite3 from 'sqlite3';
const sqlite3 = require('sqlite3').verbose();
import { User } from "./User";

const db = new sqlite3.Database('../database/database.learndiary');

/* interface User {
  id: number;
  username: string;
  password: string;
} */

export function insertUser(user: User): Promise<String> {
  const insert = 'INSERT INTO User (username, password) VALUES (?,?)';
  const { getUsername, getPassword } = user;
  return new Promise((resolve, reject) => {
    db.run(insert, [user.getUsername, user.getPassword], (err: { message: any; }) => {
      if (err) {
        reject(err.message);
      } else {
        resolve('worked');
      }
    });
  });
}

export function updateUser(user: User): Promise<void> {
  const update = 'UPDATE User SET username=?, password=? WHERE id=?';
  const { getUserID, getUsername, getPassword } = user;
  return new Promise((resolve, reject) => {
    db.run(update, [user.getUsername, user.getPassword, user.getUserID], (err: { message: any; }) => {
      if (err) {
        reject(err.message);
      } else {
        resolve();
      }
    });
  });
}

// not this... delete flag!
export function deleteUser(id: number): Promise<void> {
  const deleteQuery = 'DELETE FROM User WHERE id=?';
  return new Promise((resolve, reject) => {
    db.run(deleteQuery, id, (err: { message: any; }) => {
      if (err) {
        reject(err.message);
      } else {
        resolve();
      }
    });
  });
}

export function selectAll(): Promise<User[]> {
  const selectAll = 'SELECT * FROM User';
  return new Promise<User[]>((resolve, reject) => {
    db.all(selectAll, [], (err: { message: any; }, rows: User[]) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(rows);
      }
    });
  });
}

export function selectEntity(username: string, password: string): Promise<User> {
  const selectById = 'SELECT * FROM User WHERE username=? AND password=?';
  return new Promise((resolve, reject) => {
    db.get(selectById, [username, password], (err: { message: any; }, row: User) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(row);
      }
    });
  });
}

export function getIdByNamePwd(username: string, password: string): Promise<number> {
  const selectById = 'SELECT userID FROM User WHERE username=? AND password=?';
  return new Promise((resolve, reject) => {
    db.get(selectById, [username, password], (err: { message: any; }, row: number) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(row);
      }
    });
  });
}