/**/
function foo(x) {
    if (x > 0) {
        return foo(x-1);
        //return 1;
    } else {
        return -1;
    }
}

foo(J$.readInput(0));


