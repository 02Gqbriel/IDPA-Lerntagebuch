//mocha.timeout(7000); --> mocha is not define 

import { expect } from 'chai';
import { insertUser, selectAll, selectEntity, updateUser, deleteUser } from '../../src/model/userDao';
import { User } from '../../src/model/User';

const user = new User("ammanna", "password");
const user2 = new User("mustermax", "musterpasswort");


describe('insertUser', () => {
  it('should insert a user into the database', async () => {
    const newUserID = await insertUser(user);
    expect(newUserID).to.be.a('number');
  });
});

describe('updateUser', () => {
  it('should update the wanted user with the correct data',async () => {
    const result = await updateUser(user.getUserID(), user2.getUsername(), user2.getPassword());
    expect(result).to.equal('worked');
  })
});

describe('selectEntity', () => {
  it('should return the correct user',async () => {
    selectEntity(user.getUserID()).then((row) => {
      expect(row.username).to.equal(user.getUsername());
      expect(row.password).to.equal(user.getPassword());
      expect(row.userID).to.equal(user.getUserID());
    });
  });
}); 

describe('selectAll', () => {
  it('should return all users in database',async () => {
    const usersList = await selectAll();
    expect(usersList).to.be.an('array');
    expect(usersList.length).to.be.greaterThan(0);
    expect(usersList[0]).to.have.property('userID');
    expect(usersList[0]).to.have.property('username');
    expect(usersList[0]).to.have.property('password');
  })
})

describe('delteUser', () => {
  it('should delete the user with given id',async () => {
    const result = await deleteUser(1);
    expect(result).to.equal('worked');
  })
})