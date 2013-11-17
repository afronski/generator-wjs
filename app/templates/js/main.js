(function(window) {
  "use strict";

  var canvas = document.querySelector("canvas"),
      context = canvas.getContext("2d"),

      width = canvas.width,
      height = canvas.height,

      debugMode,
      performStep,
      last;

  // Polyfills.

  window.requestAnimFrame = (function() {
    function polyfill(callback) {
      window.setTimeout(callback, 1000 / 60);
    }

    return window.requestAnimationFrame       ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame    ||
           window.oRequestAnimationFrame      ||
           window.msRequestAnimationFrame     ||
           polyfill;
  } ());

  // Utilities.

  function clearCanvas() {
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, width, height);
    context.restore();
  }

  // Application logic.

  function render(dt) {}
  function renderWithDebugMode(dt) {}

  function initialization(context) {
    last = null;

    // Setup drawing mode.
    debugMode = false;
    performStep = render;
  }

  function handleKeyboard(event) {
    // "D" or "d" enables debug mode.
    if (event.keyCode === 68 || event.keyCode === 100) {
      if (debugMode) {
        performStep = renderWithDebugMode;
      } else {
        performStep = render;
      }

      debugMode = !debugMode;
    }
  }

  function renderLoop(timestamp) {
    var dt;

    window.requestAnimationFrame(renderLoop);

    if (last != null) {
      dt = (timestamp - last) / 100;

      clearCanvas();
      performStep(dt);
    }

    last = timestamp;
  }

  // Attaching events.

  document.addEventListener("keypress", handleKeyboard);

  // Starting rendering loop.

  initialization(context);
  renderLoop();

} (window));