const getLines = require('../lib/getLines')
const path = require('path')

//const input = './test.txt';
const input = './input.txt';

function lineParser() {
    return (line) => {
        return line.split('').map(c => c === '1');
    };
};

function bitsProcessor(s, bits) {
    console.log(`bitsProcessor(${JSON.stringify(s)}, ${JSON.stringify(bits)})...`);
    const process = (f, i) => {
        return {
            'zero': s[i].zero + (f ? 0 : 1),
            'one': s[i].one + (f ? 1 : 0)
        }
    }

    const newState = bits.map(process);
    console.log(`bitsProcessor(${JSON.stringify(s)}, ${JSON.stringify(bits)}) gives\n${JSON.stringify(newState)}`);
    return newState;
};

function calculateRate(processedLines, bitCalculator, description) {
    let candidateEntries = processedLines;
    const initialState = Array(processedLines.length).fill({
        'zero': 0,
        'one': 0
    });

    let bit = 0;

    while (candidateEntries.length > 1 && bit < processedLines[0].length) {

        console.log(`${description} iteration ${bit} -----------------------------------------------------`);
        const finalState = candidateEntries.reduce(bitsProcessor, initialState);
        const comparisonBitValue = bitCalculator(finalState, bit);
        console.log(`finalState = ${JSON.stringify(finalState)}, finalState[${bit}] = ${finalState[bit]} : bit = ${comparisonBitValue}`);
        candidateEntries = candidateEntries.filter(line => {
            console.log(`${description} filter line ${JSON.stringify(line)} bit ${bit}: ${line[bit]} == ${comparisonBitValue} ?`);
            return line[bit] == comparisonBitValue;
        });
        console.log(`-- ${candidateEntries.length} ${description} candidates matching bit  ${bit} == ${comparisonBitValue} `);
        bit++;
    }
    console.log(`${description}  = ${candidateEntries[0].map(b => b ? 1 : 0)}  `);
    const rating = parseInt(candidateEntries[0].map(b => b ? 1 : 0).join(''), 2);
    console.log(`${description}  = ${rating}  `);
    return rating
}

function epsilonBit(finalState, bit) {
    return finalState[bit].zero > finalState[bit].one;
}

function gammaBit(finalState, bit) {
    return finalState[bit].one >= finalState[bit].zero;
}

async function main() {
    try {
        const processedLines = await getLines.processLines(path.resolve(__dirname, input), lineParser());
        const oxygenRating = calculateRate(processedLines, gammaBit, 'oxygenRating');
        const co2Rating = calculateRate(processedLines, epsilonBit, 'co2Rating');

        console.log(`Solution  = ${oxygenRating * co2Rating}  `);
    }
    catch (e) {
        console.error(e);
    }
}

main();



