export function recursiveMaze(grid, rowStart, rowEnd, colStart, colEnd, skewIterations) {
    if (rowEnd < rowStart || colEnd < colStart) {
        return grid;
    }

    // Horizontal Line on top
    for (let col = colStart; col <= colEnd; col++) {
        const node = grid[rowStart][col];
        node.isWall = true;
    }

    // Horizontal Line at the bottom
    for (let col = colStart; col <= colEnd; col++) {
        const node = grid[rowEnd][col];
        node.isWall = true;
    }

    // Vertical Line on the left
    for (let row = rowStart; row <= rowEnd; row++) {
        const node = grid[row][colStart];
        node.isWall = true;
    }

    // Vertical Line on the right
    for (let row = rowStart; row <= rowEnd; row++) {
        const node = grid[row][colEnd];
        node.isWall = true;
    }

    // Generate randomly generated vertical lines with random holes (modified to 3-4 lines)
    generateRandomVerticalLines(grid, rowStart, rowEnd, colStart + 1, colEnd - 1, 3, 4);

    // Generate random horizontal line within rows 12 to 16 with a random hole
    const randomRow = Math.floor(Math.random() * (rowEnd - rowStart - 11)) + rowStart + 6;
    const holeIndex = Math.floor(Math.random() * (colEnd - colStart + 1)) + colStart;
    for (let col = colStart; col <= colEnd; col++) {
        if (col !== holeIndex) {
            const node = grid[randomRow][col];
            node.isWall = true;
        }
    }

    // Generate random 2x2 grid components within each box (excluding borders) (modified to 0-3 components)
    generateRandom2x2Grids(grid, rowStart + 1, rowEnd - 1, colStart + 1, colEnd - 1, 0, 3);

    return grid;
}

function generateRandomVerticalLines(grid, rowStart, rowEnd, colStart, colEnd, minLines, maxLines) {
    const numVerticalLines = Math.floor(Math.random() * (maxLines - minLines + 1)) + minLines;
    const verticalLineSpacing = Math.floor((colEnd - colStart + 1) / (numVerticalLines + 1));

    for (let i = 1; i <= numVerticalLines; i++) {
        const col = colStart + verticalLineSpacing * i;

        const holeIndex = Math.floor(Math.random() * (rowEnd - rowStart + 1)) + rowStart;
        for (let row = rowStart; row <= rowEnd; row++) {
            if (row !== holeIndex) {
                const node = grid[row][col];
                node.isWall = true;
            }
        }
    }
}

function generateRandom2x2Grids(grid, rowStart, rowEnd, colStart, colEnd, minComponents, maxComponents) {
    const numComponents = Math.floor(Math.random() * (maxComponents - minComponents + 1)) + minComponents;
    const numRows = Math.floor((rowEnd - rowStart + 1) / 2);
    const numCols = Math.floor((colEnd - colStart + 1) / 2);

    let count = 0; // Counter to keep track of generated components

    while (count < numComponents) {
        const row = Math.floor(Math.random() * numRows) * 2 + rowStart;
        const col = Math.floor(Math.random() * numCols) * 2 + colStart;

        // Check if the 2x2 grid component is already filled
        if (!isGridComponentFilled(grid, row, col)) {
            fillGridComponent(grid, row, col);
            count++;
        }
    }
}

function isGridComponentFilled(grid, row, col) {
    for (let i = row; i <= row + 1; i++) {
        for (let j = col; j <= col + 1; j++) {
            if (grid[i][j].isWall) {
                return true;
            }
        }
    }
    return false;
}

function fillGridComponent(grid, row, col) {
    for (let i = row; i <= row + 1; i++) {
        for (let j = col; j <= col + 1; j++) {
            grid[i][j].isWall = true;
        }
    }
}




// export function recursiveMaze(grid, rowStart, rowEnd, colStart, colEnd, skewIterations) {
//     if (rowEnd < rowStart || colEnd < colStart) {
//         return grid;
//     }

//     // Horizontal Line on top
//     for (let col = colStart; col <= colEnd; col++) {
//         const node = grid[rowStart][col];
//         node.isWall = true;
//     }

//     // Horizontal Line at the bottom
//     for (let col = colStart; col <= colEnd; col++) {
//         const node = grid[rowEnd][col];
//         node.isWall = true;
//     }

//     // Vertical Line on the left
//     for (let row = rowStart; row <= rowEnd; row++) {
//         const node = grid[row][colStart];
//         node.isWall = true;
//     }

//     // Vertical Line on the right
//     for (let row = rowStart; row <= rowEnd; row++) {
//         const node = grid[row][colEnd];
//         node.isWall = true;
//     }

//     // Generate randomly generated vertical lines with random holes on each side
//     generateRandomVerticalLines(grid, rowStart, rowEnd, colStart + 1, colEnd - 1, 2, 6);

//     // Generate random horizontal line within rows 12 to 16 with a random hole
//     const randomRow = Math.floor(Math.random() * (rowEnd - rowStart - 11)) + rowStart + 6;
//     const holeIndex = Math.floor(Math.random() * (colEnd - colStart + 1)) + colStart;
//     for (let col = colStart; col <= colEnd; col++) {
//         if (col !== holeIndex) {
//             const node = grid[randomRow][col];
//             node.isWall = true;
//         }
//     }

//     return grid;
// }

// function generateRandomVerticalLines(grid, rowStart, rowEnd, colStart, colEnd, minLines, maxLines) {
//     const numVerticalLines = Math.floor(Math.random() * (maxLines - minLines + 1)) + minLines;
//     const verticalLineSpacing = Math.floor((colEnd - colStart + 1) / (numVerticalLines + 1));

//     for (let i = 1; i <= numVerticalLines; i++) {
//         const col = colStart + verticalLineSpacing * i;
//         const holeIndex = Math.floor(Math.random() * (rowEnd - rowStart - 1)) + rowStart + 1;

//         for (let row = rowStart; row <= rowEnd; row++) {
//             if (row !== holeIndex) {
//                 const node = grid[row][col];
//                 node.isWall = true;
//             }
//         }
//     }
// }
