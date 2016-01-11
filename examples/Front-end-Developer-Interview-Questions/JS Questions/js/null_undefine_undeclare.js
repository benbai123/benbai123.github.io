/* Test with window.val instead of var val; since
var val; is declaration and will always run before
function execution so cannot test the 'undeclared' case
*/
window.onload = function () {
    /* here the window.val is undeclared */
    showInfo(0);

    // declare another variable and assign to window.val
    var v;
    window.val = v;
    /* now the window.val is declared but undefined */
    showInfo(1);

    window.val = null;
    /* window.val now declared and defined as null */
    showInfo(2);
    function showInfo (i) {
        var html = testStatus();
        $('.info')[i].innerHTML = html;
    }

    function testStatus () {
        try {
            if (val) {};
        } catch (e) {
            return e;
        }
        if ((typeof val) === 'undefined')
            return 'val is undefined';
        if (val == null)
            return 'val is null';
    }
}