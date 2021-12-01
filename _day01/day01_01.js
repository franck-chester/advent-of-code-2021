const getLines = require('../lib/getLines')
const path = require('path')

//const input = './test.txt';
const input = './input.txt';

let entries = getLines.getIntegerLines(path.resolve(__dirname, input)); 
console.log(`Entries : ${entries.length}`);
//let entries = getLines.getTextLines(path.resolve(__dirname, input)); 

let solution = 0;
for(i=1; i<entries.length; i++){
    solution += entries[i] > entries[i-1]? 1 : 0;
}

console.log(`Solution : ${solution}`);