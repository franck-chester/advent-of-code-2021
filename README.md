# advent-of-code-2021
My 2021 attempt at the https://adventofcode.com/ challenge.

Started writing the following on day 10, hence the lack of details :-)

## Day 1: Sonar Sweep

Easy one

## Day 2: Dive!

Easy one -= but decided it was worth my while to use map / reduce /filter

## Day 3: Binary Diagnostic

Easy one.

## Day 4: Giant Squid

Not a very smart implementation, but works.
Part 2 is just part 1 with a few breaks removed to count till the end rather than stop at the first winning board

## Day 5: Hydrothermal Venture

Easy one, once I stopped kidding myself there was some secret math to count intersections;

## Day 6: Lanternfish

Part 1 was easy to achieve by tracking the cycle date per fish,

Part 2 is technically speaking the same than part 1, but the factorial blows the basic implementation out of the water, run out of memory, too many fish!!

I really struggled for a while, really thought there was some smart math at play.

In the end the trick was to stop tracking the cycle date per fish, and start tracking the number of fish at any date of the cycle.

## Day 7: The Treachery of Whales

Part 1 I wasted a huge amount of time looking for smart math to solve it.
Even looked into [KD Trees](https://en.wikipedia.org/wiki/K-d_tree)!!!

In the end, wrote the basic code and got there :-)

Part 2 is not much more work after that, as long as you remember the [triangle number formula](https://www.mathsisfun.com/algebra/triangular-numbers.html)
## Day 8: Seven Segment Search

Part 1 is a slog but simple enough.
Suspect there is a smart binary math method cleaner than all the switch statements, but beyond me I'm afraid

Part 2 took me a while.
It's a bit like sudoku, figure our which order to eliminate possibilities

## Day 9: Smoke Basin

First part is simple enough.
Second part I haven't done - got a cold and just couldn't think.
Main issue that worries me is connecting basin... I can see how to mark a cell as part of a basin (surrounded by cells of different height, not 9), but identifying th basin is beyond me
## Day 10: Syntax Scoring

An easy one - but I have a cold and won't refactor my very basic implementation
