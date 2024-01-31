//JS is dynamically typed (resolved at runtime), TS - statically typed (set during development) - types dont change during runtime!!! Primitive types- lowercase

//
//CORE TYPES
function addAndShow(n1: number, n2: number, showResult: boolean) {
  console.log(typeof n1);
  return `${n1 + n2}, ${showResult}`;
}

//Type inferance - type of a variable is determined by the type of its initial value
//u can add  x :number to a const variable, but its not a good practice
const number1 = 5; //all numbers all floats 5 === 5.0
const number2 = 7;
let number3: number; //if not initialized you need a type
let printResult = true;
const result = addAndShow(number1, number2, printResult);

//
// OBJECT TYPES
//Object types - have semicolons, have -->  key:type;   pairs
// const person: {
//   name: string;
//   age: number;
// } --> again not advised this syntax

//
// TUPLE - fixed length, type array--> role: [number, string]
//allows push

//
// ENUM
enum Role {
  ADMIN = 5, //can assign starting value or types
  READ_ONLY,
  AUTHOR,
}

//
// ANY - avoid when possible
let favouriteActivities: any[];
favouriteActivities = ["Sports", 1];

const person = {
  name: "Ram",
  age: 30,
  hobbies: ["Sports", "Cooking"],
  //role: [2, "author"], // iference doesnt work ; role: [number, string] //TUPLE
  role: Role.ADMIN, //ENUM
};

//
// UNION - number | string

//
// TYPE ALIASES - use type keyword
type Combinable = number | string;
type ConversionDescription = "as-number" | "as-text";

type User = { name: string; age: number };
const u1: User = { name: "Max", age: 30 };

//
// LITERAL TYPES
function combine(
  inp1: string | number,
  inp2: Combinable,
  resultConversion: ConversionDescription
) {
  if (resultConversion === "as-number") {
    return +inp1 + +inp2;
  } else {
    return inp1.toString() + inp2.toString();
  }
}

//
// FUNCTION RETURN TYPES
function add2(n1: number, n2: number): number {
  return n1 + n2;
}
// no need to specify void
function printResult2(num: number): void {
  console.log(num);
}
printResult2(add2(2, 5));

let someValue: undefined; //undefined is a valid type-> can be used if funciton returns nothing (rarely used, void is better)

//
// FUNCTIONS AS TYPES
let combineValuesJustAsFunction: Function;
let combineValuesSpecificFunction: (a: number, b: number) => number;
combineValuesSpecificFunction = add2;

//
// FUNCTION TYPES AND CALLBACKS
//callback functions can return something, even if the argument on which they're passed does NOT expect a returned value.
function addAndHandle(n1: number, n2: number, callback: (num: number) => void) {
  const result = n1 + n2;
  callback(result);
}

addAndHandle(10, 20, (result) => {
  console.log(result);
  return "hello"; // will be ignored!
});

function sendRequest(data: string, cb: (response: any) => void) {
  // ... sending a request with "data"
  return cb({ data: "Hi there!" });
}

sendRequest("Send this!", (response) => {
  console.log(response);
  return true;
});

//
// UNKNOWN -  more strict than any (better)
let userInput: unknown;
let userName: string;
if (typeof userInput === "string") userName = userInput;

//
// NEVER
// this function returns never (no need to point it)!!! (also void)
//another function of never --> infinite loop while (true) {}
function generateError(msg: string, code: number): never {
  throw { message: msg, errorCode: code };
}
//generateError("An error occured!", 500);
