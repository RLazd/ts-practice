// CLASS
class Department {
  // private readonly id: string; // no need to double initialize !
  // public name: string = "DEFAULT"; //field of a class
  private employees: string[] = [];
  constructor(private readonly id: string, public name: string) {
    //this.name = n; no need to double initialize !
  }

  describe(this: Department) {
    console.log(`Department: ${this.name}, ${this.id}`);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }
  printEmployInfo() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}
// OBJECT
const accounting = new Department("d1", "Accounting");

// THIS
accounting.describe(); //Department: Accounting
const accountingCopy = { name: "s", describe: accounting.describe }; // Object literal, this = the thing which is responsible for calling method
//accountingCopy.describe(); // if without this (name property) => Department: undefined

// PUBLIC, PRIVATE = modifiers
accounting.addEmployee("Max");
accounting.printEmployInfo();

// READONLY - cant assign to this property, used just once when initialized !
