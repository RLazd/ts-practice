// TYPESCRIPT COMPILER
/*
// before  used: tsc app.ts
Compiling  1 project:
    tsc app.ts -w = watchmode on the file -> automatically recompiles

Entire project (all files): 
    tsc --init
        creates tsconfig.json
        =>now you can run just
    tsc -w
        will run all tsc files in watchmode

In tsconfig.json       
    "include": [""]
        Includes files, everything not included will be excluded!
    "files": [""]
        Includes
    "exclude":["filename.ts"]
        Excludes files, node_modules are excluded by default
    
    Compilation target:
    "compilerOptions":
        "target": "es5"
            choose js version  
        "lib":[]
            default (commented) - depends on js target es6 (eg has Map()) + assumes that all DOM APIs are available
        "lib": ["dom", "es6", "dom.iterable",  "scripthost"]
            -if uncommented -> should include everything yourself!:
        "allowJs": true
        "checkJs": true

        "sourceMap":
            generates map files emitted JS files (connects js files to input files); good for debugging (you can debug in ts files in browser)
        
        "outDir": "./dist"
            dist output (js files)

        "rootDir": "./src"
            src dir (ts files)
        
        "noEmitOnError" - dont make js if ts does not compile

        "strict":true 
            all options true - default
            strictNullCheks-
            strictFunctionTypes-
            strictBindCallApply-
            
*/
function sendRequest(data: string, cb: (response: any) => void) {
  // ... sending a request with "data"
  return cb({ data: "Hi there!" });
}

sendRequest("Send this!", (response) => {
  console.log(response);
  return true;
});
