import React, { Component } from 'react';
import Widget from './Widget.js';
import './App.css';

const meta = [
  {
    title: 'Wife',
    dataKey: 'stat-wife',
    legend: [2,3,4,5],
    input: 1,
    min: 1,
    max: 5
  },
  {
    title: 'Coq',
    dataKey: 'stat-coq',
    legend: [1,2,3,4],
    input: 0.5,
    min: 0.5,
    max: 4
  },
  {
    title: 'Meditation',
    dataKey: 'stat-meditation',
    legend: [2,5,10,20,30],
    input: 1,
    min: 1,
    max: 30
  }
]

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">The great thing in this world is not so much where you stand, as in what direction you are moving.</h1>
        </header>
        <br />
        {meta.map(i => (<Widget {...i} />))}
      </div>
    );
  }
}

export default App;
