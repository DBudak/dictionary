import React from 'react';
import logo from './logo.svg';
import './App.css';
import Text from './text';

class App extends React.Component {
  componentDidMount() {
    console.log(Text);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
          </p>
        </header>
      </div>
    );
  }
}

export default App;
