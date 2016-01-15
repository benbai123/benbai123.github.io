function greeting (greetingWord, name) {
    $('.output').append('<div>'
        + greetingWord // the specified greeting word
        + ', '
        + (this.name || name) // use name from binded object first then use given name
        + '</div>');
}
// undefined: leave 'this' as global object (for browser, window)
// 'Hola': Specify first variable (greetingWord here) as 'Hola'
var holaFoo = greeting.bind(undefined, 'Hola');
var obj = {
    name: 'Tim'
};
// obj: the 'this' will be obj when call helloFoo
// 'Hello': Specify first variable (greetingWord here) as 'Hello'
var helloFoo = greeting.bind(obj, 'Hello');
// call original greeting function
greeting('Hi', 'Ben');
// call holaFoo, specify only name
holaFoo('Ben');
// call helloFoo, do not need to specify any variable
helloFoo();