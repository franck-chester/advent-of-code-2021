const getLines = require('../lib/getLines')
const path = require('path')

//const input = './test.txt';
const input = './input.txt';


const Numbers = [
 // segments  abcdefg displays:
    parseInt('1110111', 2), // 0 : 6 seg
    parseInt('0010010', 2), // 1 : 2 segs *
    parseInt('1011101', 2), // 2 : 5
    parseInt('1011011', 2), // 3 : 5
    parseInt('0111010', 2), // 4 : 4 seg  *
    parseInt('1101011', 2), // 5 : 5
    parseInt('1101111', 2), // 6 : 6
    parseInt('1010010', 2), // 7 : 3 seg  *
    parseInt('1111111', 2), // 8 : 7 seg  *
    parseInt('1111011', 2)  // 9 : 6
]

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
            for (segment of segments) {
                switch (segment) {
                    case 'a':
                        bin[0] = 1;
                        break;
                    case 'b':
                        bin[1] = 1;
                        break;
                    case 'c':
                        bin[2] = 1;
                        break;
                    case 'd':
                        bin[3] = 1;
                        break;
                    case 'e':
                        bin[4] = 1;
                        break;
                    case 'f':
                        bin[5] = 1;
                        break;
                    case 'g':
                        bin[6] = 1;
                        break;
                }
            }
            mask = parseInt(bin.join(''), 2);
            digits.push(mask)
        }
        return {
            line: line,
            uniqueNumbers: uniqueNumbers,
            uniqueNumberCount : uniqueNumberCount,
            digits: digits
        }
    };
};

function entryProcessor(previousState, entry) {
    console.log(`entryProcessor(${JSON.stringify(previousState)}, ${JSON.stringify(entry)})...`);
    const newState = {};

    console.log(`bitsProcessor(${JSON.stringify(previousState)}, ${JSON.stringify(entry)}) gives\n${JSON.stringify(newState)}`);
    return newState;
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