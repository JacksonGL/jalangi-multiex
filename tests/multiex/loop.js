function foo(array){
    var max = 0;
    var maxIndex = -1;
    for(var i=0;i<array.length;i++){
        if(max < array[i]){
            max = array[i];
            maxIndex = i;
        }
    }
    return maxIndex;
}

var input = [];
for(var i=0;i<4;i++){
    input[i] = J$.readInput(0);
}

foo(input);