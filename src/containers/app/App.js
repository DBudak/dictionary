import React from 'react';
import './App.scss';
import text from '../../text';


class App extends React.Component {

  handleWordSelect(e, i) {
    e.stopPropagation();
    if (!e.target.className.includes('selected')) {
      this.removePopover();
      this.highlightSelected(e.target);
      this.addPopover(e.target, i);
      this.getWordDefinition(i);
    }
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
        this.paintResponse(resObj);
      })
      .catch((err) => {
        this.noDefinitionFound(word);
      });;
  }

  highlightSelected(target) {
    target.className = target.className + ' selected';
  }

  removePopover() {
    const popover = document.getElementById('popover'),
      wrapper = document.getElementById('textOutput'),
      highlighted = document.getElementsByClassName('selected');
    if (popover) {
      wrapper.removeChild(popover);
    }
    if (highlighted) {
      Array.from(highlighted).forEach((el) => {
        el.className = el.className.replace(' selected', '');
      })
    }
  }

  addPopover(target, i) {
    const popover = document.createElement("div"),
      wrapper = document.getElementById('textOutput'),
      wordPosition = target.getBoundingClientRect(),
      leftMargin = wordPosition.left + target.offsetWidth;
    popover.id = 'popover';
    popover.style.top = wordPosition.top + "px";
    popover.style.left = leftMargin + "px";
    popover.innerHTML = '<span class="loading">Loading...</span>'
    wrapper.insertBefore(popover, target);
  }

  paintResponse(res) {
    let result = '';
    res.forEach((el) => {
      if (el.meaning) {
        for (let prop in el.meaning) {
          if (Array.isArray(el.meaning[prop])) {
            result = result + `<h3>${prop}</h3>`;
            for (let i = 0; i< el.meaning[prop].length; i++){
              if (el.meaning[prop][i].definition) {
                result = result + `<p>&#8226; ${el.meaning[prop][i].definition}</p>`;
              }
            }
          }
        }
      }
    });
    const popover = document.getElementById('popover');
    popover.innerHTML = result;
  }

  noDefinitionFound(word) {
    const message = `<span class="loading">Oops:( Looks like we can't find a definition for <i>'${word}'</i></span>`;
    const popover = document.getElementById('popover');
    if (popover) {
      popover.innerHTML = message;
    }
  }

  render() {
    const textOutput = text.map((word, i) =>
      <span
        key={i}
        onClick={(e) => this.handleWordSelect(e, i)} >
        {word + ' '}
      </span>
    );

    return (
      <div className="App" onClick={(e) => this.removePopover()}>
        <header className="App-header">
          <b>Dmitry Budak</b> Front end developer code assessment
        </header>
        <main>
          <div class="description">
            Click on any word below to get its definition
          </div>
          <div id="textOutput">
            {textOutput}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
