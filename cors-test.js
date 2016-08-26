// Code goes here

(function() {
  console.log(window);
  window.makeError = function(a) {
    a.b();
  };
}());
