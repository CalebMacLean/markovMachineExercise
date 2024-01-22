/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // instantiate map to push to
    this.chains = new Map();
    // loop through words using incremental to access multiple indices
    for (let i = 0; i < this.words.length; i++) {
      // loop-scope vars
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;
      // check map for current word
      if (this.chains.has(word)) {
        // each map key is associated with an arr, so we will push to that arr in cases the key exists in chains
        this.chains.get(word).push(nextWord);
      } else {
        // if a word doesn't have a key in chains yet, we'll have to create one and associate it with a unique arr
        this.chains.set(word, [nextWord]);
      }
    }
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // Accepts the amount of words that a user wants to generate, defaults to 100
    // create a index to pick a word from words at random.
    let wordsIdx = Math.floor(Math.random() * this.words.length);
    let word = this.words[wordsIdx];
    // loop through map options until numWords is met.
    let loopCount = 1;
    let result = word;
    while (loopCount < numWords) {
      // access word's arr stored in chains
      // console.log(`Loop ${loopCount}: word -> ${word}`);
      let chain = this.chains.get(word);
      let chainIdx = Math.floor(Math.random() * chain.length);
      let nextWord = chain[chainIdx];
      // console.log(`Loop ${loopCount}: chain -> ${chain}`);
      // console.log(`Loop ${loopCount}: nextWord -> ${nextWord}`);

      if (nextWord) {
        result = result + ` ${nextWord}`;

        // console.log(`Loop ${loopCount}: result -> ${result}`);
      } else {
        let randomIdx = Math.floor(Math.random() * this.words.length);
        nextWord = this.words[randomIdx];
        result = result + `. ${nextWord}`;
        // console.log(`Loop ${loopCount}: result -> ${result}`);
      }
      // Check that next word is not null, extend result accordingly
      // nextWord ? result = `${result} ${nextWord}` : result = `${result}.`;
      // increment loopCount and update word var
      loopCount++;
      word = nextWord;
    }
    // after loop generates the result to meet the numWords parameter given, return
    if(result.charAt(result.length - 1) === '.') {
      return result
    } else {
      return result + '.'
    }
  }
}

module.exports = MarkovMachine;

let mm = new MarkovMachine("the cat in the hat");