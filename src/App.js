import React from 'react';
import logo from './logo.svg';
import './App.css';
import text from './text';

class App extends React.Component {
  componentDidMount() {
    console.log(Text);
  }
  render() {
    const textOutput = text.map((word, i) => 
      <span 
      key={i}>
        {word+' '} 
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
