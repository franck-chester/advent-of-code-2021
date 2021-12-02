const getLines = require('../lib/getLines')
const path = require('path')

/**
 * Day 02 with array reduce();
 * I am really not convinced this is a nicer way to code :-)
 * 
 */
const input = './test.txt';
//const input = './input.txt';

function lineParser() {
    return (line) => {
        instructions = line.split(' ');
        return {
            direction: instructions[0],
            count: parseInt(instructions[1])
        };
    };
};

function instructionsProcessor(state, instructions){
    const newState = {
        x: state.x + (instructions.direction === 'forward' ? instructions.count : 0),
        z: state.z + (instructions.direction === 'forward' ? (instructions.count * state.a) : 0),
        a: state.a + (instructions.direction === 'down' ? instructions.count : (instructions.direction === 'up' ? -instructions.count : 0))
    }
    console.log(`reduce ${JSON.stringify(instructions)} gives ${JSON.stringify(newState)}...`);
    return newState;
};

const initialState = { x: 0, z: 0, a: 0 };

async function main() {
    try {
        await getLines.processLines(path.resolve(__dirname, input), lineParser()).reduce(instructionsProcessor, initialState);
        console.log(`Solution : ${finalState.x * finalState.z}`);
    }
    catch (e) {
        console.error(e);
    }
}

main();

