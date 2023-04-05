export class Subject {
    private subjectID!: number;
    private name: string;
  
    constructor(name: string) {
      this.name = name;
    }
  
    public getSubjectID(): number {
      return this.subjectID;
    }
  
    public setSubjectID(id: number) {
      this.subjectID = id;
    }
  
    public getName(): string {
      return this.name;
    }
  
    public setName(name: string) {
      this.name = name;
    }
  }
  