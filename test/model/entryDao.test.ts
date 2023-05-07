/**
 * tests the data access object of entry 
 * 
 * author: Nimai Leuenberger 
 */

import { expect } from 'chai';
import { insertEntry, selectAll, selectEntity, updateEntry, deleteEntry } from '../../src/model/entryDao';
import { insertUser } from '../../src/model/userDao';
import { insertSubject } from '../../src/model/subjectDao';
import { Entry } from '../../src/model/Entry';
import { Subject } from '../../src/model/Subject';
import { User } from '../../src/model/User';

const user = new User("ammanna", "password", "Schüler");
async () => {
  await insertUser(user);
}
const subject = new Subject("Mathe", user.getUserID());
const entry = new Entry("Kurs1", "2022-05-22", "Das ist der Erste Kurs", subject.getSubjectID(), user.getUserID());
const entry2 = new Entry("Kurs2", "2023-06-11", "Das ist der zweite Kurs", subject.getSubjectID(), user.getUserID());

/**
 * test of function insertEntry 
 * 
 * return value should be a number (because if it failed it would be a error message --> string)
 */
describe('insertEntry', () => {
  it('should insert a entry into the database', async () => {
    const newSubjectID = await insertSubject(subject);
    entry.setSubjectID(newSubjectID);
    entry2.setSubjectID(newSubjectID);
    const newEntryID = await insertEntry(entry);
    expect(newEntryID).to.be.a('number');
    expect(newEntryID).to.equal(entry.getEntryID());
  });
});

/**
 * test of function updateEntry 
 * 
 * return value should equal 'worked' 
 */
describe('updateEntry', () => {
  it('should update the wanted entry with the correct data',async () => {
    const result = await updateEntry(entry.getEntryID(), entry2.getSubjectID(), entry2.getTitle(), entry2.getDate(), entry2.getContent(), entry2.getUserID());
    expect(result).to.equal('worked');
  })
});

/**
 * test of function selectEntity 
 * 
 * attributes of return value should equal the attributes of the wanted entity
 */
describe('selectEntity', () => {
  it('should return the correct entry',async () => {
    selectEntity(entry.getEntryID()).then((row) => {
      expect(row.getEntryID()).to.equal(entry.getEntryID());
      expect(row.getSubjectID()).to.equal(entry.getSubjectID());
      expect(row.getTitle()).to.equal(entry.getTitle());
      expect(row.getDate()).to.equal(entry.getDate());
      expect(row.getContent()).to.equal(entry.getContent());
    });
  });
}); 

/**
 * test of function selectAll 
 * 
 * return value should be an array, have a greater length than 0 
 *    and have the same properties as entry 
 */
describe('selectAll', () => {
  it('should return all entrys in database',async () => {                                                             
    const entrysList = await selectAll();  
    const lastentry = entrysList[entrysList.length - 1]; 
    expect(lastentry.getEntryID()).to.equal(entry.getEntryID());            
    expect(lastentry.getTitle()).to.equal(entry2.getTitle());
    expect(lastentry.getDate()).to.equal(entry2.getDate());
    expect(lastentry.getContent()).to.equal(entry2.getContent());
    expect(lastentry.getSubjectID()).to.equal(entry2.getSubjectID());
  })
})

/**
 * test of function deleteEntry 
 * 
 * return value should equal 'worked'
 */
describe('delteEntry', () => {
  it('should delete the entry with given id',async () => {
    const result = await deleteEntry(1);
    expect(result).to.equal('worked');
  })
})