function foo(input){
    input = input.split("e"); // <- here invokeFun of split simply returns undefined
    if(input.length > 0){ // <- here when reading the input, it is wrapped by SymbolicAnyVar and initialized to undefined. Consequently, in getting field, try to get field from an undefined value, exception raise.
        1;
    }else {
        2;
    }
}

foo();

