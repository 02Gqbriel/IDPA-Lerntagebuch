/**
 * tests the data access object of entry 
 * 
 * author: Nimai Leuenberger 
 */

import { expect } from 'chai';
import { insertEntry, selectAll, selectEntity, updateEntry, deleteEntry } from '../../src/model/entryDao';
import { insertSubject } from '../../src/model/subjectDao';
import { Entry } from '../../src/model/Entry';
import { Subject } from '../../src/model/Subject';

const subject = new Subject("Mathe");
const entry = new Entry("Kurs1", "2022-05-22", "Das ist der Erste Kurs", subject);
const entry2 = new Entry("Kurs2", "2023-06-11", "Das ist der zweite Kurs", subject);

/**
 * test of function insertEntry 
 * 
 * return value should be a number (because if it failed it would be a error message --> string)
 */
describe('insertEntry', () => {
  it('should insert a entry into the database', async () => {
    const newSubjectID = await insertSubject(subject);
    const newEntryID = await insertEntry(entry);
    console.log(await selectAll());
    expect(newEntryID).to.be.a('number');
  });
});

/**
 * test of function updateEntry 
 * 
 * return value should equal 'worked' 
 */
describe('updateEntry', () => {
  it('should update the wanted entry with the correct data',async () => {
    const result = await updateEntry(entry.getEntryID(), entry2.getSubject().getSubjectID(), entry2.getTitle(), entry2.getDate(), entry2.getContent());
    console.log(await selectAll());
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
      expect(row.entryID).to.equal(entry.getEntryID());
      expect(row.subjectID).to.equal(entry.getSubject().getSubjectID());
      expect(row.title).to.equal(entry.getTitle());
      expect(row.date).to.equal(entry.getDate());
      expect(row.content).to.equal(entry.getContent());
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
    expect(entrysList[0].getEntryID()).to.equal(entry.getEntryID());            
    expect(entrysList[0].getTitle()).to.equal(entry2.getTitle());
    expect(entrysList[0].getDate()).to.equal(entry2.getDate());
    expect(entrysList[0].getContent()).to.equal(entry2.getContent());
    expect(entrysList[0].getSubject()).to.equal(entry2.getSubject());
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