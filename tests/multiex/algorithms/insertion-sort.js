function compare(a, b) {
    return a - b;
  }

  /**
* Insertionsort algorithm. It's complexity is O(n^2).
*
* @public
* @param {array} array Input array
* @returns {array} array Sorted array
*/
  function insertionSort(array, cmp) {
    cmp = cmp || compare;
    var current,
        j;
    for (var i = 1; i < array.length; i += 1) {
      current = array[i];
      j = i - 1;
      while (j >= 0 && cmp(array[j], current) > 0) {
        array[j + 1] = array[j];
        j -= 1;
      }
      array[j + 1] = current;
    }
    return array;
  }


//var list = [9,1,7,3,4,2,8,0,5,6];
var list = [];
for(var i=0;i<5;i++){
    list[i] = J$.readInput(1);
}

console.log(insertionSort(list));