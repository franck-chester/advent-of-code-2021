const getLines = require('../lib/getLines')
const path = require('path')

//const input = './test.txt';
const input = './input.txt';


function lineParser() {
    return (line) => {
        elt = line.match(/(\d+),(\d+) -> (\d+),(\d+)/);
        horizontal = elt[1] == elt[3];
        vertical = elt[2] == elt[4];
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
            diagonal: !horizontal && !vertical
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
        const lines = entries.filter(e => !e.diagonal);
        for (line of lines) {
            console.log(JSON.stringify(line))
            xmin = Math.min(line.start.x, line.end.x);
            ymin = Math.min(line.start.y, line.end.y);
            xmax = Math.max(line.start.x, line.end.x);
            ymax = Math.max(line.start.y, line.end.y);
            // increment each grid cell
            for (y = ymin; y <= ymax; y++) {
                for (x = xmin; x <=xmax; x++) {
                    //console.log(`grid[${y}][${x}]++`)
                    grid[y][x]++;
                }
            }

            // for (y = 0; y< cols; y++) {
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