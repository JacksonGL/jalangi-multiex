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

var titles = ['data_name', 'algorithm', 'total_time', 
	'bdd_time', 'solver_time', 'within_theory_assign','op_num','multiex_op_num', 
	//'op_num_reexecute', 
	'solver_call_num', 'input_num', 'avg_vs_size', 'max_vs_size', 'min_vs_size',
	'avg_pv_ratio', 'max_pv_ratio', 'min_pv_ratio'];

function createRow() {
	return {
		data_name: null,
		algorithm: null,
		tests_num: null,
		total_time: null,
		bdd_time: null,
		solver_time: null,
		within_theory_assign: null,
		op_num: null,
		multiex_op_num: null,
		//op_num_reexecute: null,
		solver_call_num: null,
		input_num: null,
		avg_vs_size: null,
		max_vs_size: null,
		min_vs_size: null,
		avg_pv_ratio: null,
		max_pv_ratio: null,
		min_pv_ratio: null
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


/*
(1)		[*]calc_parser
(2)		[*]single2
(3)		Tests Generated = 337
(4)		real	1m13.698s
(5)		user	0m53.941s
(6)		sys	0m11.932s
(7)		Time spent in total = 73133 ms
(8)		Time spent in bdd = 35234 ms
(9)		Time spent in solver = 33936 ms
(10)	Number of inputs = 1952
(11)	Number of within theory assignments = 449
(12)	Number of operations = 7525
(12-1)	Number of multiex operations = 962
(13)	Number of solver calls = 1951
(14)	vs-size: average = 216.37861915367483 max = 633 min = 1
(15)	paths to value ratio: average = 7.642980022721954 max = 45.666666666666664 min = 1
(16)	[*]multiple
(17)	Tests Generated = 337
(18)	real	0m11.568s
(19)	user	0m6.255s
(20)	sys	0m2.720s
(21)	Time spent in total = 10994 ms
(22)	Time spent in bdd = 2176 ms
(23)	Time spent in solver = 6279 ms
(24)	Number of inputs = 337
(25)	Number of within theory assignments = 449
(26)	Number of operations = 1783
(26-1)	Number of multiex operations = 962
(27)	Number of solver calls = 336
(28)	vs-size: average = 20.12694877505568 max = 43 min = 1
(29)	paths to value ratio: average = 1 max = 1 min = 1
*/

function process_line(line) {
	var res_array;

	// match (1) (2) (16) and the ending
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

	// match (3) and (17)
	res_array = /Tests Generated = (.*)/.exec(line);
	if(res_array) {
		currentRow.tests_num = res_array[1];
		return ;
	}

	/*
	// match (4) and (18)
	res_array = /real[\s]*((\d+)m)?(\d+(\.\d+)?)s/.exec(line);
	if(res_array) {
		var m = res_array[2];
		var s = res_array[3];
		currentRow.total_time = m*60 + parseFloat(s);
		return ;
	}
	*/

	/**/
	// match (7) and (21)
	res_array = /Time spent in total = (\d+) ms/.exec(line);
	if(res_array) {
		currentRow.total_time = res_array[1];
		return ;
	}
	

	// match (8) and (22)
	res_array = /Time spent in bdd = (\d+) ms/.exec(line);
	if(res_array) {
		currentRow.bdd_time = res_array[1];
		return ;
	}

	// match (9) and (23)
	res_array = /Time spent in solver = (\d+) ms/.exec(line);
	if(res_array) {
		currentRow.solver_time = res_array[1];
		return ;
	}

	/*
	// match (10) and (20)
	res_array = /Number of operations \(inc\. reexecution\) = (\d+)/.exec(line);
	if(res_array) {
		currentRow.op_num_reexecute = res_array[1];
		return ;
	}
	*/

	// match (10) and (24)
	res_array = /Number of inputs = (\d+)/.exec(line);
	if(res_array) {
		currentRow.input_num = res_array[1];
		return ;
	}

	// match (11) and (25)
	res_array = /Number of within theory assignments = (\d+)/.exec(line);
	if(res_array) {
		currentRow.within_theory_assign = res_array[1];
		return ;
	}

	// match (12-1) and (26-1)
	res_array = /Number of multiex operations = (\d+)/.exec(line);
	if(res_array) {
		currentRow.multiex_op_num = res_array[1];
		return ;
	}

	// match (12) and (26)
	res_array = /Number of operations = (\d+)/.exec(line);
	if(res_array) {
		currentRow.op_num = res_array[1];
		return ;
	}

	// match (13) and (27)
	res_array = /Number of solver calls = (\d+)/.exec(line);
	if(res_array) {
		currentRow.solver_call_num = res_array[1];
		return ;
	}

	// match (14) and (28)
	res_array = /vs-size: average = (\d+(\.(\d+))?) max = (\d+) min = (\d+)/.exec(line);
	if(res_array) {
		currentRow.avg_vs_size = res_array[1];
		currentRow.max_vs_size = res_array[4];
		currentRow.min_vs_size = res_array[5];
		return ;
	}

	// match (15) and (29)
	res_array = /paths to value ratio: average = ([^\s]+) max = ([^\s]+) min = ([^\s]+)/.exec(line);
	if(res_array) {
		currentRow.avg_pv_ratio = res_array[1];
		currentRow.max_pv_ratio = res_array[2];
		currentRow.min_pv_ratio = res_array[3];
		return ;
	}
}
