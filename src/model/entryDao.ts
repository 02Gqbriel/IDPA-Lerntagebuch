//import sqlite3 from 'sqlite3';
const sqlite3 = require('sqlite3').verbose();
import { Entry } from "./Entry";

const path = require('path');
const dbPath = path.join(__dirname, '..', 'database', 'learndiary.db');
const db = new sqlite3.Database(dbPath);


export function insertEntry(entry: Entry): Promise<any> {
  const insert = 'INSERT INTO Entry (subjectID, title, date, content) VALUES (?,?,?,?)';
  const selectQuery = 'SELECT last_insert_rowid() as id';

  return new Promise((resolve, reject) => {
    db.run(insert, [entry.getSubject().getSubjectID(), entry.getTitle(), entry.getDate(), entry.getContent()], (err: { message: any; }) => {
      if (err) {
        reject(err.message);
      } else {
        db.get(selectQuery, [], function (err: any, row: any) {
          if (err) {
            reject(err.message);
          } else { 
            entry.setEntryID(row.id);
            resolve(row.id);
          }
        });
      }
    });
  });
}

export function updateEntry(entryID: number, subjectID: number, title: string, date: Date, content: string): Promise<String> {
  const update = 'UPDATE Entry SET subjectID=?, title=?, date=?, content=? WHERE entryID=?';
  
  return new Promise((resolve, reject) => {
    db.run(update, [subjectID, title, date, content, entryID], (err: { message: any; }) => {
      if (err) {
        console.error(`Error updating user: ${err.message}`);
        reject(err.message);
      } else {
        resolve('worked');
      }
    });
  });
}

export function selectEntity(entryID: number | undefined): Promise<any> {
  const selectById = 'SELECT * FROM Entry WHERE entryID=?';

  return new Promise((resolve, reject) => {
    db.get(selectById, [entryID], (err: { message: any; }, row: any) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(row);
      }
    });
  });
}

export function selectAll(): Promise<Entry[]> {
  const selectAll = 'SELECT * FROM Entry';

  return new Promise<Entry[]>((resolve, reject) => {
    db.all(selectAll, [], (err: { message: any; }, rows: Entry[]) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(rows);
      }
    });
  });
}

export function deleteEntry(id: number): Promise<any> {
  const deleteQuery = 'DELETE FROM Entry WHERE entryID=?';
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

