var cnt = 0;
function display (curr) {
    // make sure it is executed each time
    cnt++;
    document.getElementById('curr').innerHTML = curr + ' ('+cnt;
}
function foo () {
    display(this);
}
var obj = {
    toString: function () {
        // override for display self as text
        return 'Object "obj"';
    },
    foo: function () {
        display(this);
    },
    evalFoo: function () {
        eval('display(this);');
    },
    indirectEvalFoo: function () {
        var ieval = eval;
        ieval('display(this);');  
    }
};