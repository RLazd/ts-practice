/*
const,let - global, function and BLOCK scope (if, forelopp, curly braces).
var - only global and function scope (if its in an if statement => you can access it globally)

Arrow funcions

+Default params in func should come last!!!

Spread operator

Rest Params - use with tuples

Destructurins


*/
const addArrowF = (a: number, b: number = 1) => a + b;

const printArrowWithFuncDef: (a: number | string) => void = (output) =>
  console.log(output);

const hobbies = ["Sport", "Cookies", "otherHobby"];
const activeHobbies = ["Hiking"];
activeHobbies.push(...hobbies);

//Rest Param with a tuple - could use just number[]
const addNumbersRetsParams = (...numbers: [number, number, number]) => {
  return numbers.reduce((acc, currVal) => {
    return acc + currVal;
  }, 0);
};
const addNumbers = addNumbersRetsParams(5, 10, 2);

// Destructuring (without colon!) - new array --> otherHobbies
const [hobby1, hobby2, ...otherHobbies] = hobbies;
console.log(otherHobbies);

const personObj = {
  firstName: "Max",
  age: 30,
};
const { firstName: username, age } = personObj; // elements are not pulled out n order! (but by key-names)
console.log(username, age);
