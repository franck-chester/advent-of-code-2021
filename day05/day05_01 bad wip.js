const getLines = require('../lib/getLines')
const path = require('path')

const input = './test.txt';
//const input = './input.txt';


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

// Given three collinear points p, q, r, the function checks if
// point q lies on line segment 'pr'
function onSegment(p, q, r) {
    if (q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) &&
        q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y))
        return true;

    return false;
}

// To find orientation of ordered triplet (p, q, r).
// The function returns following values
// 0 --> p, q and r are collinear
// 1 --> Clockwise
// 2 --> Counterclockwise
function orientation(p, q, r) {

    // See https://www.geeksforgeeks.org/orientation-3-ordered-points/
    // for details of below formula.
    let val = (q.y - p.y) * (r.x - q.x) -
        (q.x - p.x) * (r.y - q.y);

    if (val == 0) return 0; // collinear

    return (val > 0) ? 1 : 2; // clock or counterclock wise
}


// a+------------------+c
//  |                  |
//  |      e+----------+----+f
//  |       |          |    |
// d+-------+----------+b   |
//          |               |
//          +---------------+
//         g                 h

// line ab
function doIntersect(h, v) {
    console.log(`doIntersect(\n${JSON.stringify(h)},\n${JSON.stringify(v)})?`)
    let v1 = v.start
    let v2 = v.end
    let vx = v.start.x
    let h1 = h.start
    let h2 = h.end
    let hy = h.start.y;

    // 
    if (vx >= h1.x
        && vx <= h2.x
        && v1.y <= hy
        && v2.y >= hy) {
        console.log(`YES`);
        return true
    }

    return false;
}

function doOverlap(h, v) {
    console.log(`doOverlap(\n${JSON.stringify(h)},\n${JSON.stringify(v)})?`)
    let v1 = v.start
    let v2 = v.end
    let vx = v.start.x
    let h1 = h.start
    let h2 = h.end
    let hy = h.start.y;

    let vStartsOnH = v.start.y == hy;
    let vEndsOnH = v.end.y == hy;
    let hStartsOnV = h.start.x == vx;
    let hEndsOnV = h.end.x == vx;



    return 0;
}

function assert(condition, message) {
    if (!condition) {
        console.error(`Assertion failed : ${message}`);
    }
}

function tests() {
    const ab = { start: { x: 0, y: 9 }, end: { x: 0, y: 7 } };
    const cd = { start: { x: 2, y: 9 }, end: { x: 2, y: 8 } };
    const ef = { start: { x: 0, y: 6 }, end: { x: 5, y: 6 } };
    const gh = { start: { x: 0, y: 5 }, end: { x: 5, y: 5 } };
    const ij = { start: { x: 2, y: 3 }, end: { x: 2, y: 1 } };
    const kl = { start: { x: 0, y: 2 }, end: { x: 8, y: 2 } };
    const mn = { start: { x: 8, y: 7 }, end: { x: 6, y: 5 } };
    const op = { start: { x: 5, y: 4 }, end: { x: 7, y: 1 } };
    //     0 1 2 3 4 5 6 7 8 9 1
    // 9  a|   |c
    //     |   |
    // 8   |   |d
    //     |   
    // 7  b|              m
    //                   /
    // 6  e----------f  /
    //                 /
    // 5  g--------h  /n

    // 4          \o
    //             \
    // 3     i|     \
    //        |      \
    // 2  k---|-------\---l
    //        |        \
    // 1     j|         p
    //    0 1 2 3 4 5 6 7 8 9 1
    //                        0
    assert(!doIntersect(ab, cd), "ab should not intersect cd");
    assert(!doIntersect(ef, gh), "ef should not intersect gh");
    assert(!doIntersect(ef, mn), "ef should not intersect mn");
    assert(!doIntersect(ij, op), "ij should not intersect op");
    assert(doIntersect(ij, kl), "ij should intersect kl");
    assert(doIntersect(kl, ij), "kl should intersect il");
    assert(doIntersect(kl, op), "kl should intersect op");
    assert(doIntersect(op, kl), "op should intersect kl");
}

async function main() {
    try {
        const entries = await getLines.processLines(path.resolve(__dirname, input), lineParser());
        const horizontals = entries.filter(e => e.horizontal);
        const verticals = entries.filter(e => e.vertical);

        total = 0
        for (h of horizontals) {
            for (v of verticals) {
                total += doIntersect(h, v);
            }
        }
        console.log(`Total is ${total}`);
    }
    catch (e) {
        console.error(e);
    }
}

tests();
//main();