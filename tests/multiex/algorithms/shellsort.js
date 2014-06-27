function compare(a, b) {
    return a - b;
  }

  /**
* Shellsort
*
* Shellsort uses the gaps 701, 301, 132, 57, 23, 10, 4, 1 and uses
* insertion sort to sort the sub-arrays which match for the different gaps.
*/
  var shellSort = (function () {

    var gaps = [701, 301, 132, 57, 23, 10, 4, 1];

    /**
* Shellsort which uses the gaps in the lexical scope of the IIFE.
*
* @public
* @param {array} array Array which should be sorted
* @return {array} Sorted array
*/
    return function (array, cmp) {
      cmp = cmp || compare;

      var gap, current;
      for (var k = 0; k < gaps.length; k += 1) {
        gap = gaps[k];
        for (var i = gap; i < array.length; i += gap) {
          current = array[i];
          for (var j = i;
              j >= gap && cmp(array[j - gap], current) > 0; j -= gap) {
            array[j] = array[j - gap];
          }
          array[j] = current;
        }
      }
      return array;
    };

  }());

//var list = [9,1,7,3,4,2,8,0,5,6];
var list = [];
for(var i=0;i<5;i++){
    list[i] = J$.readInput(1);
}

console.log(shellSort(list));