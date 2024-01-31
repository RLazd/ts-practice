// DECORATORS - instrument that makes code easier  to use by other devs (not to end-users)
// META PROGRAMMING

/*
Decorator - function Name(target:) , @Name
Decorators execute: when class is defined (not instantiated)

Can add 1+ decorators! => Execution
  1. Factories - TOP TO BOTTOM
  2. Actual functions -BOTTOM UP


*/
//DECORATOR FACTORIES - returns function

// Runs when class is declared
//Factory
function Logger(logString: string) {
  console.log("LOGGER FACTORY");
  //Actual decorator
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

//Runs when class is instantiated - cus of new constructor funtions
function WithTemplate(template: string, hookId: string) {
  console.log("TEMPLATE FACTORY");
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    // Dec function returns a class (synctactic sugar for constructor f)
    return class extends originalConstructor {
      constructor(...args: any[]) {
        super();
        console.log("Rendering template...");
        const hookEl = document.getElementById(hookId);
        //const p = new originalConstructor();
        //console.log("p", p); // p = class that is defined
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

@Logger("Logging...")
@WithTemplate("<h1>My person object</h1>", "app")
class PersonWithDecorators {
  name = "Max";
  constructor() {
    //console.log("Creating person object");
  }
}
const pers = new PersonWithDecorators();
console.log(pers);

// USE DECORATORS in these places
/*
executes when class is defined

PROPERTY DECORATORS - LogProperty(target: any, propertyName: string)
ACCESSOR dec- LogAccessors(  target: any,  name: string,  descriptor: PropertyDescriptor) 
METHOD dec - LogMethod(  target: any,  name: string | Symbol,  descriptor: PropertyDescriptor)
PARAMETER dec - LogParameter(target: any, name: string | Symbol, position: number)

Decorator return types: 
  Can return smth : Method, Accessor Decorators (Properties, PArameters - can return smtg, but TS will ignore it)
  Method, Accessor -> can return NEW DESCRIPTOR (Property escriptor - Object that allows to define property more deeply - configurable, enumerable, value, writable...)

*/
function LogProperty(target: any, propertyName: string) {
  console.log("Property decorator");
  console.log(target, propertyName); // target -Prorotyp oobjet; propertyName- 'title'
}

function LogAccessors(
  target: any,
  name: string,
  descriptor: PropertyDescriptor
) {
  // console.log("Accesor dec!");
  // console.log("target accessor: ", target);
  // console.log("name accessor: ", name);
  // console.log("descriptor accessor: ", descriptor);
}

function LogMethod(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  // console.log("Method dec!");
  // console.log("target accessor: ", target);
  // console.log("name accessor: ", name);
  console.log("descriptor accessor: ", descriptor);
}

function LogParameter(target: any, name: string | Symbol, position: number) {
  // console.log("Parameter dec!");
  // console.log("target accessor: ", target);
  // console.log("name accessor: ", name);
  // console.log("position accessor: ", position);
}

class Product {
  @LogProperty
  title: string;
  private _priceFull: number;

  @LogAccessors
  set _priceOf(val: number) {
    this._priceFull = val;
  }

  constructor(t: string, price: number) {
    this.title = t;
    this._priceFull = price;
  }

  @LogMethod
  getPriceWithTax(@LogParameter tax: number) {
    return this._priceFull * (1 + tax);
  }
}

// --------Method decorator: returns PropertyDescriptor--------
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this); // this is whatever is calling getter
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = "This works!";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}
const p = new Printer();
const button = document.querySelector("button");
button?.addEventListener("click", p.showMessage); // this here refers to the target of the event => workarount p.showMessage.bind(p)

//-------Validation with decorators--------
interface ValidatorConfig {
  [property: string]: {
    [validatableProperty: string]: string[]; //
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propertyName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propertyName]: [
      ...(registeredValidators[target.constructor.name]?.[propertyName] ?? []),
      "required",
    ],
  };
}

function PositiveNumber(target: any, propertyName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propertyName]: [
      ...(registeredValidators[target.constructor.name]?.[propertyName] ?? []),
      "positive",
    ],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) return true;
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
        case "positive":
          isValid = isValid && obj[prop] > 0;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form");
courseForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;
  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);
  if (!validate(createdCourse)) {
    alert("Invalid input!");
    return;
  }
  console.log(createdCourse);
});
