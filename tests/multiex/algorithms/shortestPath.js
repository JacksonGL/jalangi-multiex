// require the discrete math library
var dm = require('./lib/basic-discrete-math');

// compute the base 2 expansion of a number
console.log("Base 2 Expansion");
dm.base2(1022); //1111111110

// use the euclidian algorithm to calculate the GCD and LCM of 2 numbers
console.log("\n\nEuclidian Algorithm");
dm.euclid(300,90); // gcd=30, lcm=900

// calculate Choose, Permute, Factorial
console.log("\n\nChoose, Permute, Factorial");
console.log( dm.C(4,3) ); //4
console.log( dm.P(4,3) ); //24
console.log( dm.factorial(10) ); //3628800

// Create a tree
var f= new dm.Node('f', []);
var g= new dm.Node('g', []);

var d= new dm.Node('d', []);
var e= new dm.Node('e', [f,g]);

var b= new dm.Node('b', [d,e]);
var c= new dm.Node('c', []);

var a= new dm.Node('a', [b,c]);
// now print out some tree traversals
console.log("\n\nTree Traversal");
console.log("preorder");
dm.preorder(a); // abdefgc
console.log("\n\n");

console.log("postorder");
dm.postorder(a); // dfgebca
console.log("\n\n");

console.log("inorder");
dm.inorder(a);
console.log("\n\n"); // dbfegac

// Create a graph and compute the shortest path between two nodes:
/*
 c ------ d
 / | | \
 a | | f
 \ | | /
 b ------ e

 a <=> c : 1 c <=> d : 3
 a <=> b : 1 d <=> f : 2
 b <=> c : 3 e <=> f : 4
 b <=> e : 5
 */

var G = new dm.Graph(['a','b','c','d','e','f']);
G.addEdge('a','b', 1);
G.addEdge('a','c', 1);
G.addEdge('b','c', 2);
G.addEdge('c','d', 3);
G.addEdge('b','e', 5);
G.addEdge('d','f', 2);
G.addEdge('e','f', 4);
var shortestPath = G.shortestPath('a', 'f');
console.log("answer: ");
console.log(shortestPath); // acdf


/* Pseudo random number generator based on a linear recurrence.
 x_n+1 = (ax_n +c) mod m
 */
console.log("\n\nPseudo Random Number Generator");
var n = 10;
var a = 7;
var c = 4;
var m = 9;
var seed = 3;
var r = dm.pseudoRandom(n,a,c,m,seed);
console.log(r); // a random number

// Generate primes using the seive of erasthonec
console.log("\n\nPrimes");
console.log(dm.erasthones(20)); //2,3,5,7,11,13,17,19
console.log(dm.isPrime(7)); //true
console.log(dm.isPrime(10)); //false
console.log(dm.factors(100)); //2,2,5,5

//Sums and products
console.log("\n\nSums and Products");
var f = function(n) {
    return n+1;
}
console.log(dm.sum(1, 10, f)); //65
console.log(dm.prod(1,10,f)); // 39916800



//Matrices
console.log("\n\nMatrix Bit Product");
var R = new dm.Matrix(3,3);
R.data[0] = [0,1,0];
R.data[1] = [0,0,1];
R.data[2] = [1,1,0];
R.print();
// 0 1 0
// 0 0 1
// 1 1 0
var R2 = R.bitProd(R);
R2.print();
// 0 0 1
// 1 1 0
// 0 1 1
var R3 = R2.bitProd(R);
R3.print();
// 1 1 0
// 0 1 1
// 1 1 1
var R4 = R3.bitProd(R);
R4.print();
//0 1 1
//1 1 1
//1 1 1

console.log("\n\nMatrix Multiplication");
var C = new dm.Matrix(2,2);
C.data[0] = [2, -3];
C.data[1] = [7, 5];
console.log("C = " );
C.print();
// 2 -3
// 7 5
var D = new dm.Matrix(2,2);
D.data[0] = [10, -8];
D.data[1] = [12, -2];
console.log("D = ");
D.print();
//10 -8
//12 -2

var CxD = C.mult(D);
console.log("C x D");
CxD.print();
// -16 -10
// 130 -66