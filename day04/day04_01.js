const path = require('path')
let fs = require('fs');

const input = './test.txt';
//const input = './input.txt';


function getLines(inputFile) {
    const data = fs.readFileSync(inputFile, 'utf8');
    return data.split(/\r?\n/);
}


async function main() {
    try {
        const puzzleInput = getLines(path.resolve(__dirname, input));   
        const bingoCall = puzzleInput[0].split(',');
        console.log(`Bingo call : ${JSON.stringify(bingoCall)}`);
        
        const boards = [];
        let board = [];
        let row=0;
        for(line = 2; line<puzzleInput.length; line++){
            board.push(puzzleInput[line].match(/\d+/g));
            row++;
            if(row==5){
                boards.push(board);
                board = [];
                line++; // jump empty line
                row = 0;
            }
        }
        console.log(`main(): ${JSON.stringify(boards, null, 2)}`);
    }
    catch (e) {
        console.error(e);
    }
}

main();