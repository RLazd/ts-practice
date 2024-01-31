// INTERSECTION TYPES - allow to
// could be done with interface extension
type Admin = {
  name: string;
  privilige: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;
const e1: ElevatedEmployee = {
  name: "Ramo",
  privilige: ["priv1", "priv2"],
  startDate: new Date(),
};
type Combinable1 = string | number;
type Numeric = number | boolean;
type Universal = Combinable1 & Numeric;

// TYPE GUARDS - checks if you
/*
  typeof (only basic types); 
  'property' in Type/Object; 
  instanceof - For objects

*/
//+
// FUNCTION OVERLOADS - in case function recieves union types, you should know which types are returns
//overload:
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: number, b: string): string;
function add(a: string, b: number): string;
function add(a: Combinable1, b: Combinable1) {
  // Type guard
  if (typeof a === "string" || typeof b === "string") {
    return add.toString() + b.toString();
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;
function printEmployeeInfo(emp: UnknownEmployee) {
  console.log("Name ", emp.name);
  // checks if property exists !!! (Type guard)
  if ("priviliges" in emp) {
    console.log("Privilige ", emp.priviliges);
  }
}
printEmployeeInfo(e1);

class Car {
  drive() {
    console.log("Driving");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }
  loadCargo() {
    console.log("Loading cargo....");
  }
}

type Vehicle = Car | Truck;
const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCargo();
  }
}

useVehicle(v1);
useVehicle(v2);

// DISCRIMINATED UNION - use property ('type') that describes an object
interface Bird {
  type: "bird";
  flyingSpeed: number;
}
interface Horse {
  type: "horse";
  runningSpeed: number;
}
type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
      break;
    default:
      speed = 0;
  }
  console.log("Moving with speed: " + speed);
}

//
// TYPE CASTING
/*  ! = will never yield null
  <DOMElement> in the beginning
  as DOMElement
*/
const paragraph = document.getElementById("message-output");
//const userInputEl = <HTMLInputElement>document.getElementById("user-input")!;
const userInputEl = document.getElementById("user-input") as HTMLInputElement;
userInputEl.value = "Hi there!";
if (userInputEl) {
  (userInputEl as HTMLInputElement).value = "Hi there!";
}

// INDEX PROPERTIES [prop: type] : type;
interface ErrorContainer {
  // {email: 'Not a valid email', username: 'Muststart with a char!'}
  // id: string;  - OK// NOK -a number - cus index types only allow the same type
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: "Not a valid email!",
  username: "Must start with a capital letter!",
};

// OPTIONAL CHAINING -- ?.
const fetchedUserData = {
  id: "u1",
  name: "Max",
  job: { title: "CEO", description: "My own company" },
};
console.log(fetchedUserData?.job?.title);

// NULLISH COALESCING ?? - if null/undefined => use deault;
const userInputCoalescing = null;
const storedDate = userInput ?? "DEFAULT";
