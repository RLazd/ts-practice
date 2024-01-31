// GENERICS - Flexibility + Type safety
/*
 Array of strings is basically two types - Array and String: Array<String> === string[]
 Array<String> is a generic type
 const names: string[] = ["Max", "Manu"];

 Promise is also a generic type - Promise<another-type> 

=> Generics give extra support (calling string, number functions etc.)
*/
const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("This is done!");
  }, 2000);
});
promise.then((data) => {
  data.split(" ");
});

// GENERIC FUNCTION - returns intersection of <T, U>
// With generic types now can access properties of objects
// CONSTRAINTS - restrict T,U
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA!, objB); // Object.assign() - can only merge objects!
}

const mergedObj = merge(
  { name: "Max", hobbies: ["Sports", "Knitting"] },
  { age: 30 }
);
console.log(mergedObj.age); // 30!
console.log(mergedObj.name); // 30!

// Another funciton - CONSTRAINTS
interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T) {
  let description = "Got no value!";
  if (element.length > 0) description = "Got " + element.length + " elements";
  return [element, description];
}
console.log(countAndDescribe(["Hi there!", "another element"]));

//KEYOF CONSTRAINT
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return obj[key];
}
console.log(extractAndConvert({ name: "Ram" }, "name"));

// GENERIC CLASSES
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    //Problem with non-primitive values  - indexOf -> if cant find returns -1; -> splice(-1, 1)
    if (this.data.indexOf(item) === -1) return;
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}
const stringStorage = new DataStorage<string>();
stringStorage.addItem("String");
// const objStorage = new DataStorage<object>();
// objStorage.addItem({ name: "Max" });

// GENERIC UTILITY TYPES 1.  PARTIAL<type> => all properties are optional   2.READONLY
interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {}; // Properties optional only temporarily
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal; // type casting
}

const words: Readonly<string[]> = ["Max", "Sports"];
//names2.push("Manu");

// GENERICS vs UNION TYPES
// DataStorage example -T is not consistently the same
// T extends string | number | boolean  = choose just 1 and T will be the same everywhere
