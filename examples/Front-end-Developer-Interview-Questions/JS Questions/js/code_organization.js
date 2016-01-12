/*
 a namespace hold all of my stuffs
 these are the most basic APIs for 
 define/extend class and create object from
 given class

 NOT well tested, just simple sample (from my memory) for demo
 */
var ns = window.myNameSpace = {
    _constructors: {},
    /* define a new class
        name: name of this class
        impl: implementation of this class
    */
    define: function (name, impl) {
        // simply define a function and its prototype
        var fn = function () {};
        fn.prototype = impl;
        // store the function
        this._constructors[name] = fn;
    },
    /* extend to create a new class
        clazz: name of new class
        base: name of existing class to extend from
        impl: the implementation of new class
    */
    extend: function (clazz, base, impl) {
       if (this._constructors[base]) {
            // define a function and create prototype from super class
            var fn = function () {},
                proto = new this._constructors[base]();
            // add/override properties from impl
            for (var key in impl)
                proto[key] = impl[key];
            // set prototype and constructor
            fn.prototype = proto;
            fn.prototype.constructor = fn;
            // keep reference of super class
            proto.superClazz = this._constructors[base].prototype;
            this._constructors[clazz] = fn;
        }
    },
    // create an object from given class
    create: function (clazz) {
        if (this._constructors[clazz]) {
            // call constructor
            var obj = new this._constructors[clazz]();
            obj.superClazz = this._constructors[clazz].prototype;
            return obj;
        }
    }
};
/* with the basic APIs above, others can works with
    (almost, looks like) pure object literal
*/
// the baseClazz will be used as most basic prototype
// contains some basic shared properties or utils
ns.define('myNameSpace.baseClazz', {
        foo: function (v) {
            $('.output').append('<div>foo from baseClazz ('+this._cnt+v+'</div><br/><br/>');
            this._cnt++;
        },
        bar: function (v) {
            $('.output').append('<div>bar from baseClazz ('+this._cnt+v+'</div>');
            this._cnt++;
        },
        // method for call super functions
        super: function (key, args) {
            // get current context
            // if not exists then use the prototype of current prototype
            // use prototype of current context otherwise
            if (!this.context) {
                this.context = {};
                this.fns = {};
            }
            var prevContext = this.context[key] || this.superClazz;
            // get and call super function
            // probably it will call super again
            // this is why the context is required
            //
            // or it will always call method on same prototype
            // since 'this' is always the same
            if (prevContext) {
                var context = this.context[key] = prevContext.superClazz,
                    fn = context? context[key] : null;
                if (fn && (typeof fn) == 'function') {
                    // the function should defined by current context itself
                    // also check whether already called by sub class directly
                    if (context.hasOwnProperty(key) && fn != this.fns[key]) {
                        // keep the first function
                        if (!this.fns[key])
                            this.fns[key] = this[key];
                        fn.apply(this, args);
                    } else
                        this.super(key, args);
                }
            }
            // finished all super call
            if (this.context[key])
                delete this.context[key];
        }
    });
// some sub namespace works as package
ns.extend('myNameSpace.sns.extendClazz', 'myNameSpace.baseClazz', {
    _cnt: 0, // used to make sure from different object
    foo: function (v) {
        $('.output').append('<div>foo from extendClazz ('+this._cnt+v+'</div>');
        this._cnt++;
        this.super('bar', arguments);
        this.super('foo', arguments);
    }
});
// some sub namespace works as package
ns.extend('myNameSpace.sns.anotherExtendClazz', 'myNameSpace.sns.extendClazz', {
    _cnt: 0, // used to make sure from different object
    foo: function (v) {
        $('.output').append('<div>foo from anotherExtendClazz ('+this._cnt+v+'</div>');
        this._cnt++;
        this.super('foo', arguments);
    }
});

var obj = ns.create('myNameSpace.sns.extendClazz'),
    objTwo = ns.create('myNameSpace.sns.anotherExtendClazz'),
    objThree = ns.create('myNameSpace.sns.extendClazz');
obj.foo('_obj');
objThree.foo('_objThree');
objTwo.foo('_objTwo');
objTwo.bar('_objTwo');
objTwo.foo('_objTwo');
objThree.foo('_objThree');
obj.foo('_obj');
