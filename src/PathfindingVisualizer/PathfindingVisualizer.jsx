import React, { Component } from "react";
import Node from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import "./PathfindingVisualizer.css";

const NUM_ROWS = 27;
const NUM_COLS = 70;
const START_NODE_ROW = 13;
const START_NODE_COL = 9;
const FINISH_NODE_ROW = 13;
const FINISH_NODE_COL = 60;



export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 4 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (node.row === START_NODE_ROW && node.col === START_NODE_COL) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-start node-visited";
        } else if (node.row === FINISH_NODE_ROW && node.col === FINISH_NODE_COL) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-finish node-visited";
        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
        }
      }, 4 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (node.row === START_NODE_ROW && node.col === START_NODE_COL) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-start node-shortest-path";
        } else if (node.row === FINISH_NODE_ROW && node.col === FINISH_NODE_COL) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-finish node-shortest-path";
        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
        }
      }, 50 * i);
    }
  }

  visualizeDijkstra() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  clearBoard() {
    let grid = this.state;
    grid = resetGrid(grid);
    this.setState({ grid });
  };

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <div className="banner-image vh-100 d-flex justify-content-center align-items-center" draggable="false">
        <div className="content text-center" draggable="false">
          <div className="grid" draggable="false">
            {grid.map((row, rowIndex) => {
              return (
                <div key={rowIndex} className="row-container">
                  {row.map((node, nodeIndex) => {
                    const { row, col, isStart, isFinish, isWall } = node;
                    return (
                      <Node
                        key={nodeIndex}
                        col={col}
                        isStart={isStart}
                        isFinish={isFinish}
                        isWall={isWall}
                        mouseIsPressed={mouseIsPressed}
                        onMouseDown={(row, col) =>
                          this.handleMouseDown(row, col)
                        }
                        onMouseEnter={(row, col) =>
                          this.handleMouseEnter(row, col)
                        }
                        onMouseUp={() => this.handleMouseUp()}
                        row={row}
                      ></Node>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <button
            onClick={() => this.visualizeDijkstra()}
            type="button"
            className="btn btn-visualize inline-block-content"
          >
            Visualize Dijkstra
          </button>
          <button
            onClick={() => this.clearBoard()}
            type="button"
            className="btn btn-clear inline-block-content"
          >
            Clear Board
          </button>
        </div>
      </div>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < NUM_ROWS; row++) {
    const currentRow = [];
    for (let col = 0; col < NUM_COLS; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const resetGrid = (grid) => {
  grid = [];
  
  for (let row = 0; row < NUM_ROWS; row++) {
    const currentRow = [];
    for (let col = 0; col < NUM_COLS; col++) {
      if(row === START_NODE_ROW && col === START_NODE_COL) {
        document.getElementById(`node-${row}-${col}`).className = "node node-start";
      } else if (row === FINISH_NODE_ROW && col === FINISH_NODE_COL) {
        document.getElementById(`node-${row}-${col}`).className = "node node-finish";
      } else {
        document.getElementById(`node-${row}-${col}`).className = "node ";
      }
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};