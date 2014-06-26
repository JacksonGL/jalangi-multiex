
/*********************
 *	Linked List
 *********************/

function LinkedList() {
    var count = 0;
    var head = null;

    this.GetCount = function() {
        return count;
    }
    //Returns an array with the data or if empty it returns null
    this.DisplayAll = function() {
        if (head === null) {
            return null;
        } else {
            var arr = new Array();
            var current = head;
            for (var i = 0; i < count; i++) {
                arr[i] = current.data;
                current = current.next;
            }
            return arr;
        }
    }
    //display at a specific index or if out of bounds it return null
    this.DisplayAt = function(index) {
        //check for out-of-bounds values
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
            next : head
        };

        head = node;

        count++;
    }
    //Adds an item to the list at the specified position
    this.Add = function(data, index) {
        if (index === 0) {
            this.AddFirst(data);
        }
        //check for out-of-bounds values
        else if (index > -1 && index < count) {

            var node = {
                data : data,
                next : null
            };

            var previous;
            var current = head;
            var i = 0;

            //find the right location
            while (i++ < index) {
                previous = current;
                current = current.next;
            }

            previous.next = node;
            node.next = current;

            count++;
        } else {
            alert("out of range");
        }
    }
    //Removes the first item
    this.RemoveFirst = function() {
        if (head === null) {
            return null;
        } else {
            var out = head;
            head = head.next;

            if (count > 0) {
                count--;
            }

            return out.data;
        }
    }
    //Removes from a specific index
    this.RemoveAt = function(index) {

        if (index === 0) {
            return this.RemoveFirst(index);
        }
        //check for out-of-bounds values
        else if (index > -1 && index < count) {

            var current = head;
            var previous;
            var i = 0;

            //find the right location
            while (i++ < index) {
                previous = current;
                current = current.next;
            }

            //skip over the item to remove
            previous.next = current.next;

            //decrement the length
            count--;
        } else {
            return null;
        }

        //return the value
        return current.data;
    }
}


var list = new LinkedList();

list.AddFirst('data1');
list.AddFirst('data2');
list.AddFirst('data3');
list.AddFirst('data4');
list.AddFirst('data5');
list.AddFirst('data6');
list.AddFirst('data7');


for(var i=0;i<3;i++){
    list.RemoveAt(J$.readInput(1));
}