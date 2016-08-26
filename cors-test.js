// Code goes here

(function() {
  console.log(window);
  window.makeError = function(a) {
    return a.b();
  };
  window.onerror = function(msg, url, line, col, err) {
    console.log(msg + url + line + col);
    console.log(err);
  };
}());
