var x, p;
p = {f:1, g:2};
x = J$.readInput(1);

function foo() {
    if (x > 100) {
        if(x == 200) {
            p = {f:2};
        }
    }
}

foo();
if(p.f == 2) {
    console.log(x);
}