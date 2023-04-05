//mocha.timeout(7000); --> mocha is not define 

import { expect } from 'chai';
import { insertEntry, selectAll, selectEntity, updateEntry, deleteEntry } from '../../src/model/entryDao';
import { insertSubject } from '../../src/model/subjectDao';
import { Entry } from '../../src/model/Entry';
import { Subject } from '../../src/model/Subject';

const subject = new Subject("Mathe");
const date = new Date('2022-05-22');
const entry = new Entry("Kurs1", date, "Das ist der Erste Kurs", subject);
const entry2 = new Entry("Kurs2", date, "Das ist der zweite Kurs", subject);


describe('insertEntry', () => {
  it('should insert a entry into the database', async () => {
    await insertSubject(subject);
    const newEntryID = await insertEntry(entry);
    expect(newEntryID).to.be.a('number');
  });
});

describe('updateEntry', () => {
  it('should update the wanted entry with the correct data',async () => {
    const result = await updateEntry(entry.getEntryID(), entry2.getSubject().getSubjectID(), entry2.getTitle(), entry2.getDate(), entry2.getContent());
    expect(result).to.equal('worked');
  })
});

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

describe('selectAll', () => {
  it('should return all entrys in database',async () => {
    const entrysList = await selectAll();
    expect(entrysList).to.be.an('array');
    expect(entrysList.length).to.be.greaterThan(0);
    expect(entrysList[0]).to.have.property('entryID');
    expect(entrysList[0]).to.have.property('subjectID');
    expect(entrysList[0]).to.have.property('title');
    expect(entrysList[0]).to.have.property('date');
    expect(entrysList[0]).to.have.property('content');
  })
})

describe('delteEntry', () => {
  it('should delete the entry with given id',async () => {
    const result = await deleteEntry(1);
    expect(result).to.equal('worked');
  })
})