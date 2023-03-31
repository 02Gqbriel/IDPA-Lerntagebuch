//mocha.timeout(7000); --> mocha is not define 

import { expect } from 'chai';
import { insertUser } from '../../src/model/userDao';
import { User } from '../../src/model/User';

describe('insertUser', () => {
  it('should insert a user into the database', async () => {
    const user = new User("ammanna", "password");
    const result = await insertUser(user);
    expect(result).to.equal('worked');
  });
});


/* previous try that didn't work...

describe('insertUser', () => {
  it('when user successfully inserted it shoud return worked', () => {
    const user1 = new User('ammanna', 'password'); 
    return insertUser(user1).then((result) => {
      expect(result).to.equal('worked');
    })
  });
}); */