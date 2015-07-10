#Conway's game of life

Javascript/HTML5 implementation of Conway's Game of Life

[See it live!](http://www.jmgarza.info/conwaysgameoflife)

##Origin

Conway's game of life is a zero-player game devised by British mathematician John Horton Conway.

[Check out the wiki page!](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

##Rules

1. Any live cell with fewer than two live neighbours dies, as if caused by under-population.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overcrowding.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

##Features

###Unique drawing system

The game view pings each cell on the board and will only redraw the cell if it
has change.  By redrawing only on a cell state-change, the game runs smoothly and
quickly.

###Optimized cell lookup

Each cell stores an array of all its neighbors, reducing lookup time when determining
the cells state at the next state.
