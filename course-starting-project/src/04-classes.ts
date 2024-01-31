// CLASS
abstract class Department {
  static fiscalYear = 2020;
  protected employees: string[] = [];

  constructor(protected readonly id: string, public name: string) {
    //this.name = n; no need to double initialize !
  }

  static createEmployee(name: string) {
    return { name: name };
  }

  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployInfo() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

// INHERITANCE
/*
class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }
}
const itDepartment = new ITDepartment("d1", ["Max"]);
*/

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  get mostRecentReport() {
    if (this.lastReport) return this.lastReport;
    throw new Error("No last report!");
  }

  set mostRecentReport(value: string) {
    this.addReport(value);
  }

  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment("d2", []);
    return this.instance;
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  addEmployee(name: string) {
    if (name === "Max") return;
    this.employees.push(name);
  }

  describe() {
    console.log("Method overriden");
  }
}

// singleton pattern with private contructor
const accounting = AccountingDepartment.getInstance(); //("d1", ["Manu", "Max"]);

// THIS
accounting.describe(); //Department: Accounting
const accountingCopy = { name: "s", describe: accounting.describe }; // Object literal, this = the thing which is responsible for calling method
//accountingCopy.describe(); // if without this (name property) => Department: undefined

// PUBLIC, PRIVATE = modifiers
accounting.addEmployee("Max");
accounting.addEmployee("Rin");
accounting.printEmployInfo();
// PROTECTED - accessible in any class that extends the super class
// READONLY - cant assign to this property, used just once when initialized !

// SETTER -
accounting.mostRecentReport = "Ram";
// GETTER - get methodName(){return....} - dont call as a function
console.log("Last report: ", accounting.mostRecentReport);

// STATIC METHODS and PROPERTIES - use static keyword; cant access from other class methods (cus static proeprties are detached from instances!!! - u have to use Department.staticPrope)
const employee1 = Department.createEmployee("Ram");
console.log(employee1);
console.log(Department.fiscalYear);

// ABSTRACT CLASSES - force method override abstract class Name + abstract methodName(): void;
accounting.describe();

// SINGLETONS (always have just 1 instance of a class), PRIVATE CONSTRUCTOR
// private constructor - accessible only from inside a class -> call from static method that returns an instance or makes one
