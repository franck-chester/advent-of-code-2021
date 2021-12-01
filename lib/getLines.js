
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
    const data = fs.readFileSync(inputFile, 'utf8');
    const rawLines = data.split(/\r?\n/);
    return  rawLines.map(readLine);

}

exports.getIntegerLines = getIntegerLines
exports.getTextLines = getTextLines
