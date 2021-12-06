const getLines = require('../lib/getLines')
const path = require('path');
const { unwatchFile } = require('fs');

const input = './test.txt';
//const input = './input.txt';


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
        const entries = (await getLines.processLines(path.resolve(__dirname, input), lineParser()))[0];
        const fish = new Int8Array(Math.pow(2, 32)-1); // max is (2^53 - 1)

        let day = 1;
        let count = entries.length;
        do {
            newCount = count;
            for (f = 0; f < count; f++) {
                if (fish[f] > 00) {
                    fish[f]--;
                } else {
                    fish[f] = 6;
                    fish[f+1] = 8;
                    newCount++;
                }

            }
            count = newCount;
            //console.log(`after ${day} days: ${fish.length} fish : ${JSON.stringify(fish)}`);
            console.log(`after ${day} days: ${count} fish`);
            day++;
        } while (day < 257)

    }
    catch (e) {
        console.error(e);
    }
}

main();