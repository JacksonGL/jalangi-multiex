/*
 * Copyright (c) 2014, University of California, Berkeley
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 * list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * The views and conclusions contained in the software and documentation are those
 * of the authors and should not be interpreted as representing official policies,
 * either expressed or implied, of the FreeBSD Project.
 */

// Author: Liang Gong

/*
	$ node stat result.txt result.csv
	get parameters from process.argv
	0: node
	1: stat
	2: result.txt
	3: result.csv
*/

var titles = ['data_name', 'algorithm', 'tests_num', 'total_time', 'bdd_time', 'solver_time', 'op_num', 'op_num_reexecute', 'solver_call_num', 'input_num', 'avg_vs_size', 'max_vs_size', 'min_vs_size'];

function createRow() {
	return {
		data_name: null,
		algorithm: null,
		tests_num: null,
		total_time: null,
		bdd_time: null,
		solver_time: null,
		op_num: null,
		op_num_reexecute: null,
		solver_call_num: null,
		input_num: null,
		avg_vs_size: null,
		max_vs_size: null,
		min_vs_size: null,
	};
}

var currentRow = null;
var current_state = 1;

var table = null;
function createTable() {
	table = [];
	table.push(titles.join(','));
}
 
function dumpTableToString() {
	return table.join('\r\n');
}

function appendRow(row) {
	var row_str = '';
	for (var i=0;i<titles.length;i++) {
		row_str += currentRow[titles[i]] + ',';
	}
	table.push(row_str);
}

/*
  # template of output

(1)	[*]find_max
(2)	[*]single2
(3)	Tests Generated = 512
(4)	real	1m38.860s
(5)	user	1m14.651s
(6)	sys	0m17.906s
(7)	Time spent in bdd = 513 ms
(8)	Time spent in solver = 14539 ms
(9)	Number of operations = 2344
(10)	Number of operations (inc. reexecution) = 45568
(11)	Number of solver calls = 511
(12)	[*]multiple
(13)	Tests Generated = 10
(14)	real	0m1.345s
(15)	user	0m0.874s
(16)	sys	0m0.323s
(17)	Time spent in bdd = 32 ms
(18)	Time spent in solver = 637 ms
(19)	Number of operations = 125
(20)	Number of operations (inc. reexecution) = 125
(21)	Number of solver calls = 31
(22)	Number of inputs = 10
(23)	vs-size: average = 1.8823529411764706 max = 10 min = 1
*/

var fs = require('fs'),
    readline = require('readline');
createTable();

// read content from the file
var rd = readline.createInterface({
    input: fs.createReadStream(process.argv[2]),
    output: process.stdout,
    terminal: false
});

// process the content line by line
rd.on('line', function(line) {
    console.log(line);
    process_line(line);
});

function process_line(line) {
	var res_array;

	// match (1) (2) (12) and the ending
	res_array = /\[\*\](.*)/.exec(line);
	if(res_array) {
		if(res_array[1] === 'single2' || res_array[1] === 'multiple') {
			// case (2) and (12)
			if(res_array[1] === 'multiple') {
				if(currentRow) {
					appendRow(currentRow);
				}
				currentRow = createRow();
				current_state = 3; // match multiple
			}
			currentRow.algorithm = res_array[1];
		} else if (res_array[1] === 'exp-done') {
			if(res_array) {
				appendRow(currentRow);
				// dump information to string
		    	var result = dumpTableToString();
		    	var output_file = process.argv[3];
		    	fs.writeFileSync(output_file, result);
		    	console.log();
		    	console.log(result);
			}
		} else {
			// case (1)
			if(currentRow) {
				appendRow(currentRow);
			}
			currentRow = createRow();
			currentRow.data_name = res_array[1];
			current_state = 2; // match single2
		}
		return ;
	}

	// match (3) and (13)
	res_array = /Tests Generated = (.*)/.exec(line);
	if(res_array) {
		currentRow.tests_num = res_array[1];
		return ;
	}

	// match (4) and (14)
	res_array = /real[\s]*((\d+)m)?(\d+(\.\d+)?)s/.exec(line);
	if(res_array) {
		var m = res_array[2];
		var s = res_array[3];
		currentRow.total_time = m*60 + parseFloat(s);
		return ;
	}

	// match (7) and (17)
	res_array = /Time spent in bdd = (\d+) ms/.exec(line);
	if(res_array) {
		currentRow.bdd_time = res_array[1];
		return ;
	}

	// match (8) and (18)
	res_array = /Time spent in solver = (\d+) ms/.exec(line);
	if(res_array) {
		currentRow.solver_time = res_array[1];
		return ;
	}

	// match (9) and (19)
	res_array = /Number of operations = (\d+)/.exec(line);
	if(res_array) {
		currentRow.op_num = res_array[1];
		return ;
	}

	// match (10) and (20)
	res_array = /Number of operations \(inc\. reexecution\) = (\d+)/.exec(line);
	if(res_array) {
		currentRow.op_num_reexecute = res_array[1];
		return ;
	}

	// match (11) and (21)
	res_array = /Number of solver calls = (\d+)/.exec(line);
	if(res_array) {
		currentRow.solver_call_num = res_array[1];
		return ;
	}

	// match (22)
	res_array = /Number of inputs = (\d+)/.exec(line);
	if(res_array) {
		currentRow.input_num = res_array[1];
		return ;
	}

	// match (23)
	res_array = /vs-size: average = (\d+(\.(\d+))?) max = (\d+) min = (\d+)/.exec(line);
	if(res_array) {
		currentRow.avg_vs_size = res_array[1];
		currentRow.max_vs_size = res_array[4];
		currentRow.min_vs_size = res_array[5];
		return ;
	}
}


