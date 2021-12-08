const getLines = require('../lib/getLines')
const path = require('path')

//const input = './test02.txt';
const input = './input.txt';


function lineParser() {
    return (line) => {
        console.log(`line : ${JSON.stringify(line)}`)
        parts = line.split('|');
        console.log(` parts : ${JSON.stringify(parts)}`)
        rawSignalPatterns = parts[0].trim();
        rawOutputValue = parts[1].trim();
        rawOutputDigits = rawOutputValue.split(' ');
        console.log(` rawOutputDigits : ${JSON.stringify(rawOutputDigits)}`)
        digits = []
        uniqueNumberCount = 0;
        uniqueNumbers = [];
        for (digit of rawOutputDigits) {
            console.log(`  digits : ${digit}`)
            bin = [0, 0, 0, 0, 0, 0, 0]
            segments = digit.split('');
            console.log(`  segments : ${JSON.stringify(segments)}`);
            isUnique = !(segments.length == 6 || segments.length == 5);
            uniqueNumberCount += isUnique?1:0;
            if(isUnique){
                uniqueNumbers.push(segments.join(''))
            }
            console.log(`  isUnique? : ${isUnique}, uniqueNumbers: ${uniqueNumbers}`)
        }
        return {
            line: line,
            uniqueNumbers: uniqueNumbers,
            uniqueNumberCount : uniqueNumberCount
        }
    };
};

async function main() {
    try {
        const entries = await getLines.processLines(path.resolve(__dirname, input), lineParser());
        console.log(`entries : ${JSON.stringify(entries, null,  2)}`);
        const totalUniqueEntries = entries.reduce((total,entry) => {
            return total+entry.uniqueNumberCount;
        },0);
        console.log(`Solution: ${totalUniqueEntries}`);
    }
    catch (e) {
        console.error(e);
    }
}

main();