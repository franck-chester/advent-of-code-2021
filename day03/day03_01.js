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

function msb(accumulator, state) {
    return accumulator + (state.zero > state.one ? '0' : '1');
}

function lsb(accumulator, state) {
    return accumulator + (state.zero < state.one ? '0' : '1');
}


async function main() {
    try {
        const processedLines = await getLines.processLines(path.resolve(__dirname, input), lineParser());
        const initialState = Array(processedLines.length).fill({
            'zero': 0,
            'one': 0
        });
        
        const finalState = processedLines.reduce(bitsProcessor, initialState);
        const gamma = parseInt(finalState.reduce(msb, ''),2);
        const epsilon = parseInt(finalState.reduce(lsb, ''),2);
        console.log(`Gamma : ${gamma}, Epsilon : ${epsilon}`);
        console.log(`Solution : ${gamma*epsilon}`);
    }
    catch (e) {
        console.error(e);
    }
}

main();

