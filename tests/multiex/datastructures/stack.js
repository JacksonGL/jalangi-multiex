/*****************
 *		Stack
 ******************/

function Stack() {
    var top = null;
    var count = 0;

    //Returns the number of items in the queue
    this.GetCount = function() {
        return count;
    }
    //Pushes the specified data into the Stack
    this.Push = function(data) {
        var node = {
            data : data,
            next : null
        };

        node.next = top;
        top = node;

        count++;
    }
    //Pops out data from the stack, returns null if stack is empty
    this.Pop = function() {
        if (top === null) {
            return null;
        } else {
            var out = top;
            top = top.next;

            if (count > 0) {
                count--;
            }

            return out.data;
        }
    }
    //Peeks at the item from the top of the stack
    this.Peek = function() {
        if (top === null) {
            return null;
        } else {
            return top.data;
        }
    }
    //Display all data from the stack
    this.DisplayAll = function() {
        if (top === null) {
            return null;
        } else {
            var arr = new Array();
            var current = top;

            for (var i = 0; i < count; i++) {
                arr[i] = current.data;
                current = current.next;
            }

            return arr;
        }
    }
}


var stack = new Stack();


function testRound(){
    var input = J$.readInput(1);
    if(input > 10){
        stack.Push(J$.readInput(2));
    } else if (input > 9){
        stack.Pop();
    } else {
        stack.Peek();
    }
}
testRound();
testRound();
testRound();
testRound();
testRound();