/**
 * tests the data access object of user 
 * 
 * author: Nimai Leuenberger 
 */

import { expect } from 'chai';
import { insertUser, selectAll, selectEntity, updateUser, deleteUser } from '../../src/model/userDao';
import { User } from '../../src/model/User';
import exp from 'node:constants';

const user = new User("ammanna", "password", "Schüler");
const user2 = new User("mustermax", "musterpasswort", "Lehrer");

/**
 * test of function insertUser 
 * 
 * return value should be a number (because if it failed it would be a error message --> string)
 */
describe('insertUser', () => {
  it('should insert a user into the database', async () => {
    const newUserID = await insertUser(user);
    expect(newUserID).to.be.a('number');
  });
});

/**
 * test of function updateUser 
 * 
 * return value should equal 'worked' 
 */
describe('updateUser', () => {
  it('should update the wanted user with the correct data',async () => {
    const result = await updateUser(user.getUserID(), user2.getUsername(), user2.getPassword(), user2.getRole());
    expect(result).to.equal('worked');
  })
});

/**
 * test of function selectEntity 
 * 
 * attributes of return value should equal the attributes of the wanted entity
 */
describe('selectEntity', () => {
  it('should return the correct user',async () => {
    selectEntity(user.getUserID()).then((row) => {
      expect(row.username).to.equal(user.getUsername());
      expect(row.password).to.equal(user.getPassword());
      expect(row.userID).to.equal(user.getUserID());
      expect(row.role).to.equal(user.getRole());
    });
  });
}); 

/**
 * test of function selectAll 
 * 
 * return value should be an array, have a greater length than 0 
 *    and have the same properties as user 
 */
describe('selectAll', () => {
  it('should return all users in database',async () => {
    const usersList = await selectAll();
    expect(usersList).to.be.an('array');
    expect(usersList.length).to.be.greaterThan(0);
    expect(usersList[0]).to.have.property('userID');
    expect(usersList[0]).to.have.property('username');
    expect(usersList[0]).to.have.property('password');
    expect(usersList[0]).to.have.property('role');
  })
})

/**
 * test of function deleteUser 
 * 
 * return value should equal 'worked'
 */
describe('delteUser', () => {
  it('should delete the user with given id',async () => {
    const result = await deleteUser(1);
    expect(result).to.equal('worked');
  })
})