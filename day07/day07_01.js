const getLines = require('../lib/getLines')
const path = require('path')

//const input = './test.txt';
const input = './input.txt';


function lineParser() {
    return (line) => {
        return line.split(',').map(s=>parseInt(s))
    };
};

function entryProcessor(previousState, entry) {
    console.log(`entryProcessor(${JSON.stringify(previousState)}, ${JSON.stringify(entry)})...`);


    console.log(`bitsProcessor(${JSON.stringify(previousState)}, ${JSON.stringify(entry)}) gives\n${JSON.stringify(newState)}`);
    return newState;
};


async function main() {
    try {
        const crabPositions = (await getLines.processLines(path.resolve(__dirname, input), lineParser()))[0];
        //crabPositions.sort((a,b)=>(a-b));
        console.log(`Crab positions in order: ${JSON.stringify(crabPositions)}`)

        const costs = [];
        for (p = 0; p < crabPositions.length; p++) {
            const possiblePosition = crabPositions[p];
            const costsAtThatPosition = crabPositions.map(position => Math.abs(position - possiblePosition) );
            //console.log(`Crab positions in order:       ${JSON.stringify(crabPositions)}`)
            //console.log(`Moving everyone to ${possiblePosition} will cost ${JSON.stringify(costsAtThatPosition)} fuel`)
            const costAtThatPosition = crabPositions.reduce((totalCost, position) => totalCost + Math.abs(position - possiblePosition), 0 );
            console.log(`Moving everyone to ${possiblePosition} will cost ${costAtThatPosition} fuel`)
            costs.push(costAtThatPosition);
        }
        //console.log(`Costs: ${JSON.stringify(costs)}`)
        const minimumCost = Math.min(...costs);
        console.log(`Minimum cost: ${minimumCost}`)
        const minimumCostPosition = crabPositions[costs.findIndex(c => (c == minimumCost) )];
        console.log(`Moving everyone to ${minimumCostPosition} will cost ${minimumCost} fuel`)
    }
    catch (e) {
        console.error(e);
    }
}

main();