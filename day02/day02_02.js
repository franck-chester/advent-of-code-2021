const getLines = require('../lib/getLines')
const path = require('path')

//const input = './test.txt';
const input = './input.txt';

let entries = getLines.getTextLines(path.resolve(__dirname, input));

let solution = 0;
let x = 0;
let z = 0;
let a = 0;
for (i = 0; i < entries.length; i++) {
    console.log(entries[i])
    instructions = entries[i].split(' ');
    count = parseInt(instructions[1]);
    switch (instructions[0]) {
       
        case 'down': a += count;
            break;
        case 'up': a -= count;
            break;
        case 'forward': x += count;
        z+= count * a
            break;
        default:
            console.error(`Unknown instruction '${entries[i]}'`);
    }
}

console.log(`Solution : ${x * z}`);