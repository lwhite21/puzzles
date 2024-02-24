import './ColorColapse.css'
import React, { useEffect, useState } from 'react'

const BOARD_SIZE = 5
const MAX_SEARCH_DEPTH = 12 // Maximum depth for the DFS search (Higher values will take longer to solve)
const COLORS = ['Blue', 'Green', 'Red'];

const ColorColapse = () => {
    const [board, setBoard] = useState([]);
    const [isBoardSolvable, setIsBoardSolvable] = useState([]);

    useEffect(() => {
        generateRandomBoard();
    }, []);

    useEffect(() => {
        if (board.length !== BOARD_SIZE) return;
        const checkSolvable = isSolvable(board);
        setIsBoardSolvable(checkSolvable);
    }, [board]);

    const generateRandomBoard = () => {
        let newBoard = [];
        for (let i = 0; i < BOARD_SIZE; i++) {
            let row = [];
            for (let j = 0; j < BOARD_SIZE; j++) {
                row.push(COLORS[Math.floor(Math.random() * COLORS.length)]);
            }
            newBoard.push(row);
        }
        setBoard(newBoard.slice());
    };
    

    const handleTileClick = (i, j) => {
        let newBoard = [...board];
        let color = newBoard[i][j];
        const visited = new Set();
    
        let numColorsRemoved = 0;

        const dfs = (i, j) => {
            if (i < 0 || i >= BOARD_SIZE || j < 0 || j >= BOARD_SIZE) return;
            if (newBoard[i][j] !== color) return;
            if (visited.has(i + ',' + j)) return;
            visited.add(i + ',' + j);
            newBoard[i][j] = 'Grey';
            numColorsRemoved++;
            dfs(i + 1, j);
            dfs(i - 1, j);
            dfs(i, j + 1);
            dfs(i, j - 1);
        };
    
        dfs(i, j);

        if (numColorsRemoved === 1) {
            console.log("Game Over!")
            return
        }
    
        // Gravity effect
        for (let col = 0; col < BOARD_SIZE; col++) {
            let k = BOARD_SIZE - 1;
            for (let row = BOARD_SIZE - 1; row >= 0; row--) {
                if (newBoard[row][col] !== 'Grey') {
                    newBoard[k][col] = newBoard[row][col];
                    k--;
                }
            }
            for (let row = k; row >= 0; row--) {
                newBoard[row][col] = 'Grey';
            }
        }
    
        // Shift tiles to the left
        for (let col = 0; col < BOARD_SIZE - 1; col++) {
            let isEmptyColumn = true;
            for (let row = 0; row < BOARD_SIZE; row++) {
                if (newBoard[row][col] !== 'Grey') {
                    isEmptyColumn = false;
                    break;
                }
            }
            if (isEmptyColumn) {
                let shiftAmount = 1;
                while (col + shiftAmount < BOARD_SIZE && isEmptyColumn) {
                    for (let row = 0; row < BOARD_SIZE; row++) {
                        newBoard[row][col] = newBoard[row][col + shiftAmount];
                        newBoard[row][col + shiftAmount] = 'Grey';
                    }
                    isEmptyColumn = true;
                    for (let row = 0; row < BOARD_SIZE; row++) {
                        if (newBoard[row][col] !== 'Grey') {
                            isEmptyColumn = false;
                            break;
                        }
                    }
                    shiftAmount++;
                }
            }
        }

        // Check for game over
        const numColors = {};
        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                if (newBoard[i][j] !== 'Grey') {
                    if (numColors[newBoard[i][j]]) {
                        numColors[newBoard[i][j]]++;
                    } else {
                        numColors[newBoard[i][j]] = 1;
                    }
                }
            }
        }
        for (const color in numColors) {
            if (numColors[color] === 1) {
                console.log("Game Over!")
            }
        }
    
        setBoard(newBoard);
        return newBoard;
    };
    

    const isSolvable = (newBoard) => {
        const losingBoards = new Set();
    
        const dfs = (currentBoard, depth, steps) => {
            if (depth === 0) {
                const isSolved = isBoardSolved(currentBoard);
                return isSolved;
            }
    
            // Explore possible moves
            for (let i = 0; i < BOARD_SIZE; i++) {
                for (let j = 0; j < BOARD_SIZE; j++) {
                    // Simulate a move
                    const boardAfterMove = simulateMove(JSON.parse(JSON.stringify(currentBoard)), i, j);
                    if (boardAfterMove === null) {
                        continue;  // Invalid move, skip
                    }
                    if (boardAfterMove === undefined) {
                        // Game over, no more valid moves
                        return false
                    }
                    const boardString = JSON.stringify(boardAfterMove);
                    if (losingBoards.has(boardString)) {
                        continue;  // Losing board, skip
                    }
                    const isSolved = isBoardSolved(boardAfterMove);
                    if (isSolved) {
                        return steps;
                    }
                    // Recursively call DFS with the new board and update steps
                    if (dfs(boardAfterMove, depth - 1, [...steps, { row: i, col: j }])) {
                        return true;  // If a solution is found, stop searching
                    } 
                    else {
                        const boardString = JSON.stringify(boardAfterMove);
                        losingBoards.add(boardString);
                    }
                }
            }

    
            return false;  // No solution found at this depth
        };
    
        // Start DFS from the initial board with a maximum depth
        const result = dfs(JSON.parse(JSON.stringify(newBoard)), MAX_SEARCH_DEPTH, []);
        // result contains one of the possible solutions if it exists
        return result ? true : false;
    };
    
    const isBoardSolved = (newBoard) => {
        for (const row of newBoard) {
            for (const color of row) {
                if (color !== 'Grey') {
                    return false;
                }
            }
        }
        return true;
    };
    
    const simulateMove = (board, i, j) => {
        if (board === undefined) {
            return undefined;
        }

        const newBoard = JSON.parse(JSON.stringify(board));  // Create a copy of the board

        let color = newBoard[i][j];
        if (color === 'Grey') {
            return null;
        }
        const visited = new Set();
    
        let numColorsRemoved = 0;

        const dfs = (i, j) => {
            if (i < 0 || i >= BOARD_SIZE || j < 0 || j >= BOARD_SIZE) return;
            if (newBoard[i][j] !== color) return;
            if (visited.has(i + ',' + j)) return;
            visited.add(i + ',' + j);
            newBoard[i][j] = 'Grey';
            numColorsRemoved++;
            dfs(i + 1, j);
            dfs(i - 1, j);
            dfs(i, j + 1);
            dfs(i, j - 1);
        };
    
        dfs(i, j);

        if (numColorsRemoved === 1) {
            return null
        }
    
        // Gravity effect
        for (let col = 0; col < BOARD_SIZE; col++) {
            let k = BOARD_SIZE - 1;
            for (let row = BOARD_SIZE - 1; row >= 0; row--) {
                if (newBoard[row][col] !== 'Grey') {
                    newBoard[k][col] = newBoard[row][col];
                    k--;
                }
            }
            for (let row = k; row >= 0; row--) {
                newBoard[row][col] = 'Grey';
            }
        }
    
        // Shift tiles to the left
        for (let col = 0; col < BOARD_SIZE - 1; col++) {
            let isEmptyColumn = true;
            for (let row = 0; row < BOARD_SIZE; row++) {
                if (newBoard[row][col] !== 'Grey') {
                    isEmptyColumn = false;
                    break;
                }
            }
            if (isEmptyColumn) {
                let shiftAmount = 1;
                while (col + shiftAmount < BOARD_SIZE && isEmptyColumn) {
                    for (let row = 0; row < BOARD_SIZE; row++) {
                        newBoard[row][col] = newBoard[row][col + shiftAmount];
                        newBoard[row][col + shiftAmount] = 'Grey';
                    }
                    isEmptyColumn = true;
                    for (let row = 0; row < BOARD_SIZE; row++) {
                        if (newBoard[row][col] !== 'Grey') {
                            isEmptyColumn = false;
                            break;
                        }
                    }
                    shiftAmount++;
                }
            }
        }

        // Check for game over
        const numColors = {};
        for (let i = 0; i < BOARD_SIZE; i++) {
            for (let j = 0; j < BOARD_SIZE; j++) {
                if (newBoard[i][j] !== 'Grey') {
                    if (numColors[newBoard[i][j]]) {
                        numColors[newBoard[i][j]]++;
                    } else {
                        numColors[newBoard[i][j]] = 1;
                    }
                }
            }
        }
        for (const color in numColors) {
            if (numColors[color] === 1) {
                return undefined;
            }
        }
    
        return newBoard;
    };

    return (
        <div className="color-colapse-container">
            <p className='color-colapse-title'>Color Colapse</p>
            <button onClick={() => generateRandomBoard()}>Generate New Board</button>
            {isBoardSolvable && 
            <div>
                <p className='color-colapse-solvable'>Board is solvable</p>
            </div>
            }
            {isBoardSolvable === false && <p className='color-colapse-unsolvable'>Board is not solvable</p>}
            <div className="color-colapse-game">
                {board.map((row, i) => (
                    <div key={i} className="color-colapse-row">
                        {row.map((color, j) => (
                            <div key={j} className="color-colapse-tile" style={{ backgroundColor: color }} onClick={() => handleTileClick(i, j)}></div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ColorColapse;