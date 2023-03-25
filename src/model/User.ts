class User {
    private userID: number;
    private user: string;
    private password: string;
  
    constructor(userID: number, username: string, password: string) {
      this.userID = userID;
      this.user = username;
      this.password = password;
    }
  
    get getUserID(): number {
      return this.userID;
    }
  
    set setUserID(userID: number) {
      this.userID = userID;
    }
  
    get getUsername(): string {
      return this.user;
    }
  
    set setUsername(username: string) {
      this.user = username;
    }
  
    get getPassword(): string {
      return this.password;
    }
  
    set setPassword(password: string) {
      this.password = password;
    }
  }
  