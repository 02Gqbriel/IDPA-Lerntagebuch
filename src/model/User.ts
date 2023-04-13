/*
* model class of a user in the learn diary 
* 
* author: Nimai Leuenberger
*/

export class User {
    private username: string;
    private password: string;
    private userID!: number;
    private role: 'Schüler' | 'Lehrer' | 'Lehrbetrieb';

    /**
     * constructor for a user 
     * 
     * @param username 
     * @param password 
     */
    constructor(username: string, password: string, role: 'Schüler' | 'Lehrer' | 'Lehrbetrieb') {
      this.username = username;
      this.password = password;
      this.role = role;
    }

    static fromObject(obj: any) {
      const user = new User(obj.username, obj.password, obj.role);
      return user;
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

    /**
     * @returns role
     */
    public getRole(): 'Schüler' | 'Lehrer' | 'Lehrbetrieb' {
      return this.role;
    }
    
    /**
     * @param role to set the role
     */
    public setRole(role: 'Schüler' | 'Lehrer' | 'Lehrbetrieb') {
      this.role = role;
    }
  }
  