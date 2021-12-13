const getLines = require('../lib/getLines')
const path = require('path')

//const input = './test.txt';
const input = './test2.txt';
//const input = './input.txt';


function lineParser() {
    return (line) => {
        return line.split('').map(c => parseInt(c))
    };
};

// map cell (r|c) to basin (a number from  0 to basin.length-1)
const basinsLookup = new Map()

function cellId(r, c) {
    return `${r}|${c}`;
}

function lookupBasin(r, c) {
    if (basinsLookup.has(cellId(r, c))) {
        return basinsLookup.get(cellId(r, c));
    }
    return -1;
}

async function main() {
    try {
        // entries is an array of rows of heights
        const entries = await getLines.processLines(path.resolve(__dirname, input), lineParser());
        const cmax = entries[0].length - 1;
        const rmax = entries.length - 1

        // a list of basin sizes
        const basins = [];
        for (let r = 0; r <= rmax; r++) {
            for (let c = 0; c <= cmax; c++) {
                // not a basin
                if (entries[r][c] == 9) {
                    console.log(` cell [${r}][${c}] is a peak`)
                    continue;
                }
                // already a basin
                if ((basin = lookupBasin(r, c)) != -1) {
                    console.log(` cell [${r}][${c}] is already part of ${basin}`)
                    continue;
                }
                // new basin
                console.log(` cell [${r}][${c}] starts a new basin`)
                basin = basins.push(1) - 1;
                basinsLookup.set(cellId(r, r), basin);

                if (c > 0) {
                    let R = r;
                    let C = c;
                    let stop = false;
                    // and go left and down until we hit 9, or the edge
                    console.log(` go left and down from [${R}][${C}]`)
                    while (R <= rmax) {
                        while (C >= 0) {
                            if (R == r && C == c) {
                                C--;
                                continue
                            }
                            if (entries[R][C] == 9) {
                                C--;
                                break
                            }
                            console.log(`  ... add [${R}][${C}] to basin ${basin} *`)
                            basinsLookup.set(cellId(R, C), basin);
                            basins[basin]++;
                            C--;
                        }

                        C = c;
                        R++;
                    }
                }
                if (c <= cmax) {
                    R = r;
                    C = c;
                    let stop = false;
                    // and go right and down until we hit 9, or the edge
                    console.log(` go right and down from [${R}][${C}] : cmax = ${cmax}, rmax = ${rmax}`)
                    while (R <= rmax) {
                        while (C <= cmax) {
                            if (R == r && C == c) {
                                C++;
                                continue
                            }
                            if (entries[R][C] == 9) {
                                stop = true
                                C++
                                break
                            }
                            console.log(`  ... add [${R}][${C}] to basin ${basin}`)
                            basinsLookup.set(cellId(R, C), basin);
                            basins[basin]++;
                            C++;
                        }
                        
                        C = c;
                        R++;
                    }
                }
                console.log('  ------')
            }

            console.log(`basin sizes up to row [${r}] are ${basins}`)
            //console.log(`Map :  ${JSON.stringify(Object.fromEntries(basinsLookup))}`)
            console.log('------')
        }

        // pretty picture, like reddit, to see what  I have missed
        const codes = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
        for (let r = 0; r <= rmax; r++) {
            let row = `${String(r).padStart(3, 0)} :`;
            for (let c = 0; c <= cmax; c++) {
                basin = lookupBasin(r, c);
                row += basin < 0 ? '_' : codes[basin];
            }
            console.log(row)
        }
        console.log('------')
        // compare with raw data
        for (let r = 0; r <= rmax; r++) {
            let row = `${String(r).padStart(3, 0)} :`;
            for (let c = 0; c <= cmax; c++) {
                entry = entries[r][c]
                row += entry == 9 ? '_' : entry;
            }
            console.log(row)
        }

        // find the 3 largest basins:
        basins.sort((a, b) => b - a);
        console.log(`basin sizes are ${basins}`)
        console.log(`Solution part 2:  ${basins[0] * basins[1] * basins[2]} should be 786780 according to reddit`)
    }
    catch (e) {
        console.error(e);
    }


}

main();

