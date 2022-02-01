import React from 'react';
import './App.css';
import Header from './Header/Header';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';
import About from './About/About';

function App() {
  return (
    <div className="App">
      <Header/>
      <PathfindingVisualizer/>
      <About/>
    </div>
  );
}

export default App;
