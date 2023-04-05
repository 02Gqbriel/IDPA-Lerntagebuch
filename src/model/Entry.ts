import {Subject} from "./Subject";

export class Entry {
    private entryID!: number;
    private title: string;
    private date!: Date;
    private content: string;
    private subject: Subject;    
  
    constructor(title: string, date: Date, content: string, subject: Subject) {
      this.title = title;
      this.date = date;
      this.content = content;
      this.subject = subject;
    }
    
    public getEntryID(): number {
        return this.entryID;
    }
    public setEntryID(id: number) {
        this.entryID = id;
    }

    public getTitle(): string {
        return this.title;
    }
    public setTitle(title: string) {
        this.title = title;
    }  

    public getDate(): Date {
        return this.date;
    }
    public setDate(date: Date) {
        this.date = date;
    }

    public getContent(): string {
        return this.content;
    }
    public setContent(content: string) {
        this.content = content;
    }

    public getSubject(): Subject {
        return this.subject;
    }
    public setSubject(value: Subject) {
        this.subject = value;
    }
  }
  