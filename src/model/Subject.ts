class Subject {
    private subjectID: number;
    private name: string;
  
    constructor(subjectID: number, name: string) {
      this.subjectID = subjectID;
      this.name = name;
    }
  
    get getSubjectID(): number {
      return this.subjectID;
    }
  
    set setSubjectID(subjectID: number) {
      this.subjectID = subjectID;
    }
  
    get getName(): string {
      return this.name;
    }
  
    set setName(name: string) {
      this.name = name;
    }
  }
  