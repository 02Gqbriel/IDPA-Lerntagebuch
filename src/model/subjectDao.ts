/**
 * data access object for a subject  
 * 
 * author: Nimai Leuenberger
 */

const sqlite3 = require('sqlite3').verbose();
import { Subject } from "./Subject";

const path = require('path');
const dbPath = path.join(__dirname, '..', 'database', 'learndiary.db');
const db = new sqlite3.Database(dbPath);

/**
 * inserts a subject into the database
 * 
 * @param subject 
 * @returns Promise: with the id of the inserted subject or an error message
 */
export function insertSubject(subject: Subject): Promise<any> {
  const insert = 'INSERT INTO Subject (name) VALUES (?)';
  const selectQuery = 'SELECT last_insert_rowid() as id';

  return new Promise((resolve, reject) => {
    db.run(insert, [subject.getName()], (err: { message: any; }) => {
      if (err) {
        reject(err.message);
      } else {
        db.get(selectQuery, [], function (err: any, row: any) {
          if (err) {
            reject(err.message);
          } else { 
            subject.setSubjectID(row.id);
            resolve(row.id);
          }
        });
      }
    });
  });
}

/**
 * updates a subject in the database
 * 
 * @param subjectID 
 * @param name 
 * @returns Promise: with 'worked' or an error massage
 */
export function updateSubject(subjectID: number, name: string): Promise<String> {
  const update = 'UPDATE Subject SET name=? WHERE subjectID=?';
  
  return new Promise((resolve, reject) => {
    db.run(update, [name, subjectID], (err: { message: any; }) => {
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
 * selects an entity of the subject table
 * 
 * @param subjectID to select entity 
 * @returns Promise: with the wanted entity or an error message
 */
export function selectEntity(subjectID: number | undefined): Promise<any> {
  const selectById = 'SELECT * FROM Subject WHERE subjectID=?';

  return new Promise((resolve, reject) => {
    db.get(selectById, [subjectID], (err: { message: any; }, row: any) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(row);
      }
    });
  });
}

/**
 * selects all subjects 
 * 
 * @returns Promise: with all rows of the table or an error message
 */
export function selectAll(): Promise<Subject[]> {
  const selectAll = 'SELECT * FROM Subject';

  return new Promise<Subject[]>((resolve, reject) => {
    db.all(selectAll, [], (err: { message: any; }, rows: Subject[]) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(rows.map(row => Subject.fromObject(row)));
      }
    });
  });
}

/**
 * deletes a subject
 * 
 * @param id 
 * @returns Promise: with 'worked' or an error message
 */
export function deleteSubject(id: number): Promise<any> {
  const deleteQuery = 'DELETE FROM Subject WHERE subjectID=?';
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