// INTERFACE - describe structure of an obj; has no values
interface Named {
  readonly name?: string;
  outputName?: string;
}

interface Greetable extends Named {
  //readonly name: string;
  greet(phrase: string): void;
}

class Person implements Greetable {
  name?: string | undefined;
  age: number;

  constructor(age: number, n?: string) {
    this.name = n;
    this.age = age;
  }

  greet(phrase: string) {
    if (this.name) {
      console.log(`${phrase}, ${this.name}`);
    } else {
      console.log(phrase);
    }
  }
}

let user1 = new Person(27, "Ram");
user1.greet("Hello");

//Interfaces AS FUNCTION TYPES
interface AddFn {
  (a: number, b: number): number;
}
let addImplInterface: AddFn;

addImplInterface = (n1: number, n2: number) => {
  return n1 + n2;
};

/*
Interface: (it is implemented!)
type Person = {}  => type vs interface => interface is clearer: u define an object! + interfaces can be implemented in a classs (classes can implement multiple interfaces)
Intrface - enforces structure- methods, properties 

READONLY interface properties (it does not have public/private prop)

Interface extends AnotherInterface

Optional Parameters and Properties - add ? 

Interfaces are not translated to .js files (JS has no knowledge in this!)

*/
