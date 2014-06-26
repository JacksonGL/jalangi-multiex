function y(x) {
    var rand = Math.random();
    if (x > 0) {
        return foo(x-1);
        //return 1;
    } else {
        return -1;
    }
}

function foo(x) {
    if (x > 0) {
        return y(x-1);
        //return 1;
    } else {
        return -1;
    }
}