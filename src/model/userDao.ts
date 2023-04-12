/**
 * data access object for a user  
 * 
 * author: Nimai Leuenberger
 */

const sqlite3 = require('sqlite3').verbose();
import { User } from "./User";

const path = require('path');
const dbPath = path.join(__dirname, '..', 'database', 'learndiary.db');
const db = new sqlite3.Database(dbPath);

/**
 * inserts a user into the database
 * 
 * @param user 
 * @returns Promise: with the id of the inserted user or an error message
 */
export function insertUser(user: User): Promise<any> {
  const insert = 'INSERT INTO User (username, password, role) VALUES (?,?,?)';
  const selectQuery = 'SELECT last_insert_rowid() as id';

  return new Promise((resolve, reject) => {
    db.run(insert, [user.getUsername(), user.getPassword(), user.getRole()], (err: { message: any; }) => {
      if (err) {
        reject(err.message);
      } else {
        db.get(selectQuery, [], function (err: any, row: any) {
          if (err) {
            reject(err.message);
          } else { 
            user.setUserID(row.id);
            resolve(row.id);
          }
        });
      }
    });
  });
}

/**
 * updates a user in the database
 * 
 * @param userID 
 * @param username 
 * @param password 
 * @returns Promise: with 'worked' or an error massage
 */
export function updateUser(userID: number, username: string, password: string, role: 'Schüler' | 'Lehrer' | 'Lehrbetrieb'): Promise<String> {
  const update = 'UPDATE User SET username=?, password=?, role=? WHERE userID=?';
  
  return new Promise((resolve, reject) => {
    db.run(update, [username, password, role, userID], (err: { message: any; }) => {
      if (err) {
        console.error(`Error updating user: ${err.message}`);
        reject(err.message);
      } else {
        resolve('worked');
      }
    });
  });
}

/**
 * selects an entity of the user table
 * 
 * @param userID to select entity 
 * @returns Promise: with the wanted entity or an error message
 */
export function selectEntity(userID: number | undefined): Promise<any> {
  const selectById = 'SELECT * FROM User WHERE userID=?';

  return new Promise((resolve, reject) => {
    db.get(selectById, [userID], (err: { message: any; }, row: any) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(row);
      }
    });
  });
}

/**
 * selects all users 
 * 
 * @returns Promise: with all rows of the table or an error message
 */
export function selectAll(): Promise<User[]> {
  const selectAll = 'SELECT * FROM User';

  return new Promise<User[]>((resolve, reject) => {
    db.all(selectAll, [], (err: { message: any; }, rows: User[]) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(rows.map(row => User.fromObject(row)));
      }
    });
  });
}

/**
 * deletes a user
 * 
 * @param id 
 * @returns Promise: with 'worked' or an error message
 */
export function deleteUser(id: number): Promise<any> {
  const deleteQuery = 'DELETE FROM User WHERE userID=?';
  return new Promise((resolve, reject) => {
    db.run(deleteQuery, id, (err: { message: any; }) => {
      if (err) {
        reject(err.message);
      } else {
        resolve('worked');
      }
    });
  });
}

