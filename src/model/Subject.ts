/*
* model class of a subject in the learn diary 
* 
* author: Nimai Leuenberger
*/

export class Subject {
    private subjectID!: number;
    private name: string;

    /**
     * constructor for a subject
     * 
     * @param name 
     */
    constructor(name: string) {
      this.name = name;
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
  }
  