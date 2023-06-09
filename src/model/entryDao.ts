/**
 * data access object for an entry
 *
 * author: Nimai Leuenberger
 */

const sqlite3 = require('sqlite3').verbose();
import { Entry } from './Entry';

const path = require('path');
const dbPath = path.join(__dirname, '..', 'database', 'learndiary.db');
const db = new sqlite3.Database(dbPath);

/**
 * inserts an entry into the database
 *
 * @param entry
 * @returns Promise: with the id of the inserted entry or an error message
 */
export function insertEntry(entry: Entry): Promise<any> {
	const insert =
		'INSERT INTO Entry (subjectID, title, date, content, userID) VALUES (?,?,?,?,?)';
	const selectQuery = 'SELECT last_insert_rowid() as id';

	return new Promise((resolve, reject) => {
		db.run(
			insert,
			[
				entry.getSubjectID(),
				entry.getTitle(),
				entry.getDate(),
				entry.getContent(),
				entry.getUserID(),
			],
			(err: { message: any }) => {
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
			}
		);
	});
}

/**
 * updates an entry in the database
 *
 * @param entryID
 * @param subjectID
 * @param title
 * @param date
 * @param content
 * @returns Promise: with 'worked' or an error massage
 */
export function updateEntry(
	entryID: number,
	subjectID: number,
	title: string,
	date: string,
	content: string,
	userID: number
): Promise<String> {
	const update =
		'UPDATE Entry SET subjectID=?, title=?, date=?, content=?, userID=? WHERE entryID=?';

	return new Promise((resolve, reject) => {
		db.run(
			update,
			[subjectID, title, date, content, userID, entryID],
			(err: { message: any }) => {
				if (err) {
					reject(err.message);
				} else {
					resolve('worked');
				}
			}
		);
	});
}

/**
 * selects an entity of the entry table
 *
 * @param entryID to select entity
 * @returns Promise: with the wanted entity or an error message
 */
export function selectEntity(entryID: number | undefined): Promise<Entry> {
	const selectById = 'SELECT * FROM Entry WHERE entryID=?';

	return new Promise((resolve, reject) => {
		db.get(selectById, [entryID], (err: { message: any }, row: Entry) => {
			if (err) {
				reject(err.message);
			} else {
				resolve(row);
			}
		});
	});
}

/**
 * selects all entrys
 *
 * @returns Promise: with all rows of the table or an error message
 */
export function selectAll(): Promise<Entry[]> {
	const selectAll = 'SELECT * FROM Entry';

	return new Promise<Entry[]>((resolve, reject) => {
		db.all(selectAll, [], (err: { message: any }, rows: Entry[]) => {
			if (err) {
				reject(err.message);
			} else {
				resolve(rows.map(row => Entry.fromObject(row)));
			}
		});
	});
}

/**
 * deletes an entry
 *
 * @param id
 * @returns Promise: with 'worked' or an error message
 */
export function deleteEntry(id: number): Promise<any> {
	const deleteQuery = 'DELETE FROM Entry WHERE entryID=?';
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
