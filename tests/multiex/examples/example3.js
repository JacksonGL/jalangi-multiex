var x, f;
x = J$.readInput(1);

function foo(y) {
    if(y>0) {
        return function f1(z) {
            return z - 1;
        }
    } else {
        return function f2(z) {
            return z + 1;
        }
    }
}

f = foo(x);
x = f(x);
if(x > 0) {
    console.log(x);
}