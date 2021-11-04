
let fs = require('fs');
let readline = require('readline');


const getTextLines = (inputFile) => {
    return getLines(inputFile, function (line) {
        return line;
    })
}

const getIntegerLines = (inputFile) => {
    return getLines(inputFile, function (line) {
        return parseInt(line);
    });
}

function getLines(inputFile, readLine) {
    var lines = [];
    readline.createInterface({
        input: fs.createReadStream(inputFile),
        terminal: false
    }).on('line', function (line) {
        lines.push(readLine(line));
    }).on('close', () => {
        console.log(`read ${lines.length} lines from ${inputFile}`);
    });
}

exports.getIntegerLines = getIntegerLines
exports.getTextLines = getTextLines
