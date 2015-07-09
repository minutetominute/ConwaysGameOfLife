(function () {

  if (typeof Life === "undefined") {
    window.Life = {};
  }

  var GameView = Life.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.pause = false;
    this.pauseTimer = 0;
    this.eventListeners = [];
    this.game.initializeEventListeners(this);
  }

  GameView.prototype.start = function () {
    requestAnimationFrame(this.draw.bind(this));
  }

  GameView.prototype.draw = function () {
    var updated = [];
    for (var i = 0; i < this.eventListeners.length; i++) {
      var listener = this.eventListeners[i];
      listener.object.poll(function (newMessage) {
        listener.message = newMessage;
        updated.push(listener);
      }.bind(this));
    }
    for (var i = 0; i < updated.length; i++) {
       var listener = updated[i];
       listener.object.isAlive = listener.message;
       listener.object.draw(this.ctx);
       listener.message = null;
    }
    requestAnimationFrame(this.draw.bind(this));
  }

  GameView.prototype.addEventListener = function (object) {
    this.eventListeners.push({object: object, message: null});
  };

})();
