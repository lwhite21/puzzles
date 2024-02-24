# Color Collapse
Color Collapse is a puzzle game where the goal is to collapse clusters of adjacent tiles of the same color until the entire board is filled with grey tiles. The game introduces a gravity effect, causing tiles to fall and shift to the left after a cluster collapses.

## Gameplay
### Generating a New Board: 
Click the "Generate New Board" button to create a random game board of a specified size.
### Tile Collapse: 
Click on a tile to initiate a collapse of adjacent tiles of the same color. The cluster collapses, and the tiles above it fall, creating new opportunities for collapsing clusters.
### Game Over: 
The game ends when there is only one tile left for any color on the board, making it unsolvable.
## How It Works
The program utilizes a Depth-First Search (DFS) algorithm to determine if a solution exists for the current board. The DFS explores possible moves by simulating tile collapses and recursively checking resulting board states. To optimize the search, the algorithm uses memoization to remember previously explored board layouts.

## DFS Search Depth: 
The maximum depth for the DFS search is set to 12 (configurable). Higher values may result in longer solve times. This value does not need to be set to a value greater than the board size^2 / 2.
### Memoization: 
The algorithm memorizes the results of DFS calls for specific board layouts, marking layouts that result in a loss. This helps skip redundant calculations for layouts known to be unsolvable.

## Running the Application
Clone the repository.
Navigate to the project directory.
Run npm install to install dependencies.
Run npm start to start the application.
Open your browser and go to http://localhost:3000 to play the Color Collapse game.
Enjoy playing and challenging yourself with Color Collapse! If you encounter any issues or have suggestions, feel free to contribute or open an issue.
