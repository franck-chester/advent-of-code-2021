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


function solution(entries, maxDays) {
    // rather than an array of fish, have an array for each day of the cycle 9 elt from 0 to 8
    let populationAtDayInCycle = [0, 0, 0, 0, 0, 0, 0, 0, 0];     

    // the value of each entry is the day that 1 fish is at on
    entries.forEach(tick => populationAtDayInCycle[tick]++); 

    for (let day = 0; day < maxDays; day++) {
        // Fish at day 0 and or 7 of the cycle will go to 6, so group them 
        populationAtDayInCycle[7] += populationAtDayInCycle[0];  
        // shift left so that fish at day 0 are removed (they are now counted as day 7), 
        // then 1 becomes 0, 2->1, ... 7->6, 8->7 (for newly spawned)
        newGenerationCount = populationAtDayInCycle.shift();
        // then number of fish that were at day 0 spawns a new generation, which starts at day 8 (end of the array)        
        populationAtDayInCycle.push(newGenerationCount); 
    }

    // Add it all up
    const population = populationAtDayInCycle.reduce((total, populationAtDay) => total + populationAtDay); 
    console.log(`after ${maxDays} days: solution = ${population}, if test expecting ${maxDays == 18 ? 26 : (maxDays = 80 ? 5934 : '???')}`);
}

async function main() {
    try {
        const fish = (await getLines.processLines(path.resolve(__dirname, input), lineParser()))[0];
        console.log(`initial state: ${JSON.stringify(fish)}`);
        solution(fish, 18);
        solution(fish, 80);
        solution(fish, 256);
        
    }
    catch (e) {
        console.error(e);
    }
}

main();


