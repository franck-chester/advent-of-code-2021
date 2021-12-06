const getLines = require('../lib/getLines')
const path = require('path');
const { unwatchFile } = require('fs');

//const input = './test.txt';
const input = './input.txt';


function lineParser() {
    return (line) => {
        return line.split(',').map(s => parseInt(s));
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
        const fish = (await getLines.processLines(path.resolve(__dirname, input), lineParser()))[0];
        console.log(`initial state: ${JSON.stringify(fish)}`);
        let day = 1;
        do {
            let max = fish.length;
            for (f = 0; f < max; f++) {
                if (fish[f] > 00) {
                    fish[f]--;
                } else {
                    fish[f] = 6;
                    fish.push(8);
                }

            }
            //console.log(`after ${day} days: ${fish.length} fish : ${JSON.stringify(fish)}`);
            console.log(`after ${day} days: ${fish.length} fish`);
            day++;
        } while (day < 81)

    }
    catch (e) {
        console.error(e);
    }
}

main();