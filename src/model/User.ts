export class User {
    username: string;
    password: string;
    userID!: number;
  
    constructor(username: string, password: string) {
      this.username = username;
      this.password = password;
    }

    public setUserID(id: number) {
      this.userID = id; 
    }

    public getUserID(): number {
      return this.userID;
    }
  
    public getUsername(): string {
      return this.username;
    }
  
    public setUsername(username: string) {
      this.username = username;
    }
  
    public getPassword(): string {
      return this.password;
    }
  
    public setPassword(password: string) {
      this.password = password;
    }
  }
  