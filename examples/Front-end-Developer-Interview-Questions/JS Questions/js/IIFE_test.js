var foo = function(){
  alert('foo 1');
}();

(function foo() {
  alert('foo 2');
})();

(function () {
  alert('foo 3');
})();

/* This one below not work

function foo(){
    alert('foo');
}();

This  will be parsed as function declaration
function foo(){
    alert('foo');
}
plus a SyntaxError
();

*/
