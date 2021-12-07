const getLines = require('../lib/getLines')
const path = require('path')

//const input = './test.txt';
const input = './input.txt';


function lineParser() {
    return (line) => {
        return line.split(',').map(s=>parseInt(s))
    };
};

function sumNumbersTo(n){
    return n*(n+1)/2
}
async function main() {
    try {
        const crabPositions = (await getLines.processLines(path.resolve(__dirname, input), lineParser()))[0];
        //crabPositions.sort((a,b)=>(a-b));
        const left = Math.min(...crabPositions);
        const right = Math.max(...crabPositions);
        const furthestDistance = right-left;
        console.log(`Crab positions in order: ${JSON.stringify(crabPositions)}`)

        const costs = [];
        for (p = 0; p < furthestDistance ; p++) {
            const possiblePosition = left+p;
            const costsAtThatPosition = crabPositions.map(position => Math.abs(position - possiblePosition) );
            //console.log(`Crab positions in order:       ${JSON.stringify(crabPositions)}`)
            //console.log(`Moving everyone to ${possiblePosition} will cost ${JSON.stringify(costsAtThatPosition)} fuel`)
            const costAtThatPosition = costsAtThatPosition.reduce((totalCost, cost) => totalCost + cost, 0 );
            //console.log(`Moving everyone to ${possiblePosition} will cost ${costAtThatPosition} fuel`)
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
