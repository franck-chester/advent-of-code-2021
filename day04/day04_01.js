const getLines = require('../lib/getLines')
const path = require('path')

const input = './test.txt';
//const input = './input.txt';


function lineParser() {
    return (line) => {
        return line; // TODO implement parser
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
        const initialState = {}  
        const finalState = entries.reduce(entryProcessor, initialState);
        console.log(`main(): ${JSON.stringify(finalState)}`);
    }
    catch (e) {
        console.error(e);
    }
}

main();