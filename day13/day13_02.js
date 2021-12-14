const getLines = require('../lib/getLines')
const path = require('path')

// const input = './test.txt';
// // found these manually , lazy
// const maxx = 20;
// const maxy = 20;

const input = './input.txt';
//found these manually , lazy
const maxy = 1310;
const maxx = 886;


function lineParser() {
    return (line) => {
        return line; // TODO implement parser
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
        const entries = await getLines.processLines(path.resolve(__dirname, input), lineParser());

        let grid = Array.from({ length: maxy }, () =>
            Array.from({ length: maxx }, () => false)
        );
        let instructionBlock = false;
        let foldCount = 0;
        for (entry of entries) {
            if (entry == '') {
              
                instructionBlock = true;

                continue
            }
            if (!instructionBlock) {
                coordinates = entry.split(',').map(s => parseInt(s))
                console.log(`grid[${coordinates[1]}][${coordinates[0]}] = #`)
                grid[coordinates[1]][coordinates[0]] = true;
            }
            if (instructionBlock) {
                instructions = entry.split('=')
                isX = ('x' == instructions[0].slice(-1));
                isY = !isX;
                foldLine = parseInt(instructions[1]);
                console.log(`fold ${foldCount} : along ${isX ? 'x' : 'y'} = ${foldLine}`)
                for (y = 0; y < grid.length; y++) {
                    // first iteration we sized a bit big, so test we don't overshoot
                    if (isY && y > (2 * foldLine)) continue;
                    for (x = 0; x < grid[y].length; x++) {
                        // first iteration we sized a bit big, so test we don't overshoot
                        if (isX && x > (2 * foldLine)) continue;
                        if (isX && x > foldLine) {
                            X = ((2 * foldLine) - x)
                            //console.log(`  grid[${y}][${X}] |= grid[${y}][${x}] -> ${grid[y][X]} || ${grid[y][x]} -> ${grid[y][X] || grid[y][x]}`)
                            grid[y][X] |= grid[y][x]
                        }
                        else if (isY && y > foldLine) {
                            Y = (2 * foldLine) - y
                            //console.log(`  grid[${Y}][${x}] |= grid[${y}][${x}] -> ${grid[Y][x]} || ${grid[y][x]} -> ${grid[Y][x] || grid[y][x]}`)
                            grid[Y][x] |= grid[y][x]
                        }
                    }
                    if (isX) {
                        grid[y] = grid[y].slice(0, foldLine)
                    }
                }
                if (isY) {
                    grid = grid.slice(0, foldLine)
                }

                
                foldCount++;


            }
        }
        // print and count final state
        let finalCount = 0;
        let row = ''
        for (y = 0; y < grid.length; y++) {
            row = ''
            for (x = 0; x < grid[y].length; x++) {
                row += grid[y][x] ? '#' : ' '
                finalCount += grid[y][x] ? 1 : 0
            }
            console.log(row)
        }
        console.log(`-- DONE ----------------------`)
        console.log(`Solution : ${finalCount}`)

    }
    catch (e) {
        console.error(e);
    }
}

main();