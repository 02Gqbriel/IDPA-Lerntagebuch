class Entry {
    private entryID: number;
    private title: string;
    private date!: Date;
    private content: string;
  
    constructor(userID: number, username: string, password: string) {
      this.entryID = userID;
      this.title = username;
      this.content = password;
    }
    
    public get getEntryID(): number {
        return this.entryID;
    }
    public set setEntryID(entryID: number) {
        this.entryID = entryID;
    }

    public get getTitle(): string {
        return this.title;
    }
    public set setTitle(title: string) {
        this.title = title;
    }  

    public get getDate(): Date {
        return this.date;
    }
    public set setDate(date: Date) {
        this.date = date;
    }

    public get getContent(): string {
        return this.content;
    }
    public set setContent(content: string) {
        this.content = content;
    }
  }
  