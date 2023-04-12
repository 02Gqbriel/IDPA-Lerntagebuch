//import sqlite3 from 'sqlite3';
const sqlite3 = require('sqlite3').verbose();
import { User } from './User';

const path = require('path');
const dbPath = path.join(__dirname, '..', 'database', 'learndiary.db');
const db = new sqlite3.Database(dbPath);

export function insertUser(user: User): Promise<any> {
	const insert = 'INSERT INTO User (username, password) VALUES (?,?)';
	const selectQuery = 'SELECT last_insert_rowid() as id';

	return new Promise((resolve, reject) => {
		db.run(
			insert,
			[user.getUsername(), user.getPassword()],
			(err: { message: any }) => {
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
			}
		);
	});
}

export function updateUser(
	userID: number,
	username: string,
	password: string
): Promise<String> {
	const update = 'UPDATE User SET username=?, password=? WHERE userID=?';

	return new Promise((resolve, reject) => {
		db.run(update, [username, password, userID], (err: { message: any }) => {
			if (err) {
				console.error(`Error updating user: ${err.message}`);
				reject(err.message);
			} else {
				resolve('worked');
			}
		});
	});
}

export function selectEntity(userID: number | undefined): Promise<any> {
	const selectById = 'SELECT * FROM User WHERE userID=?';

	return new Promise((resolve, reject) => {
		db.get(selectById, [userID], (err: { message: any }, row: any) => {
			if (err) {
				reject(err.message);
			} else {
				resolve(row);
			}
		});
	});
}

export function selectAll(): Promise<User[]> {
	const selectAll = 'SELECT * FROM User';

	return new Promise<User[]>((resolve, reject) => {
		db.all(selectAll, [], (err: { message: any }, rows: User[]) => {
			if (err) {
				reject(err.message);
			} else {
				resolve(rows);
			}
		});
	});
}

export function deleteUser(id: number): Promise<any> {
	const deleteQuery = 'DELETE FROM User WHERE userID=?';
	return new Promise((resolve, reject) => {
		db.run(deleteQuery, id, (err: { message: any }) => {
			if (err) {
				reject(err.message);
			} else {
				resolve('worked');
			}
		});
	});
}
