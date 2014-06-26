// code copied from the following website:
// https://gist.github.com/paullewis/1982121

/**
 * An implementation for Mergesort. Less efficient
 * than Quicksort. Again, you'd just use Array.sort
 * but if you found yourself unable to use that
 * there's always this option.
 *
 * Tests with:
 *
 * var array = [];
 * for(var i = 0; i < 20; i++) {
 * array.push(Math.round(Math.random() * 100));
 * }
 *
 * Mergesort.sort(array);
 *
 */
var Mergesort = (function () {
    /**
     * Sorts the array by breaking it down
     * into smaller chunks.
     *
     * @param {Array} array The array to sort
     */
    function sort(array) {
        var length = array.length,
            mid = Math.floor(length * 0.5),
            left = [],
            right = [];
        for(var i=0;i<mid;i++){
            left[i] = array[i];
        }
        for(var i=mid;i<array.length;i++){  // model array slice
            right[i-mid] = array[i];
        }
        if (length === 1) {  // model array slice
            return array;
        }
        return merge(sort(left), sort(right));
    }

    /**
     * Merges two sublists back together.
     * Shift either left or right onto
     * the result depending on which is
     * lower (assuming both exist), and simply
     * pushes on a list if the other doesn't
     * exist.
     *
     * @param {Array} left The left hand sublist
     * @param {Array} right The right hand sublist
     */
    function merge(left, right) {
        var result = [];
        while (left.length || right.length) {
            if (left.length && right.length) {
                if (left[0] < right[0]) {
                     result[result.length] = shiftArray(left);
                } else {
                    result[result.length] = shiftArray(right);
                }
            } else if (left.length) {
                result[result.length] = shiftArray(left);
            } else {
                result[result.length] = shiftArray(right);
            }
        }
        return result;
    }

    /**
     * array.shift method modeled by Liang Gong
     * @param array
     * @returns {undefined}
     */
    function shiftArray(array){
        var result = undefined;
        if(array.length>0){
            result = array[0];
            for(var i=1;i<array.length;i++){
                array[i-1] = array[i];
            }
            array.length = array.length - 1;
        }
        return result;
    }
    return {sort : sort};
})();

var N = 4, i;
var array = [];

for (i = 0; i < N; i++) {
    array[i] = J$.readInput(1);
}
var array = Mergesort.sort(array);
console.log(JSON.stringify(array));
