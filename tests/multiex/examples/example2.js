
var x, r;
r = 9.1;
x = J$.readInput(1);

function foo() {
    if(x>100) {
        if(x==200)
            r = 0.3;
    }
}

foo();
if(r*r - r < 0.0) {
    console.log(x);
}