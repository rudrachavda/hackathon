import React, { Component } from 'react';
import Node from './Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from '../Algorithms/dijkstra';
import { recursiveMaze } from '../Maze/DivMaze';



import './PVisualizer.css';

const START_NODE_ROW = 10; //10
const START_NODE_COL = 2; //15

const FINISH_NODE_ROW = 10; //10
const FINISH_NODE_COL = 35; //35

export default class PVisualizer extends Component {
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
                }, 10 * i);
                return;
            }
            setTimeout(() => {
                const node = visitedNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-visited';
            }, 10 * i);
        }
    }

    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-shortest-path';
            }, 50 * i);
        }
    }

    // visualizeDijkstra() {
    //     const { grid } = this.state;
    //     const startNode = grid[START_NODE_ROW][START_NODE_COL];
    //     const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    
    //     let validMaze = false;
    //     while (!validMaze) {
    //         recursiveMaze(grid, 0, grid.length - 1, 0, grid[0].length - 1, false, "wall");
    //         validMaze = validateMaze(grid, startNode, finishNode);
    //     }
    
    //     const newGrid = grid.map(row => [...row]);
    
    //     // Reset the state of each node
    //     newGrid.forEach(row => {
    //         row.forEach(node => {
    //             node.distance = Infinity;
    //             node.isVisited = false;
    //             node.previousNode = null;
    //         });
    //     });
    
    //     const visitedNodesInOrder = dijkstra(newGrid, startNode, finishNode);
    //     const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    //     this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    // }
    

    visualizeDijkstra() {
        const { grid } = this.state;
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    }

    recursiveMaze() {
        const { grid } = this.state;
        recursiveMaze(grid, 0, grid.length - 1, 0, grid[0].length - 1, "horizontal", false, "wall");
    }
    

    render() {
        const { grid, mouseIsPressed } = this.state;

        return (
            <>
                <button className = "button" onClick={() => this.visualizeDijkstra()}>
                            Visualize
                </button>
                
                <button className = "button" onClick={() => this.recursiveMaze()}>
                    Maze Generator
                </button>

                <div className="grid">
                    {grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {row.map((node, nodeIdx) => {
                                    const { row, col, isFinish, isStart, isWall } = node;
                                    return (
                                        <Node
                                            key={nodeIdx}
                                            col={col}
                                            isFinish={isFinish}
                                            isStart={isStart}
                                            isWall={isWall}
                                            mouseIsPressed={mouseIsPressed}
                                            onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                            onMouseEnter={(row, col) =>
                                                this.handleMouseEnter(row, col)
                                            }
                                            onMouseUp={() => this.handleMouseUp()}
                                            row={row}></Node>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </>
        );
    }
}


const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 22; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
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