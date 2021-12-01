const getLines = require('../lib/getLines')
const path = require('path')

//const input = './test.txt';
const input = './input.txt';

let entries = getLines.getIntegerLines(path.resolve(__dirname, input)); 
console.log(`Entries : ${entries.length}`);
//let entries = getLines.getTextLines(path.resolve(__dirname, input)); 

let solution = 0;
let previousWindow = 0;
for(i=2; i<entries.length; i++){
    window = entries[i-2]+entries[i-1]+entries[i];
    solution += window > previousWindow? 1 : 0;
    previousWindow = window;
}

console.log(`Solution : ${solution}`);