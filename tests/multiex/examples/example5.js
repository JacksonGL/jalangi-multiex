var x = J$.readInput(1);
var y = J$.readInput(1);
var r = 0;

function foo(a) {
    if(a > 100) {
        if(a == 200) {
            r++;
        }
    }
}

foo(x);
foo(y);
console.log(r);