// copied from https://github.com/adlawson/bfs-js/blob/master/bfs.js

function visit(frontier, graph, fn) {
    var level = 0;
    var levels = {};

    while (0 < frontier.length) {
        var next = [];
        for (var i = 0; i < frontier.length; i++) {
            var node = frontier[i];
            fn(node);
            levels[node] = level;
            for (var adj in graph[node]) {
                if (typeof levels[adj] === 'undefined') {
                    next[next.length] = (adj);
                }
            }
        }
        frontier = next;
        level += 1;
    }
}

function bfs(node, graph, fn) {
    visit([node], graph, fn);
}

var graph = {
    "1": {},
    "2": {},
    "3": {},
    "4": {},
    "5": {},
    "6": {},
    "7": {},
    "8": {},
    "9": {},
    "10": {},
    "11": {},
    "12": {}
};

var list = [];
for(var i=0;i<20;i++){
    list[list.length] = [J$.readInput(1)%12, J$.readInput(2)%12];
    var edge = list[list.length-1];
    graph[edge[0]][edge[1]] = graph[edge[1]];
    graph[edge[1]][edge[0]] = graph[edge[0]];
}

var visited = [];
bfs(1, graph, function (n) {
    visited[visited.length] = (n);
});

console.log(visited);