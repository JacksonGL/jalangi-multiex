/**
 * modeled max method
 * @param a
 * @param b
 * @returns {*}
 */
function max(a, b){
    if(a < b){
        return b;
    } else {
        return a;
    }
}

function chunk(list) {
    var chunks = [];
    for(var i=0; i<list.length; i++) {
        if(list.length % 2 == 1 && i+1 == list.length) {
            chunks[chunks.length] = (list[i]);
        } else {
            if(i % 2 == 0) {
                chunks[chunks.length] = (max(list[i], list[i+1])); // model push method
            }
        }
    }

    return chunks;
}

function bubble(list) {
    var remainder = chunk(list),
        heap = [list];

    heap[heap.length] = (remainder);
    while(remainder.length != 1) {
        remainder = chunk(remainder);
        heap[heap.length] = (remainder);
    }

    return heap;
}

function getTopIndex(thing) {
    var currentIndex = 0,
        value = thing[thing.length-1][0],
        i = thing.length -2;

    while(i != -1) {
        if(!thing[i].length % 2 && currentIndex > 0) {
            currentIndex--;
        }

        if(thing[i][currentIndex + 1] == value) {
            currentIndex++;
            currentIndex = i ? currentIndex << 1 : currentIndex;
        } else if(currentIndex) {
            currentIndex = i ? currentIndex << 1 : currentIndex;

        }

        i--;
    }
    return currentIndex;
}

function heapSort(list) {
    var sortedList = [],
        listCopy = list,
        heap = []
    var targetLength = list.length;

    while(sortedList.length != targetLength) {
        heap = bubble(listCopy);
        sortedList[sortedList.length] = (heap[heap.length-1][0]);
        listCopy.splice(getTopIndex(heap), 1);
    }

    return sortedList;
}

//var list = [9,1,7,3,4,2,8,0,5,6];
var list = [];
for(var i=0;i<4;i++){
    list[i] = J$.readInput(1);
}

console.log(heapSort(list));
