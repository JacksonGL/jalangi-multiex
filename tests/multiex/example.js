function foo(a,b,c){
    if(a > b){
        if(a > c){
            return a;
        } else {
            return c;
        }
    } else {
        if( b > c){
            return b;
        } else {
            return c;
        }
    }
}

foo(J$.readInput(1),J$.readInput(1),J$.readInput(1));