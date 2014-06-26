
/*************************************
 Deque - linked List
 *************************************/

function Deque() {
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
    //Defines a node
    var Node = function(data) {
        this.data = data;
        this.next = null;
    }
    //Returns an array with the data from head to tail or if empty it returns null
    this.DisplayHeadToTail = function() {
        if (head != null) {
            var arr = new Array();
            var current = head;

            while (current) {
                arr.push(current.data);
                current = current.next;
            }

            return arr;
        } else {
            return null;
        }
    }
    //Returns an array with the data from tail to head or if empty it returns null
    this.DisplayTailToHead = function() {
        if (head != null) {
            //call DisplayHeadToTail() and reverse it.
            var arr = this.DisplayHeadToTail();
            return arr.reverse();
        } else {
            return null;
        }
    }
    //Adds to the front of the list
    this.AddHead = function(data) {

        var node = new Node(data);
        node.next = head;
        head = node;

        //if the list was empty
        if (!tail) {
            tail = head;
        }

        count++;
    }
    //Adds to the end of the list
    this.AddTail = function(data) {
        var node = new Node(data);

        if (!head) {
            head = node;
        } else {
            tail.next = node;
        }

        tail = node;
        count++;
    }
    //Removes the first item
    this.RemoveHead = function() {
        if (head) {
            //If it's the last item
            if (count === 1) {
                head = null;
                tail = null;
            } else {
                head = head.next;
            }

            count--;
        }
    }
    //Removes the first item
    this.RemoveTail = function() {
        if (head) {
            //If it's the last item
            if (count === 1) {
                head = null;
                tail = null;
            } else {
                var current = head;

                while (current.next.next) {
                    current = current.next;
                }

                tail = current;
                tail.next = null;

            }

            count--;
        }
    }
}

var list = new Deque();
function f(){
    var flag = J$.readInput(1);
    if(flag === 1){
        list.AddHead('data');
    } else if (flag === 3) {
        list.RemoveHead();
    }
}

f();
f();
f();
f();