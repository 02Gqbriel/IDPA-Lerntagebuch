//mocha.timeout(7000); --> mocha is not define 

import { expect } from 'chai';
import { insertSubject, selectAll, selectEntity, updateSubject, deleteSubject } from '../../src/model/subjectDao';
import { Subject } from '../../src/model/Subject';

const subject = new Subject("Mathe");
const subject2 = new Subject("Franz");


describe('insertSubject', () => {
  it('should insert a subject into the database', async () => {
    const newSubjectID = await insertSubject(subject);
    expect(newSubjectID).to.be.a('number');
  });
});

describe('updateSubject', () => {
  it('should update the wanted subject with the correct data',async () => {
    const result = await updateSubject(subject.getSubjectID(), subject2.getName());
    expect(result).to.equal('worked');
  })
});

describe('selectEntity', () => {
  it('should return the correct subject',async () => {
    selectEntity(subject.getSubjectID()).then((row) => {
      expect(row.name).to.equal(subject.getName());
      expect(row.subjectID).to.equal(subject.getSubjectID());
    });
  });
}); 

describe('selectAll', () => {
  it('should return all subjects in database',async () => {
    const subjectsList = await selectAll();
    expect(subjectsList).to.be.an('array');
    expect(subjectsList.length).to.be.greaterThan(0);
    expect(subjectsList[0]).to.have.property('subjectID');
    expect(subjectsList[0]).to.have.property('name');
  })
})

describe('deleteSubject', () => {
  it('should delete the subject with given id',async () => {
    const result = await deleteSubject(1);
    expect(result).to.equal('worked');
  })
})