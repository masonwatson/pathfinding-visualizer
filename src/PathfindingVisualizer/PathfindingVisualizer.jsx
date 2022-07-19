import React, { useState, useEffect } from "react";
import Node from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";
import "./PathfindingVisualizer.css";

// const NUM_ROWS = 27;
// const NUM_COLS = 70;
// const START_NODE_ROW = 13;
// const START_NODE_COL = 9;
// const FINISH_NODE_ROW = 13;
// const FINISH_NODE_COL = 60;

export default function PathfindingVisualizer() {

  const [grid, setGrid] = useState([]);
  const [rows, setRows] = useState(27);
  const [cols, setCols] = useState(70);
  const [startNodeRow, setStartNodeRow] = useState(13);
  const [startNodeCol, setStartNodeCol] = useState(9);
  const [finishNodeRow, setFinishNodeRow] = useState(13);
  const [finishNodeCol, setFinishNodeCol] = useState(60);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {

    function site_mount() {
      setIsMounted(true);
      setGrid(getInitialGrid(rows, cols, startNodeRow, startNodeCol, finishNodeRow, finishNodeCol));
    }

    if (isMounted === false) {
      site_mount();
    }

    return () => {
      setIsMounted(false);
    };

  }, [setGrid, resetGrid])

  const handleMouseDown = (row, col) => {
    setGrid(getNewGridWithWallToggled(grid, row, col))
    setMouseIsPressed(true);
  }

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed) return;
    setGrid(getNewGridWithWallToggled(grid, row, col));
  }

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  }

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 4 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (node.row === startNodeRow && node.col === startNodeCol) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-start node-visited";
        } else if (node.row === finishNodeRow && node.col === finishNodeCol) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-finish node-visited";
        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-visited";
        }
      }, 4 * i);
    }
  }

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (node.row === startNodeRow && node.col === startNodeCol) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-start node-shortest-path";
        } else if (node.row === finishNodeRow && node.col === finishNodeCol) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-finish node-shortest-path";
        } else {
          document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
        }
      }, 50 * i);
    }
  }

  const visualizeDijkstra = () => {
    // const { grid } = this.state;
    const startNode = grid[startNodeRow][startNodeCol];
    const finishNode = grid[finishNodeRow][finishNodeCol];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  const clearBoard = () => {
    setGrid(resetGrid(grid, rows, cols, startNodeRow, startNodeCol, finishNodeRow, finishNodeCol));
  };

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
                        handleMouseDown(row, col)
                      }
                      onMouseEnter={(row, col) =>
                        handleMouseEnter(row, col)
                      }
                      onMouseUp={() => handleMouseUp()}
                      row={row}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
        <button
          onClick={() => visualizeDijkstra()}
          type="button"
          className="btn btn-visualize inline-block-content"
        >
          Visualize Dijkstra
        </button>
        <button
          onClick={() => clearBoard()}
          type="button"
          className="btn btn-clear inline-block-content"
        >
          Clear Board
        </button>
      </div>
    </div>
  );
}

const getInitialGrid = (rows, cols, startNodeRow, startNodeCol, finishNodeRow, finishNodeCol) => {
  const grid = [];
  for (let row = 0; row < rows; row++) {
    const currentRow = [];
    for (let col = 0; col < cols; col++) {
      currentRow.push(createNode(col, row, startNodeRow, startNodeCol, finishNodeRow, finishNodeCol));
    }
    grid.push(currentRow);
  }
  return grid;
};

const resetGrid = (grid, rows, cols, startNodeRow, startNodeCol, finishNodeRow, finishNodeCol) => {
  grid = [];
  
  for (let row = 0; row < rows; row++) {
    const currentRow = [];
    for (let col = 0; col < cols; col++) {
      if(row === startNodeRow && col === startNodeCol) {
        document.getElementById(`node-${row}-${col}`).className = "node node-start";
      } else if (row === finishNodeRow && col === finishNodeCol) {
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

const createNode = (col, row, startNodeRow, startNodeCol, finishNodeRow, finishNodeCol) => {
  return {
    col,
    row,
    isStart: row === startNodeRow && col === startNodeCol,
    isFinish: row === finishNodeRow && col === finishNodeCol,
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