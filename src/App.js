import React from 'react';
import './App.css';
import PathfindingVisualizer from './PathfindingVisualizer/PathfindingVisualizer';
import Header from './Header/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <PathfindingVisualizer/>
    </div>
  );
}

export default App;
