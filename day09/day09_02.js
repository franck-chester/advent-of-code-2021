const getLines = require('../lib/getLines')
const path = require('path')

const input = './test.txt';
//const input = './test2.txt';
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

function setBasin(entries, r, c, r0, c0, rmax, cmax, b, padding) {
    if (entries[r][c] == 9) {
        console.log(`${padding}cell [${r}][${c}] is a peak`)
        return;
    }
    if (basinsLookup.has(cellId(r, c))) {
        // as we got from top to bottom, this should not happen
        console.log(`${padding}[${r}][${c}] is already part of a basin !!!`)
        return;
    }
    // add this cell
    basinsLookup.set(cellId(r, r), b);
    if (r > 0 && r-1 != r0) {
        console.log(`${padding}spread up from [${r}][${c}]`);
        setBasin(entries, r - 1, c, r, c, rmax, cmax, b, `${padding}-`)
    }

    if (c > 0 && c-1 != c0) {
        console.log(`${padding}spread left from [${r}][${c}]`);
        setBasin(entries, r, c-1, r, c, rmax, cmax, b, `${padding}-`)
    }

    if (c < cmax && c+1 != c0) {
        console.log(`${padding}spread right from [${r}][${c}]`);
        setBasin(entries, r, c + 1, r, c, rmax, cmax, b, `${padding}-`)
    }

    if (c < rmax && r+1 != r0) {
        console.log(`${padding}spread down from [${r}][${c}]`);
        setBasin(entries, r + 1, c, r, c, rmax, cmax, b, `${padding}-`)
    }
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
                setBasin(entries, r, c, r, c, rmax, cmax, basin, '-')
            }
            console.log('************')
        }

        console.log(`basin sizes up to row [${r}] are ${basins}`)
        //console.log(`Map :  ${JSON.stringify(Object.fromEntries(basinsLookup))}`)
        console.log('------')


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

