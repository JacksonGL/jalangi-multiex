var x = J$.readInput(1);
var y = J$.readInput(1);
var r = J$.readInput(1);
var z = J$.readInput(1);
function foo(a, b) {
    if (a > 100) { //todo: [feature] backtracking
        if (b) { //todo: [feature] backtracking
            r = 0.3; //todo: handle read values
        }
        r = r + 1; //todo: [highlight] analyse the number of times r is processed
        //todo: [feature] join value summary in binary operation
    }
    //todo: branch merge at function return
}

foo(x, z);
foo(y, !z); //todo: [feature] the concept of context
if (r > 2) { //todo: [feature] a complicated symbolic constraint?
    // should I put something here?
}
//todo: [highlight] show how BDD simplifies the constraints