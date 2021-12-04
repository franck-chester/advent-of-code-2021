const path = require('path')
let fs = require('fs');

//const input = './test.txt';
const input = './input.txt';


function getLines(inputFile) {
    const data = fs.readFileSync(inputFile, 'utf8');
    return data.split(/\r?\n/);
}


async function main() {
    try {
        const puzzleInput = getLines(path.resolve(__dirname, input));
        const bingoCall = puzzleInput[0].split(',');
        const numbersToBoard = new Map();
        console.log(`Bingo call : ${JSON.stringify(bingoCall)}`);

        const boards = [];
        let rows = [];
        let cols = [[], [], [], [], []];
        let row = 0;
        let boardIndex = 0;
        let sum = 0;
        for (line = 2; line < puzzleInput.length; line++) {

            numbersInRow = puzzleInput[line].match(/\d+/g);
            rows.push(numbersInRow);
            col = 0;
            for (n of numbersInRow) {
                //console.log(`add ${n} to ${sum}`)
                sum += parseInt(n);
                cols[col].push(n);
                if (!numbersToBoard.has(n)) {
                    numbersToBoard.set(n, new Set());
                }
                let matchingBoards = numbersToBoard.get(n);
                matchingBoards.add(boardIndex);
                numbersToBoard.set(n, matchingBoards);
                col++;
            }
            row++;
            if (row == 5) {
                boards.push({
                    rows: rows,
                    cols: cols,
                    rowsCount: [0, 0, 0, 0, 0],
                    colsCount: [0, 0, 0, 0, 0],
                    sum: sum,
                    originalSum: sum,
                    matched: []
                });
                rows = [];
                cols = [[], [], [], [], []];
                line++; // jump empty line
                row = 0;
                sum = 0;
                boardIndex++;
            }
        }
        console.log(`Loaded ${boardIndex} boards:\n${JSON.stringify(boards, null, 2)}`);
        //console.log(`numbersToBoard: ${JSON.stringify([...numbersToBoard], null, 2)}`);

        for (call of bingoCall) {
            console.log(`Calling... ${call}...!!`);
            if (!numbersToBoard.has(call)) {
                console.log(`No board has ${call}`);
                continue;
            }
            let matchingBoards = Array.from(numbersToBoard.get(call));

            console.log(`** Found ${matchingBoards.length} matchingBoards for ${call}: ${JSON.stringify(matchingBoards)}`);
            let bingo = false;

            for (boardId of matchingBoards) {
                let foundOnce = false;
                bingo = false;
                let matchingBoard = boards[boardId];
                //console.log(`BEFORE matchingBoard ${boardId} for ${call}:\n${JSON.stringify(matchingBoard)}`);

                for (row of matchingBoard.rows) {
                    matchIndex = row.indexOf(call);
                    if (matchIndex > -1) {
                        matchingBoard.colsCount[matchIndex]++;
                    }
                }//for (row of matchingBoard.rows)
                for (col of matchingBoard.cols) {
                    matchIndex = col.indexOf(call);
                    if (matchIndex > -1) {
                        matchingBoard.rowsCount[matchIndex]++;
                    }
                }

                matchingBoard.sum = matchingBoard.sum - parseInt(call);

                if (matchingBoard.rowsCount.includes(5) || matchingBoard.colsCount.includes(5)) {
                    console.log(`BINGO!!!!`);
                    bingo = true;
                    break;
                }
                
                console.log(`AFTER matchingBoard ${boardId} for ${call}:\n${JSON.stringify(matchingBoard)}`);

            }//for (boardId of matchingBoards) 
            if (bingo) {
                console.log(`BINGO AFTER matchingBoard ${boardId} for ${call}`);
                let sum = boards[boardId].matched.reduce(function (a, b) {
                    return a + b;
                }, 0);
                console.log(`sum of board = ${boards[boardId].originalSum} - sum of matches = ${sum} = ${boards[boardId].originalSum - sum}`);
                console.log(`Solution = ${call} * ${boards[boardId].sum} = ${call * boards[boardId].sum}`);
                break;
            }
        }//for (call of bingoCall) 
    }
    catch (e) {
        console.error(e);
    }
}

main();