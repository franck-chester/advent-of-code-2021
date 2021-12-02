
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

async function processLines(inputFile, processor) {
    console.log('processLines()...');
    const rl = readline.createInterface({
      input: fs.createReadStream(inputFile),
      crlfDelay: Infinity
    });
  
    const processedLines = [];
    for await (const line of rl) {
        console.log(line);
        processedLines.push(processor(line));
    }
    console.log(`processLines(): ${processedLines.length} LINES PROCESSED`);
    return processedLines;
  }

exports.getIntegerLines = getIntegerLines
exports.getTextLines = getTextLines
exports.processLines = processLines
