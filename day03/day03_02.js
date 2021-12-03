const getLines = require('../lib/getLines')
const path = require('path')

//const input = './test.txt';
const input = './input.txt';

function lineParser() {
    return (line) => {
        return line.split('').map(c => c === '1');
    };
};

function bitsProcessor(s, bits) {
    console.log(`bitsProcessor(${JSON.stringify(s)}, ${JSON.stringify(bits)})...`);
    const process = (f, i) => {
        return {
            'zero': s[i].zero + (f ? 0 : 1),
            'one': s[i].one + (f ? 1 : 0)
        }
    }

    const newState = bits.map(process);

    console.log(`bitsProcessor(${JSON.stringify(s)}, ${JSON.stringify(bits)}) gives\n${JSON.stringify(newState)}`);
    return newState;
};

function msb(accumulator, state) {
    accumulator.push(state.zero > state.one ? '0' : '1');
    return accumulator;
}

function lsb(accumulator, state) {
    accumulator.push(state.zero < state.one ? '0' : '1');
    return accumulator;
}


async function main() {
    try {
        const processedLines = await getLines.processLines(path.resolve(__dirname, input), lineParser());
        const initialState = Array(processedLines.length).fill({
            'zero': 0,
            'one': 0
        });
        
        let oxygenRatingCandidates = processedLines;
        let bit = 0;
        while(oxygenRatingCandidates.length > 1 && bit < processedLines[0].length){
            console.log(`-----------------------------------------------------`);
            const finalState = oxygenRatingCandidates.reduce(bitsProcessor, initialState);
            const gammaBit = finalState[bit].one >=  finalState[bit].zero;
            console.log(`finalState = ${JSON.stringify(finalState )}, finalState[${bit}] = ${finalState[bit]} : gammaBit = ${gammaBit}`);
            oxygenRatingCandidates = oxygenRatingCandidates.filter((line, row, lines) => {
                console.log(`oxygenRatingCandidates filter line ${JSON.stringify(line)} bit ${bit}: ${line[bit]} == ${gammaBit } ?`)
                return line[bit] == gammaBit ;
            });
            console.log(`-- ${oxygenRatingCandidates.length} oxygenRatingCandidates matching bit  ${bit} == ${gammaBit } `);
            bit++;
        }
        console.log(`oxygenRating = ${oxygenRatingCandidates[0].map(b => b?1:0)}  `);
        const oxygenRating= parseInt(oxygenRatingCandidates[0].map(b => b?1:0).join(''),2);
        console.log(`oxygenRating = ${oxygenRating}  `);


        let co2RatingCandidates = processedLines;
        bit = 0;
        while(co2RatingCandidates.length > 1 && bit < processedLines[0].length){
            console.log(`+++++++++++++++++++++++++++++++++++++++++++++++++`);
            const finalState = co2RatingCandidates.reduce(bitsProcessor, initialState);
            const epsilonBit = finalState[bit].zero > finalState[bit].one;
            console.log(`finalState = ${JSON.stringify(finalState )}, finalState[${bit}] = ${JSON.stringify(finalState[bit])} : epsilonBit = ${epsilonBit}`);
            co2RatingCandidates = co2RatingCandidates.filter((line, row, lines) => {
                console.log(`co2RatingCandidates filter line ${JSON.stringify(line)} bit ${bit}: ${line[bit]} == ${epsilonBit } ?`)
                return line[bit] == epsilonBit ;
            });
            console.log(`++ ${co2RatingCandidates.length} co2RatingCandidates matching bit  ${bit} == ${epsilonBit } `);
            bit++;
        }
        console.log(`co2Rating = ${co2RatingCandidates[0].map(b => b?1:0)}  `);
        const co2Rating= parseInt(co2RatingCandidates[0].map(b => b?1:0).join(''),2);
        console.log(`co2Rating = ${co2Rating}  `);

        console.log(`Solution  = ${ oxygenRating * co2Rating}  `);
    }
    catch (e) {
        console.error(e);
    }
}

main();

