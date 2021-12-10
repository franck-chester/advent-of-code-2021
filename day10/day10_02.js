const getLines = require('../lib/getLines')
const path = require('path')

//const input = './test.txt';
const input = './input.txt';


function lineParser() {
    return (line) => {
        return line.split('');
    };
};

function isCorrupt(entry) {
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
                console.log(`${entry.join('')} : expected ${matchingOpening}, found ${bracket} at index ${index} - discarding`);
                return true;
            }
        }
        index++;
    }

    return false
}

function calculateScore(entry) {
    const open = [];
    matchingPairs = new Map([['(', ')'], ['[', ']'], ['{', '}'], ['<', '>']])

    for (bracket of entry) {
        if (matchingPairs.has(bracket)) {
            open.push(bracket);
        }
        else {
            open.pop();
        }
    }

    // now start completing
    let score = 0
    console.log(`${entry.join('')} : opened brackets are : ${open.join('')}`);
    while (openingBracket = open.pop()) {
        
        score *= 5;
        switch (openingBracket) {
            case '(':
                score += 1;
                break;
            case '[':
                score += 2;
                break;
            case '{':
                score += 3;
                break;
            case '<':
                score += 4;
                break;
        }
        console.log(`--> ${open.join('')} popped ${openingBracket} - score = ${score}`);
    }
    console.log(`--> ${entry.join('')} : score = ${score}`);

    return score;
};


async function main() {
    try {
        const rawEntries = await getLines.processLines(path.resolve(__dirname, input), lineParser());
        const entries = rawEntries.filter(line => !isCorrupt(line));
        console.log('-----------------------------------------------------------------');
        console.log(`${entries.length} remaining after discarding corrupt ones`);
        const completionScores = entries.map(calculateScore, 0);
        completionScores.sort((a,b)=>a-b);
        console.log(`Completion scores: ${completionScores}`);
        const middleScore = completionScores[(completionScores.length-1)/2];
        console.log(`Middle completeion score: ${middleScore}`);
    }
    catch (e) {
        console.error(e);
    }
}

main();