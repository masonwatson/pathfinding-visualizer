import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import About from './components/About/About';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';

function App() {
  return (
    <div className="App">
      {/* <Header/> */}
      <PathfindingVisualizer/>
      {/* <About/> */}
    </div>
  );
}

export default App;
