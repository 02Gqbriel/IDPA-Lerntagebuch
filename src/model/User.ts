/*
* model class of a user in the learn diary 
* 
* author: Nimai Leuenberger
*/

export class User {
    username: string;
    password: string;
    userID!: number;

    /**
     * constructor for a user 
     * 
     * @param username 
     * @param password 
     */
    constructor(username: string, password: string) {
      this.username = username;
      this.password = password;
    }
    
    /**
     * @param id to set the userID
     */
    public setUserID(id: number) {
      this.userID = id; 
    }

    /**
     * @returns userID
     */
    public getUserID(): number {
      return this.userID;
    }
    
    /**
     * @returns username
     */
    public getUsername(): string {
      return this.username;
    }
    
    /**
     * @param username to set the username
     */
    public setUsername(username: string) {
      this.username = username;
    }
    
    /**
     * @returns password
     */
    public getPassword(): string {
      return this.password;
    }
    
    /**
     * @param password to set the password
     */
    public setPassword(password: string) {
      this.password = password;
    }
  }
  