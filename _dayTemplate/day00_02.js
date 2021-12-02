const getLines = require('../lib/getLines')
const path = require('path')

const input = './test.txt';
const input = './input.txt';

let entries = getLines.getIntegerLines(path.resolve(__dirname, input)); 
let entries = getLines.getTextLines(path.resolve(__dirname, input)); 