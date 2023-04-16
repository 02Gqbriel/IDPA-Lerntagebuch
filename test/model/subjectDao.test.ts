/**
 * tests the data access object of subject 
 * 
 * author: Nimai Leuenberger 
 */

import { expect } from 'chai';
import { insertSubject, selectAll, selectEntity, updateSubject, deleteSubject } from '../../src/model/subjectDao';
import { Subject } from '../../src/model/Subject';

const subject = new Subject("Mathe");
const subject2 = new Subject("Franz");

/**
 * test of function insertSubject 
 * 
 * return value should be a number (because if it failed it would be a error message --> string)
 */
describe('insertSubject', () => {
  it('should insert a subject into the database', async () => {
    const newSubjectID = await insertSubject(subject);
    expect(newSubjectID).to.be.a('number');
  });
});

/**
 * test of function updateSubject
 * 
 * return value should equal 'worked' 
 */
describe('updateSubject', () => {
  it('should update the wanted subject with the correct data',async () => {
    const result = await updateSubject(subject.getSubjectID(), subject2.getName());
    expect(result).to.equal('worked');
  })
});

/**
 * test of function selectEntity 
 * 
 * attributes of return value should equal the attributes of the wanted entity
 */
describe('selectEntity', () => {
  it('should return the correct subject',async () => {
    selectEntity(subject.getSubjectID()).then((row) => {
      expect(row.name).to.equal(subject.getName());
      expect(row.subjectID).to.equal(subject.getSubjectID());
    });
  });
}); 

/**
 * test of function selectAll 
 * 
 * return value should be an array, have a greater length than 0 
 *    and have the same properties as subject 
 */
describe('selectAll', () => {
  it('should return all subjects in database',async () => {
    const subjectsList = await selectAll();
    expect(subjectsList[0].getSubjectID()).to.equal(subject2.getSubjectID());
    expect(subjectsList[0].getName()).to.equal(subject2.getName());
  })
})

/**
 * test of function deleteSubject 
 * 
 * return value should equal 'worked'
 */
describe('deleteSubject', () => {
  it('should delete the subject with given id',async () => {
    const result = await deleteSubject(1);
    expect(result).to.equal('worked');
  })
})