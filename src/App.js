import React from 'react';
import logo from './logo.svg';
import './App.css';
import text from './text';
import { appId, appKey } from './keys';


class App extends React.Component {
  componentDidMount() {
    console.log(Text);
  }
  handleWordSelect(i) {
    console.log(i, 'was clicked');
    this.getWordDefinition(i);
  }
  getWordDefinition(i) {
     const  word = text[i].replace(/[\W_]+/g, " ").toLowerCase(),
            url = `https://googledictionaryapi.eu-gb.mybluemix.net/?define=${word}&lang=en`;
    fetch(url)
      .then(res => res.json());
  }
  render() {
    const textOutput = text.map((word, i) =>
      <span
        key={i}
        onClick={() => this.handleWordSelect(i)} >
        {word + ' '}
      </span>
    );

    return (
      <div className="App">
        <header className="App-header">
          <p>
            {textOutput}
          </p>
        </header>
      </div>
    );
  }
}

export default App;
