var p = {}, q = {}, t = {}, error, y;

function foo(r, s){
    r.f = 1;
    s.f = 2;
    if(r.f != 1){
        if(y==100) {
            error = 1;
        } else {
            error = 0;
        }
    }
}

y = J$.readInput(1);
p.f = J$.readInput(1);
t.f = J$.readInput(1);
foo(p, q);
foo(t, t);
console.log(error);