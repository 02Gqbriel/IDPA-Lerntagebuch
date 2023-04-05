//import sqlite3 from 'sqlite3';
const sqlite3 = require('sqlite3').verbose();
import { Subject } from "./Subject";

const path = require('path');
const dbPath = path.join(__dirname, '..', 'database', 'learndiary.db');
const db = new sqlite3.Database(dbPath);


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

export function selectAll(): Promise<Subject[]> {
  const selectAll = 'SELECT * FROM Subject';

  return new Promise<Subject[]>((resolve, reject) => {
    db.all(selectAll, [], (err: { message: any; }, rows: Subject[]) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(rows);
      }
    });
  });
}

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