/**
 * tests the data access object of user 
 * 
 * author: Nimai Leuenberger 
 */

import { expect } from 'chai';
import { insertUser, selectAll, selectEntity, updateUser, deleteUser } from '../../src/model/userDao';
import { User } from '../../src/model/User';

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
    expect(newUserID).to.equal(user.getUserID());
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
  });
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
  it('should return an error: invalid userID',async () => {
    selectEntity(1000).then((row) => {
      expect(row).to.equal("undefined");
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
    const lastuser = usersList[usersList.length - 1];
    expect(lastuser.getUserID()).to.equal(user2.getUserID());
    expect(lastuser.getUsername()).to.equal(user2.getUsername());
    expect(lastuser.getPassword()).to.equal(user2.getPassword());
    expect(lastuser.getRole()).to.equal(user2.getRole());
  })
});

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