const getLines = require('../lib/getLines')
const path = require('path')

//const input = './test.txt';
const input = './input.txt';


function lineParser() {
    return (line) => {
        return line.split('');
    };
};

function entryProcessor(totalErrorScore, entry) {
    const open = [];
    let corrupt = false;
    let errorScore = 0;
    matchingPairs = new Map([['(', ')'], ['[', ']'], ['{', '}'], ['<', '>']])
    index = 0;
    for (bracket of entry) {
        if (matchingPairs.has(bracket)) {
            open.push(bracket);
        }
        else {
            const matchingOpening = open.pop();
            const expecting = matchingPairs.get(matchingOpening);
            corrupt = (bracket != expecting)

            if (corrupt) {
               
                switch (bracket) {
                    case ')':
                        errorScore += 3;
                        break;
                    case ']':
                        errorScore += 57;
                        break;
                    case '}':
                        errorScore += 1197;
                        break;
                    case '>':
                        errorScore += 25137;
                        break;
                }
                console.log(`${entry.join('')} : expected ${matchingOpening}, found ${bracket} at index ${index} - errorScore = ${errorScore}`);
                break;
            }
        }
        index++;
    }

    return totalErrorScore + errorScore;
};


async function main() {
    try {
        const entries = await getLines.processLines(path.resolve(__dirname, input), lineParser());
        const finalScore = entries.reduce(entryProcessor, 0);
        console.log(`main(): ${JSON.stringify(finalScore)}`);
    }
    catch (e) {
        console.error(e);
    }
}

main();