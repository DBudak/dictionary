import React from 'react';
import './App.css';
import text from './text';


class App extends React.Component {
  componentDidMount() {
    console.log(Text);
  }
  handleWordSelect(target, i) {
    console.log(i, 'was clicked');
    this.getWordDefinition(i);
    this.highlightSelected(target);
    this.addPopover(target, i);
  }
  getWordDefinition(i) {
    const word = text[i].replace(/[\W_]+/g, "").toLowerCase(),
      url = `https://googledictionaryapi.eu-gb.mybluemix.net/?define=${word}&lang=en`;
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('Word not found');
      })
      .then((resObj) => {
        console.log('+', resObj);
      })
      .catch((err) => {
        console.log('-', err.message);
      });;
  }
  highlightSelected(target) {
    console.log(target);
    if (target.className.includes('selected')) {
      target.className = target.className.replace(' selected', '');
    } else {
      target.className = target.className + ' selected';
    }
  }
  addPopover(target, i) {
    const popover = document.createElement("div"),
      wrapper = document.getElementById('textOutput'),
      wordPosition = target.getBoundingClientRect(),
      leftMargin = wordPosition.left+target.offsetWidth;
      console.log(wordPosition.top, wordPosition.right, wordPosition.bottom, wordPosition.left);
    popover.className = 'popover';
    popover.style.top = wordPosition.top+"px";
    popover.style.left = leftMargin+"px";
    console.log(wrapper, 'child:', target);
    wrapper.insertBefore( popover, target);
  }
  render() {
    const textOutput = text.map((word, i) =>
      <span
        key={i}
        onClick={(e) => this.handleWordSelect(e.target, i)} >
        {word + ' '}
      </span>
    );

    return (
      <div className="App">
        <header className="App-header">
        </header>
        <main>
          <div id="textOutput">
            {textOutput}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
