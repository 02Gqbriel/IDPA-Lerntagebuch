/*
* model class of an entry in the learn diary 
* 
* author: Nimai Leuenberger
*/

import {Subject} from "./Subject";

export class Entry {
    private entryID!: number;
    private title: string;
    private date: string;
    private content: string;
    private subjectID: number;
    private userID: number;
    
    /**
     * constructor for an entry
     * 
     * @param title 
     * @param date 
     * @param content 
     * @param subject 
     */
    constructor(title: string, date: string, content: string, subjectID: number, userID: number) {
      this.title = title;
      this.date = date;
      this.content = content;
      this.subjectID = subjectID;
      this.userID = userID;
    }

    /**
     * makes object of any type into object of entry
     * 
     * @param obj 
     * @returns entry object
     */
    static fromObject(obj: any) {
        const entry = new Entry(obj.title, obj.date, obj.content, obj.subjectID, obj.userID);
        entry.setEntryID(obj.entryID);
        return entry;
    }
    
    /**
     * @returns entryID
     */
    public getEntryID(): number {
        return this.entryID;
    }

    /**
     * @param id to set the entryID
     */
    public setEntryID(id: number) {
        this.entryID = id;
    }

    /**
     * @returns title
     */
    public getTitle(): string {
        return this.title;
    }

    /**
     * @param title to set the title
     */
    public setTitle(title: string) {
        this.title = title;
    }  

    /**
     * @returns date
     */
    public getDate(): string {
        return this.date;
    }

    /**
     * @param date to set the date
     */
    public setDate(date: string) {
        this.date = date;
    }

    /**
     * @returns content
     */
    public getContent(): string {
        return this.content;
    }

    /**
     * @param content to set the content
     */
    public setContent(content: string) {
        this.content = content;
    }

    /**
     * @returns subjectID
     */
    public getSubjectID(): number {
        return this.subjectID;
    }

    /**
     * @param subjectID to set the subjectID
     */
    public setSubjectID(subjectID: number) {
        this.subjectID = subjectID;
    }

    /**
     * @returns userID
     */
    public getUserID(): number {
        return this.userID;
    }

    /**
     * @param userID to set the userID
     */
    public setUserID(userID: number) {
        this.userID = userID;
    }
  }
  