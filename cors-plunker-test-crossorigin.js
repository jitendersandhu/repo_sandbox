'usestrict';
/* jshint ignore:start */
var corsTestWithCrossorigin = (function() {
    function refErrorFunc() {
        var tmp = x; //no x variable declared!
    }

    function sampleFunction() {
        new Function('throw new Error("Custom Error Message")')();
    }

    function rangeErrorFunc() {
        var b = new Array(-1); //range error
    }

    function stackErrorFunc() {
        file1.stackErrorFunc();
    }

    function typeErrorFunc() {
        document.body.filters[0].apply();
    }

    function URIErrorfunc() {
        decodeURIComponent('%');
    }

    function evalErrorFunc() {
        eval('eval("FAIL ")');
    }

    return {
        evalErrorFunc: evalErrorFunc,
        URIErrorfunc: URIErrorfunc,
        typeErrorFunc: typeErrorFunc,
        rangeErrorFunc: rangeErrorFunc,
        sampleFunction: sampleFunction,
        stackErrorFunc: stackErrorFunc,
        refErrorFunc: refErrorFunc
    };
}());
