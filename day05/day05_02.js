const getLines = require('../lib/getLines')
const path = require('path')

//const input = './test.txt';
const input = './input.txt';


function lineParser() {
    return (line) => {
        elt = line.match(/(\d+),(\d+) -> (\d+),(\d+)/).map(s => parseInt(s));
        horizontal = elt[1] == elt[3];
        vertical = elt[2] == elt[4];
        fortyFiveDegree = Math.abs(elt[1] - elt[3]) == Math.abs(elt[2] - elt[4])
        return {
            start: {
                x: elt[1],
                y: elt[2]
            },
            end: {
                x: elt[3],
                y: elt[4]
            },
            horizontal: horizontal,
            vertical: vertical,
            wonky: !horizontal && !vertical && !fortyFiveDegree,
            fortyFiveDegree: fortyFiveDegree
        }; // TODO implement parser
    };
};

async function main() {
    try {
        const rows = 1000
        const cols = 1000
        // https://stackoverflow.com/questions/50002593/initialize-a-two-dimensional-array-in-javascript
        const grid = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => 0)
        );
        const entries = await getLines.processLines(path.resolve(__dirname, input), lineParser());
        const lines = entries.filter(e => !e.wonky);
        for (line of lines) {
            console.log(JSON.stringify(line))

            let xInc = (line.start.x == line.end.x) ? 0 : (line.start.x < line.end.x ? 1 : -1);
            let yInc = (line.start.y == line.end.y) ? 0 : (line.start.y < line.end.y ? 1 : -1);
            // increment each grid cell
            let y = line.start.y;
            let x = line.start.x;
            console.log(`incrementing from x = ${line.start.x} to x = ${line.end.x} by increments of ${xInc} `)
            console.log(`incrementing from y = ${line.start.y} to y = ${line.end.y} by increments of ${yInc} `)
            do{
                //console.log(`grid[${y}][${x}]++`);
                grid[y][x]++;

                if(yInc != 0 && y == line.end.y){
                    break
                }
                if(xInc != 0 && x == line.end.x){
                    break
                }
                y+= yInc;
                x+= xInc;
                
            }while(true)

            // for (y = 0; y < cols; y++) {
            //     console.log(grid[y].join(''))
            // }
        }


        let total = 0;
        // determine the number of points where at least two lines overlap (c > 1)
        for (y = 0; y < rows; y++) {
            for (x = 0; x < cols; x++) {
                total += grid[y][x] > 1 ? 1 : 0;
            }
        }
        console.log(`Solution : ${total}`);
    }
    catch (e) {
        console.error(e);
    }
}

main();