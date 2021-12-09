const getLines = require('../lib/getLines')
const path = require('path')

//const input = './test.txt';
const input = './input.txt';


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
        let totalRisk = 0;
        for (let r = 0; r <= rmax; r++) {
            for (let c = 0; c <= cmax; c++) {
                let left = (c > 0) ? c - 1 : 0;
                let right = (c < cmax) ? c + 1 : cmax;
                let up = (r > 0) ? r - 1 : 0;
                let down = (r < rmax) ? r + 1 : rmax;
                let isLowPoint = true;

                for (let R = up; R <= down; R++) {
                    for (let C = left; C <= right; C++) {
                        if (R == r && C == c) continue;
                        if (entries[R][C] < entries[r][c]) {
                            isLowPoint = false;
                        }
                        console.log(`[${r}][${c}]: ${entries[r][c]} ->  [${R}][${C}] : ${entries[R][C]} <= ${entries[r][c]} : ${isLowPoint?'IS':'IS NOT'} a lowpoint`)
                        if (!isLowPoint) break;
                    }
                    if (!isLowPoint) break;
                }
                totalRisk += (isLowPoint ? 1 + entries[r][c] : 0);
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