(function () {

  if (typeof Life === "undefined") {
    window.Life = {};
  }

  var Cell = Life.Cell = function (options) {
    this.color = "black";
    this.isAlive = options.isAlive;
    this.origin = options.origin;
    this.height = options.height;
    this.width = options.width;
  };

  Cell.prototype.poll = function (callback) {
    var livingNeighbors = this.livingNeighbors();
    if (this.isAlive && livingNeighbors < 2) {
      callback(false);
    } else if (this.isAlive && livingNeighbors > 3) {
      callback(false);
    } else if (!this.isAlive && livingNeighbors == 3) {
      callback(true);
    }
  }

  Cell.prototype.livingNeighbors = function () {
    var count = 0;
    this.neighbors.forEach(function (neighbor) {
      if (neighbor.isAlive) {
        count += 1;
      }
    });
    return count;
  }

  Cell.prototype.draw = function (ctx) {
    if (this.isAlive) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.rect(this.origin[0], this.origin[1], this.width, this.height);
      ctx.fill();
    } else {
      ctx.clearRect(
        this.origin[0],
        this.origin[1],
        this.height,
        this.width
      );
    }
  }

})();
