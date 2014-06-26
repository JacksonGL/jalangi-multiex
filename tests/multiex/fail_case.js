
// case 1  failed
// both Multiple and Single2 does not work
/*
 var input = J$.readInput(true);
 if(typeof input === 'object') {
    console.log('```````````````');

    if(typeof input !== 'object'){
        1
    } else {
        2;
    }
 } else {
    console.log('```````````````""""""""""""""""""');
 }
 */


/* succeed
function foo(input) {
if(input<2) {
    1;
    var a = [];
    a[input];
} else {
    2;
}
}

foo();
 */

// another case to handle
/*
var input;
if(typeof input === 'object') {
    console.log('```````````````');
} else {
    console.log('```````````````""""""""""""""""""');
}
 */

/*
// case 2  succeed
function foo(input) {
for (var i=0;i<input.length;i++){
    console.log(input[i]);
}
}

foo(J$.readInput());
 */
//case 3 succeed;
/*
var input = J$.readInput('test');
if(input === 'test') {
    1;
} else {
    2;
}
*/

//case 4  failed
/*
function foo(input){
    if(input[2] === 'r') {
        1;
    } else {
        2;
    }
}
foo();
 */

//case 5 failed (getting exception)
/*
function foo(input){
    if(input[2] === 4) {
        1;
    } else {
        2;
    }
}

foo(J$.readInput());
*/

//case 6 not sure if the generated output is correct
/*
function foo(input){
    if(input[2] === 4) {
        1;
    } else {
        2;
    }
}

foo();
*/

// single2 does not work
/*

function foo(input){
    input = input.split("e");
    if(input.length > 0){
        1;
    }else {
        2;
    }
}

foo();*/
/*
function foo(input){
    if(input.substring(0,1)==='a'){
        return 1;
    } else {
        return 2;
    }
}

foo();
    */

/*
function foo(input){
    if(input instanceof Array){
        1;
    } else {
        2;
    }
}

foo();
    */

// single2 crashes in this example

/*
function foo() {
    var start = new Date();
    return start.getTime();
}
foo();
 */

//single2 and Multiple cannot handle this
/*
function foo(a,b) {
    if(a & b > 100){
        1;
    } else {
        2;
    }
}

foo();
*/

/*
function foo(a,b){
    if(a * b > 100){
        return 1;
    } else {
        return 2;
    }
}

foo();
    */


function _push(array, val){
    array[array.length] = val;
}

function foo(a){
    var array = [];
    _push(array, a);

    if(array[0] > 0){
        return 1;
    } else {
        return 2;
    }
}

foo();