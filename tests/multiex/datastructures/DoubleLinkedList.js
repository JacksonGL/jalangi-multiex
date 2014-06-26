/***********************
 *	Doubly linked list
 ***********************/


function DoublyLinkedList() {
    var count = 0;
    var head = null;
    var tail = null;

    //Allows to view the value stored on Head
    this.getHead = function() {
        if (head) {
            return head.data;
        }

        return null;
    }
    //Allows to view the value stored on Tail
    this.getTail = function() {
        if (tail) {
            return tail.data;
        }
        return null;
    }
    //Returns the number of items
    this.GetCount = function() {
        return count;
    }
    //Returns an array with the data from head to tail or if empty it returns null
    this.DisplayAll = function() {
        if (head != null) {
            var arr = new Array();
            var current = head;
            for (var i = 0; i < count; i++) {
                arr[i] = current.data;
                current = current.next;
            }
            return arr;
        } else {
            return null;
        }
    }
    //Returns an array with the data from tail to head or if empty it returns null
    this.DisplayAllBackwards = function() {
        if (head != null) {
            var arr = new Array();
            var current = tail;
            for (var i = 0; i < count; i++) {
                arr[i] = current.data;
                current = current.previous;
            }
            return arr;
        } else {
            return null;
        }
    }
    //display at a specific index or if out of bounds it return null
    this.DisplayAt = function(index) {

        if (index > -1 && index < count) {
            var current = head;
            var i = 0;

            while (i++ < index) {
                current = current.next;
            }

            return current.data;
        } else {
            return null;
        }
    }
    //Adds to the front of the list
    this.AddFirst = function(data) {
        //creates a new node
        var node = {
            data : data,
            next : head,
            previous : null
        };

        head = node;

        //if the list was empty
        if (count === 0) {
            tail = head;
        } else {
            head.next.previous = head;
        }

        count++;
    }
    //Adds to the end of the list
    this.AddLast = function(data) {
        var node = {
            data : data,
            next : null,
            previous : tail
        }

        if (count === 0) {
            head = node;
        } else {
            tail.next = node;
        }

        tail = node;

        count++;
    }
    //Adds an item to the list at the specified position
    this.Add = function(data, index) {
        //check for out-of-bounds values
        if (index > 0 && index < count) {

            var node = {
                data : data,
                next : null,
                previous : null
            };

            var current = head;
            var i = 0;

            //find the right location
            while (i++ < index) {
                current = current.next;
            }

            current.previous.next = node;
            node.next = current;
            node.previous = current.previous;
            current.previous = node;

            count++;
        } else if (index < 1) {
            this.AddFirst(data);
        } else {
            this.AddLast(data);
        }
    }
    //Removes the first item
    this.RemoveFirst = function() {
        if (head != null) {

            head = head.next;
            count--;

            if (count === 0) {
                tail = null;

            } else {
                head.previous = null;

            }
        }
    }
    //Removes the first item
    this.RemoveLast = function() {
        if (head != null) {
            if (count == 1) {
                head = null;
                tail = null;
            } else {
                tail.previous.next = null;
                tail = tail.previous;
            }

            count--;
        }
    }
    //Removes from a specific index
    this.RemoveAt = function(index) {

        //check for out-of-bounds values
        if (index > 0 && index < count - 1) {

            var current = head;
            var i = 0;

            //find the right location
            while (i++ < index) {
                current = current.next;
            }

            current.previous.next = current.next;
            current.next.previous = current.previous;

            count--;
        } else if (index < 1) {
            this.RemoveFirst();
        } else {
            this.RemoveLast();
        }
    }
}


var list = new DoublyLinkedList();
function testRound() {
    var flag = J$.readInput(1);
    if(flag === 1){
        list.AddFirst('data');
    } else if (flag === 2) {
        list.AddLast('data');
    } else if (flag === 3) {
        list.RemoveFirst();
    } else if (flag === 4){
        list.RemoveLast();
    } else {
        list.RemoveAt(J$.readInput(1));
    }
}

testRound();
testRound();
testRound();