//Knapsack algorithm
//==================
// wikipedia: [Knapsack (0/1)](http://en.wikipedia.org/wiki/Knapsack_problem#0.2F1_Knapsack_Problem)
// Given a set `[{weight:Number, benefit:Number}]` and a capacity,
// find the maximum value possible while keeping the weight below
// or equal to the capacity
// **params**:
// `capacity` : Number,
// `items` : [{w:Number, b:Number}]
// **returns**:
// An object containing `maxValue` and `set`

var boxes = [
    {id: "A", w: 12, b: 4},
    {id: "B", w: 2, b: 2},
    {id: "C", w: 1, b: 1},
    {id: "D", w: 4, b: 10},
    {id: "E", w: 1, b: 2}
];

boxes[0].w = J$.readInput(1);
boxes[0].b = J$.readInput(1);
boxes[1].w = J$.readInput(1);
boxes[1].b = J$.readInput(1);
boxes[2].w = J$.readInput(1);
boxes[2].b = J$.readInput(1);
boxes[3].w = J$.readInput(1);
boxes[3].b = J$.readInput(1);
boxes[4].w = J$.readInput(1);
boxes[4].b = J$.readInput(1);

var capacity = J$.readInput(10);
knapsack(boxes, capacity);

function knapsack(items, capacity) {
    var idxItem = 0,
        idxWeight = 0,
        oldMax = 0,
        newMax = 0,
        numItems = items.length,
        weightMatrix = new Array(numItems + 1),
        keepMatrix = new Array(numItems + 1),
        solutionSet = [];

// Setup matrices
    for (idxItem = 0; idxItem < numItems + 1; idxItem++) {
        weightMatrix[idxItem] = new Array(capacity + 1);
        keepMatrix[idxItem] = new Array(capacity + 1);
    }

// Build weightMatrix from [0][0] -> [numItems-1][capacity-1]
    for (idxItem = 0; idxItem <= numItems; idxItem++) {
        for (idxWeight = 0; idxWeight <= capacity; idxWeight++) {

// Fill top row and left column with zeros
            if (idxItem === 0 || idxWeight === 0) {
                weightMatrix[idxItem][idxWeight] = 0;
            }

// If item will fit, decide if there's greater value in keeping it,
// or leaving it
            else if (items[idxItem - 1].w <= idxWeight) {
                newMax = items[idxItem - 1].b + weightMatrix[idxItem - 1][idxWeight - items[idxItem - 1].w];
                oldMax = weightMatrix[idxItem - 1][idxWeight];

// Update the matrices
                if (newMax > oldMax) {
                    weightMatrix[idxItem][idxWeight] = newMax;
                    keepMatrix[idxItem][idxWeight] = 1;
                }
                else {
                    weightMatrix[idxItem][idxWeight] = oldMax;
                    keepMatrix[idxItem][idxWeight] = 0;
                }
            }

// Else, item can't fit; value and weight are the same as before
            else {
                weightMatrix[idxItem][idxWeight] = weightMatrix[idxItem - 1][idxWeight];
            }
        }
    }

// Traverse through keepMatrix ([numItems][capacity] -> [1][?])
// to create solutionSet
    idxWeight = capacity;
    idxItem = numItems;
    for (idxItem; idxItem > 0; idxItem--) {
        if (keepMatrix[idxItem][idxWeight] === 1) {
            solutionSet[solutionSet.length] = (items[idxItem - 1]);
            idxWeight = idxWeight - items[idxItem - 1].w;
        }
    }
    return {"maxValue": weightMatrix[numItems][capacity], "set": solutionSet};
}