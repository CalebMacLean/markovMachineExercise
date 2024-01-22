// Imports
const markovMachine = require("./markov");

// test
describe("Test Markov Machine Class instance", () => {
    let testMachine;
    const testPhrase = "the cat in the hat";

    beforeEach(() => {
        testMachine = new markovMachine(testPhrase);
    });

    test("Check that testMachine is in fact a markovMachine instance", () => {
        expect(testMachine).toBeInstanceOf(markovMachine);
    });

    test("Class instance has mapped all the words", () => {
        for(let word of testMachine.words) {
            let isInMap = testMachine.chains.get(word);
            expect(isInMap).not.toBe(undefined);
        }
    });

    test("Check that make text is listening to parameter given", () => {
        const fiftyWordsArr = testMachine.makeText(50).split(" ");
        expect(fiftyWordsArr.length).toEqual(50);
    })
})