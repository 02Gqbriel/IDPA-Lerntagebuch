import {getIdByNamePwd} from "./userDao";

export class User {
    //private userID: number; // wieso? is doch auto increment...
    private username: string;
    private password: string;
    // nicht löschen mit auto_increment, sondern sql delete flag setzen und 
    // bei anzeige fragen, ob delete flag gesetzt wurde 
  
    constructor(username: string, password: string) {
      this.username = username;
      this.password = password;
    }
  
    getUserID(username: string, password: string): number {
      var userID = 0;
      const result = getIdByNamePwd(username, password);
      result.then((value) => {
        userID = value;
      });
      return userID;
    }
  
    get getUsername(): string {
      return this.username;
    }
  
    set setUsername(username: string) {
      this.username = username;
    }
  
    get getPassword(): string {
      return this.password;
    }
  
    set setPassword(password: string) {
      this.password = password;
    }
  }
  