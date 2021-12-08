const getLines = require('../lib/getLines')
const path = require('path')

//const input = './test01.txt';
// const input = './test02.txt';
const input = './input.txt';
// 1110111 is  0 : 6
// 0010010 is  1 : 2 segs *
// 1011101 is  2 : 5
// 1011011 is  3 : 5
// 0111010 is  4 : 4 seg  *
// 1101011 is  5 : 5
// 1101111 is  6 : 6
// 1010010 is  7 : 3 seg  *
// 1111111 is  8 : 7 seg  *
// 1111011 is  9 : 6

function lineParser() {
    return (line) => {
        console.log(`line : ${JSON.stringify(line)}`)
        parts = line.split('|');
        console.log(` parts : ${JSON.stringify(parts)}`)
        rawSignalPatterns = parts[0].trim();
        // digits and values don't come up in same order
        // need to alphabetise everything for comparison and matching
        rawSignalDigits = rawSignalPatterns.split(' ').map(s => s.split('').sort().join('')); 
        console.log(` rawSignalDigits : ${JSON.stringify(rawSignalDigits)}`)

        knownDigits = ['', '', '', '', '', '', '', '', '']

        console.log(`Find 2,4,7,8...`);
        for (digit of rawSignalDigits) {
            console.log(`${digit}`);
            switch (digit.length) {
                case 2:
                    knownDigits[1] = digit;
                    break;
                case 4:
                    knownDigits[4] = digit;
                    break;
                case 3:
                    knownDigits[7] = digit;
                    break;
                case 7:
                    knownDigits[8] = digit;
                    break;
                default:
                    break;
            }
        }
        console.log(` ${JSON.stringify(knownDigits)}`);

        console.log(`Find 6...`); // find a 6-segment digit that contains 1 segment not found in 1
        knownDigits[6] = rawSignalDigits.filter(digit => digit.length == 6 && differsByXSegments(digit, knownDigits[1], 1)).pop();
        console.log(` ${knownDigits[6]} is 6 ***********`);

        console.log(`Find 9...`); // find a 6-segment digit that shares 4 segments with  4
        knownDigits[9] = rawSignalDigits.filter(digit => !knownDigits.includes(digit) && digit.length == 6 && differsByXSegments(knownDigits[4], digit, 2)).pop();
        console.log(` ${knownDigits[9]} is 9 ***********`)

        console.log(`Find 0...`); // The remaining 6-segment digit is 0
        knownDigits[0] = rawSignalDigits.filter(digit => !knownDigits.includes(digit) && digit.length == 6).pop()
        console.log(` ${knownDigits[0]} is 0 ***********`)

        console.log(`Find 3...`); // Of the 5-segment digits, only 3 shares 2 segments with 1
        knownDigits[3] = rawSignalDigits.filter(digit => !knownDigits.includes(digit) && digit.length == 5 && shareXSegments(knownDigits[1], digit, 2)).pop();
        console.log(` ${knownDigits[3]} is 3 ***********`)

        console.log(`Find 2...`); // Of the 5-segment digits, only 2 shares 2 segments with 4
        knownDigits[2] = rawSignalDigits.filter(digit => !knownDigits.includes(digit) && digit.length == 5 && shareXSegments(knownDigits[4], digit, 2)).pop();
        console.log(` ${knownDigits[2]} is 2 ***********`)

        console.log(`Find 5...`); // The remaining 5-segment digit is 5
        knownDigits[5] = rawSignalDigits.filter(digit => !knownDigits.includes(digit) && digit.length == 5).pop();
        console.log(` ${knownDigits[5]} is 5 ***********`)

        rawOutputValue = parts[1].trim();
        rawOutputDigits = rawOutputValue.split(' ').map(s => s.split('').sort().join(''));
        console.log(` rawOutputDigits : ${JSON.stringify(rawOutputDigits)}`)

        output = rawOutputDigits.map(d => knownDigits.indexOf(d)).join('')

        return {
            line: line,
            knownDigits: knownDigits,
            output: parseInt(output)
        }
    };
};

function differsByXSegments(digit, knownDigit, x) {
    const digitSegmentsNotInKnownDigit = knownDigit.split('').filter(s => !digit.includes(s));
    const result = (x == digitSegmentsNotInKnownDigit.length);
    console.log(`differsByXSegments('${digit}', '${knownDigit}') : '${digitSegmentsNotInKnownDigit.join('')}'.length is ${digitSegmentsNotInKnownDigit.length} == ${x} ? ${result}`);
    return result;
}

function shareXSegments(digit, knownDigit, x) {
    const digitSegmentsInKnownDigit = knownDigit.split('').filter(s => digit.includes(s));
    const result = (x == digitSegmentsInKnownDigit.length);
    console.log(`shareXSegments('${digit}', '${knownDigit}') : '${digitSegmentsInKnownDigit.join('')}'.length is ${digitSegmentsInKnownDigit.length} == ${x} ? ${result}`);
    return result;
}


async function main() {
    try {
        const entries = await getLines.processLines(path.resolve(__dirname, input), lineParser());
        console.log(`entries : ${JSON.stringify(entries, null, 2)}`);
        const totalEntriesValues = entries.reduce((total, entry) => {
            return total + entry.output;
        }, 0);
        console.log(`Solution: ${totalEntriesValues} : still 1055164?`);
    }
    catch (e) {
        console.error(e);
    }
}

main();