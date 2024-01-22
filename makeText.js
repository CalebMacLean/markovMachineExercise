/** Command-line tool to generate Markov text. */
// Imports
const fs = require('fs').promises;
const markovMachine = require('./markov');

function generateText(path) {
    return fs.readFile(path, 'utf8')
        .then(data => {
            const markovPath = new markovMachine(data);
            return markovPath.makeText();
        })
        .catch(err => {
            console.log(`Error in generateText: ${err}`);
            throw err;
        });
}

const com = process.argv
if (com[2] == 'file') {
    generateText(com[3])
        .then(text => {
            console.log(text);
        })
        .catch(err => {
            console.log(err);
            process.exit(1);
        })
}