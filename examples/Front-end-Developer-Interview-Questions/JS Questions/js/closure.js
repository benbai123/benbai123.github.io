// global variable
var gvar = 1;
function outputGlobal () {
    $('.output').append('<div>global '+gvar+'</div>');
    gvar++;
}

// output global
outputGlobal();
outputGlobal();

// obviously, you can change gvar directly
gvar = 9;;
outputGlobal();

function makeFoo (str) {
    var pvar = 1;
    function foo () {
        $('.output').append('<div>'+str+' '+pvar+'</div>');
        pvar++;
    }
    return foo;
}
// get and call closure foo
var fooOne = makeFoo('fooOne');
fooOne();
fooOne();
// There is no way to modify pvar used by fooOne Directly
fooOne();

// Get another closure fooTwo, it will use another pvar
var fooTwo = makeFoo('fooTwo');
fooTwo();
fooOne();
fooTwo();