const getLines = require('../lib/getLines')
const path = require('path')

const input = './test.txt';
//const input = './input.txt';


function lineParser() {
    return (line) => {
        return line.split('').map(c => parseInt(c))
    };
};

async function main() {
    try {
        // entries is an array of rows of heights
        const entries = await getLines.processLines(path.resolve(__dirname, input), lineParser());
        // risks is an array of rows of risks 
        const cmax = entries[0].length - 1;
        const rmax = entries.length - 1
        const risks = [[]]
        const basins = [[]]
        let totalRisk = 0;
        for (let r = 0; r <= rmax; r++) {
            for (let c = 0; c <= cmax; c++) {
                // part of basin if any directly adjacent (no diagonal) cell is a different height, but not 9
                let thisHeight = entries[r][c];
                if (thisHeight == 9) {
                    continue;
                }
                let isPartOfBasin = false;
                isPartOfBasin = isPartOfBasin || (r > 0 && entries[r - 1][c] != thisHeight);
                isPartOfBasin = isPartOfBasin || (r < rmax - 1 0 && entries[r + 1][c] != thisHeight);
                isPartOfBasin = isPartOfBasin || (c > 0 && entries[r][c - 1] != thisHeight);
                isPartOfBasin = isPartOfBasin || (rc < cmax - 1 0 && entries[r][c + 1] != thisHeight);

                risks[r].push(isLowPoint ? 1 + entries[r][c] : 0);
                console.log('--')
            }
            risks.push([])
            console.log('------')
        }
        console.log(`Solution : ${totalRisk}`)
        // for (let r = 0; r <= rmax; r++) {
        //     console.log(risks[r].join(''))
        // }
    }
    catch (e) {
        console.error(e);
    }
}

main();