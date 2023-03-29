import {Subject} from "./Subject";

export class Entry {
    private entryID: number;
    private title: string;
    private date!: Date;
    private content: string;
    private subject: Subject;    
  
    constructor(entryID: number, title: string, date: Date, content: string, subject: Subject) {
      this.entryID = entryID;
      this.title = title;
      this.date = date;
      this.content = content;
      this.subject = subject;
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

    public get getSubject(): Subject {
        return this.subject;
    }
    public set setSubject(value: Subject) {
        this.subject = value;
    }
  }
  