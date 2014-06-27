/**
* Finds the maximum sum of subarray's element of given array using the Kadane's algorithm
* It's complexity is O(n). The algorithm can be found here: https://en.wikipedia.org/wiki/Maximum_subarray_problem#Kadane.27s_algorithm
*
* @public
* @param {array} array Input array
* @returns {number} max The maximum sum of the elements of subarray of the input
*
*/

function findMax(a,b){
	if(a > b) {
		return a;
	} else {
		return b;
	}
}
function maxSubarray(array) {
    var currentMax = 0,
        max = 0;

    for (var i = 0; i < array.length; i += 1) {
        currentMax = findMax(0, currentMax + array[i]);
        max = findMax(max, currentMax);
    }

    return max;
}

//var list = [9,1,7,3,4,2,8,0,5,6];

var list = [];
var len = 5;
for(var i=0;i<len;i++){
    list[i] = J$.readInput(1);
}

maxSubarray(list);