(function () {

  if (typeof Life === "undefined") {
    window.Life = {};
  }

  var Game = Life.Game = function () {
    Life.game = this;
    this.DIM_X = 500;
    this.DIM_Y = 500;
    this.numRows = 100;
    this.numCols = 100;
    this.board = this.initializeBoard();
    this.addNeighbors();
  };

  Game.prototype.initializeBoard = function () {
    var board = [];
    var cellWidth = this.DIM_X/this.numRows;
    var cellHeight = this.DIM_Y/this.numCols;
    for (var i = 0; i < this.numRows; i++) {
      var row = [];
      board.push(row);
      for (var j = 0; j < this.numCols; j++) {
        var isAlive = Math.random() < 0.5;
        row.push(new Life.Cell({
          isAlive: isAlive,
          origin: [cellWidth * i, cellHeight * j],
          height: cellHeight,
          width: cellWidth,
        }));
      }
    }
    return board;
  }

  Game.prototype.initializeEventListeners = function (view) {
    this.cells().forEach(function (cell) {
      view.addEventListener(cell);
    }.bind(this));
  }

  Game.prototype.cells = function () {
    if (this._cells) {
      return this._cells;
    }
    this._cells = [];
    for (var i = 0; i < this.board.length; i++) {
      for (var j = 0; j < this.board[i].length; j++) {
        this._cells.push(this.board[i][j]);
      }
    }
    return this._cells;
  }

  Game.prototype.addNeighbors = function () {
    for (var i = 0; i < this.board.length; i++) {
      for (var j = 0; j < this.board[i].length; j++) {
        var cell = this.board[i][j];
        cell.neighbors = this.getNeighbors(i, j)
      }
    }
  }

  Game.prototype.getNeighbors = function (row, col) {
    var board = this.board;
    var neighbors = [];
    var neighborIndices = [
      [row - 1, col - 1],
      [row - 1, col],
      [row - 1, col + 1],
      [row, col - 1],
      [row, col + 1],
      [row + 1, col - 1],
      [row + 1, col],
      [row + 1, col + 1]
    ]
    for (var i = 0; i < neighborIndices.length; i++) {
      var neighborRow = neighborIndices[i][0];
      var neighborCol = neighborIndices[i][1];
      try {
        var cell = board[neighborRow][neighborCol];
        if (cell) {
          neighbors.push(cell);
        }
      } catch (e) {
        if (!(e instanceof TypeError)) {
          console.error(e);
        }
      }
    }
    return neighbors;
  }

})();
