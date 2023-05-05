/*
* model class of a subject in the learn diary 
* 
* author: Nimai Leuenberger
*/

export class Subject {
    private subjectID!: number;
    private name: string;
    private userID: number;

    /**
     * constructor for a subject
     * 
     * @param name 
     */
    constructor(name: string, userID: number) {
      this.name = name;
      this.userID = userID;
    }

    /**
     * makes object of any type into object of subject
     * 
     * @param obj 
     * @returns subject object
     */
    static fromObject(obj: any) {
      const subject = new Subject(obj.name, obj.userID);
      subject.setSubjectID(obj.subjectID);
      return subject;
    }
    
    /**
     * @returns subjectID
     */
    public getSubjectID(): number {
      return this.subjectID;
    }
    
    /**
     * @param id to set the subjectID
     */
    public setSubjectID(id: number) {
      this.subjectID = id;
    }
    
    /**
     * @returns name
     */
    public getName(): string {
      return this.name;
    }
    
    /**
     * @param name to set the name
     */
    public setName(name: string) {
      this.name = name;
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
  
