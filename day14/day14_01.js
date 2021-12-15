const getLines = require('../lib/getLines')
const path = require('path')

//const input = './test.txt';
const input = './input.txt';


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
        let template = entries[0];

        console.log(`Template: ${template}`)

        // build a replacement map
        const map = new Map()

        for (i = 2; i < entries.length; i++) {
            elts = entries[i].split(' -> ');
            pair = elts[0].split('')
            map.set(elts[0], elts[1]);
            console.log(`${elts[0]} -> ${map.get(elts[0])}`)

        }

        console.log(`Template: ${template}`)
        for (step = 1; step < 11; step++) {
            newTemplate = ''
            for (i = 0; i < template.length - 1; i++) {
                newTemplate += template.charAt(i)
                pair = template.slice(i, i + 2)
                if (map.has(pair)) {
                    console.log(` Matched ${pair}, inserting ${map.get(pair)}`)
                    newTemplate += map.get(pair)
                }
                else{
                    console.log(` Didn't match ${pair}`)
                }
            }
            template = newTemplate + template.slice(-1);

            if (step < 4) {
                console.log(`After step ${step} : ${template}`)
            }
            else{
                console.log(`After step ${step} : ${template.length} characters long`)
            }
        }

        const charMap = new Map()
        for (i = 0; i < template.length; i++) {
            char = template.charAt(i)
            if(!charMap.has(char)){
                charMap.set(char, 1)
            }
            else{
                charMap.set(char, charMap.get(char)+1)
            }
        }

        const charMapSorted = new Map([...charMap.entries()].sort((a, b) => b[1] - a[1]));
        console.log(charMapSorted)

        const charactersInAppearanceOrder  = [...charMapSorted.keys()]
        const mostFrequent = charactersInAppearanceOrder[0]
        const leastFrequent = charactersInAppearanceOrder[charactersInAppearanceOrder.length-1]
        console.log(`Solution is ${charMapSorted.get(mostFrequent)} - ${charMapSorted.get(leastFrequent)} = ${charMapSorted.get(mostFrequent) - charMapSorted.get(leastFrequent)}`)

    }
    catch (e) {
        console.error(e);
    }
}

main();