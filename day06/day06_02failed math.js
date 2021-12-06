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


function directKids(fromSpawnDate, maxDays, prefix) {
    console.log(`${prefix} directKids(${fromSpawnDate}, ${maxDays})...`)
    // one kid after 8 days
    let kids = 0;
    for (let spawnDate = (fromSpawnDate + 9); spawnDate <= (maxDays - 7); spawnDate += 7) {

        let k = 1;
        //console.log(`${prefix} (maxDays > spawnDate) =  (${maxDays} > ${spawnDate}) =  ${maxDays > spawnDate} `)
        if (maxDays >= spawnDate) {
            k = 1+ Math.floor((maxDays - spawnDate) / 7) + directKids(spawnDate, maxDays, prefix + '-');  // an extra kid every 7 days
            console.log(`${prefix} day ${fromSpawnDate} : ${spawnDate}... (maxDays - spawnDate)/7 = ${(maxDays - spawnDate)}/7 = (${maxDays} - ${spawnDate})}/7= ${Math.floor((maxDays - spawnDate) / 7)} adds ${k}`)
        }
        else {
            console.log(`${prefix} day ${fromSpawnDate} : ${spawnDate}...  maxDays < spawnDate : ${maxDays} < ${spawnDate} adds 1`)
            k = 1;
        }

        kids += k
    }
    console.log(`${prefix} day ${fromSpawnDate} adds ${kids} kids`)

    return kids;
}

function solution(entries, maxDays) {
    offsprings = 0;
    fish = entries.map(e => e - 8); // take a step back in time to imagin they we spawned the previous cycle

    for (initialState of fish) {
        console.log(`---- starting ${maxDays} days from ${initialState} (${initialState + 8}-8) ----------- `);

        // first start a spawning cycle, 1 extra fish after 8 days
        offsprings += (directKids(initialState, maxDays, ''));

    }
    console.log(`after ${maxDays} days: ${offsprings} fish were born, solution = ${offsprings + fish.length}, expecting ${maxDays == 18 ? 26 : (maxDays = 80 ? 5934 : '???')}`);
}

async function main() {
    try {
        const fish = (await getLines.processLines(path.resolve(__dirname, input), lineParser()))[0];
        console.log(`initial state: ${JSON.stringify(fish)}`);
        solution(fish, 18);
        //solution(fish, 80);


    }
    catch (e) {
        console.error(e);
    }
}

main();


