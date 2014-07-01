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

/**/
var titles = ['data_name', 'algorithm', 
	'total_time', 'total_time_count',
	'bdd_time', 'bdd_time_count', 
	'solver_time', 'solver_time_count', 
	'within_theory_assign', 'outside_theory_assign',
	'op_num','multiex_op_num', 
	//'op_num_reexecute', 
	'solver_call_num', 'sat_num', 'unsat_num',
	'dse_input_num', 'multiex_input_num', 
	'solver_cache_hit_num', 
	'avg_vs_size', 'max_vs_size', 'min_vs_size',
	'avg_pv_ratio', 'max_pv_ratio', 'min_pv_ratio',
	'speedup'];

var titles_full = ['dataset', 'algorithm', 
	'Time spent in total (ms)', 'Time spent in total (count)', 
	'Time spent in bdd (ms)', 'Time spent in bdd (count)',
	'Time spent in solver (ms)', 'Time spent in solver (count)', 
	'Number of within theory assignments', 'Number of outside theory assignments',
	'Number of operations', 'Number of multiex operations', 
	'Number of solver calls', 'Number of sat', 'Number of unsat',
	'Nunber of DSE inputs', 'Number of MULTIEX inputs', 
	'Number of solver cache hit', 
	'average value summary size', 'maximum value summary size', 'minimum value summary size', 
	'average paths to value ratio', 'maximum paths to value ratio', 'minimum paths to value ratio', 
	'DSE/Multiex total time speedup'];


/*
var titles_full = ['Name', 'Algorithm', 'Total Time (ms)', 'BDD Time (ms)',
	'Solver Time (ms)', '\\# within Theory Assign', '\\# outside Theory Assign',
	'\\# Operations', '\\# \\tool{} Operations', '\\# Solver Calls',
	'\\# \\tool{} Inputs',
	'Avg Value Summary Size', 'Max Value Summary Size', 'Min Value Summary Size',
	'Avg Paths to Value Ratio', 'Max Paths to Value Ratio', 'Min Paths to Value Ratio', 'Total Time Speedup'];
*/

function createRow() {
	return {
		data_name: null,
		algorithm: null,
		//tests_num: null,
		total_time: null,
		bdd_time: null,
		solver_time: null,
		within_theory_assign: null,
		outside_theory_assign: null,
		op_num: null,
		multiex_op_num: null,
		//op_num_reexecute: null,
		solver_call_num: null,
		dse_input_num: null,
		multiex_input_num: null,
		avg_vs_size: null,
		max_vs_size: null,
		min_vs_size: null,
		avg_pv_ratio: null,
		max_pv_ratio: null,
		min_pv_ratio: null,
		speedup: null,
		total_time_count: null,
		bdd_time_count: null,
		solver_time_count: null,
		sat_num: null,
		unsat_num: null,
		solver_cache_hit_num: null
	};
}

var currentRow = null;
var current_state = 1;

var table = null;
function createTable() {
	table = [];
	table.push(titles_full.join(','));
}
 
function dumpTableToString() {
	return table.join('\r\n');
}

var count = 0;
var lastTotalTime = 0;

function formatCell(value) {
	var val = parseFloat(value);
	if(isNaN(val)) {
		/*if(value === null) {
			return '$\\varnothing$';
		}*/
		return value;
	}

	val = parseInt(val*100);
	val /= 100;
	return val;
}

function appendRow(row) {
	count++;
	if(count%2==0) { // appending the multiple results
		currentRow.speedup = lastTotalTime/currentRow.total_time;
	} else { // appending the DSE results
		// the speedup should be ("DSE Total Time" - "DSE BDD Time") / "Multiex Total Time"
		lastTotalTime = currentRow.total_time - currentRow.bdd_time;
	}
	var row_str = '';
	for (var i=0;i<titles.length;i++) {
		var value = formatCell(currentRow[titles[i]]);
		row_str += value + ',';
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
    //console.log(line);
    process_line(line);
});


/*
(1)		[*]Find Max
(2)		[*]single2
(3)		Tests Generated = 1
(4)		real	1m21.615s
(5)		user	1m3.319s
(6)		sys	0m11.525s
(7)		Time spent in bdd = 30465 ms (count = 6840632)
(8)		Time spent in total = 80235 ms (count = 2)
(9)		Time spent in solver = 48619 ms (count = 2044)
(10)	Number of multiex operations = 416
(11)	Number of operations = 17646
(12)	Number of within theory assignments = 102
(12-1)	Number of outside theory assignments = 4578
(13)	Number of solver calls = 2044
(14)	Number of sat = 2044
(14-1)	Number of unsat = 50
(15)	Number of MULTIEX inputs = 20
(15-1)	Number of solver cache hit = 4
(16)	Number of DSE inputs = 1024
(17)	vs-size: average = 40.72549019607843 max = 512 min = 1
(18)	paths to value ratio: average = 22.9932150638033 max = 512 min = 1
(19)	[*]multiple
(20)	Tests Generated = 1
(21)	real	0m5.652s
(22)	user	0m3.987s
(23)	sys	0m1.089s
(24)	Time spent in bdd = 56 ms (count = 2212)
(25)	Time spent in total = 5051 ms (count = 2)
(26)	Time spent in solver = 4924 ms (count = 180)
(27)	Number of multiex operations = 416
(28)	Number of operations = 614
(29)	Number of within theory assignments = 102
(29-1)	Number of outside theory assignments = 4578
(30)	Number of solver calls = 180
(31)	Number of sat = 180
(31-1)	Number of unsat = 50
(32)	Number of MULTIEX inputs = 20
(32-1)	Number of solver cache hit = 4
(33)	Number of DSE inputs = 2
(34)	vs-size: average = 1.8823529411764706 max = 10 min = 1
(35)	paths to value ratio: average = 1 max = 1 min = 1
*/


function process_line(line) {
	var res_array;

	// match (1) (2) (19) and the ending
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

	// match (3) and (20)
	res_array = /Tests Generated = (.*)/.exec(line);
	if(res_array) {
		currentRow.tests_num = res_array[1];
		return ;
	}

	res_array = /real[\s]*((\d+)m)?(\d+(\.\d+)?)s/.exec(line);
	if(res_array) {
		//var m = res_array[2];
		//var s = res_array[3];
		//currentRow.total_time = m*60 + parseFloat(s);
		return ;
	}

	res_array = /sys[\s]*((\d+)m)?(\d+(\.\d+)?)s/.exec(line);
	if(res_array) {
		//var m = res_array[2];
		//var s = res_array[3];
		//currentRow.total_time = m*60 + parseFloat(s);
		return ;
	}

	res_array = /user[\s]*((\d+)m)?(\d+(\.\d+)?)s/.exec(line);
	if(res_array) {
		//var m = res_array[2];
		//var s = res_array[3];
		//currentRow.total_time = m*60 + parseFloat(s);
		return ;
	}

	/**/
	// match (8) and (25)
	res_array = /Time spent in total = (\d+) ms \(count = (\d+)\)/.exec(line);
	if(res_array) {
		currentRow.total_time = res_array[1];
		currentRow.total_time_count = res_array[2];
		return ;
	}
	

	// match (7) and (24)
	res_array = /Time spent in bdd = (\d+) ms \(count = (\d+)\)/.exec(line);
	if(res_array) {
		currentRow.bdd_time = res_array[1];
		currentRow.bdd_time_count = res_array[2];
		return ;
	}

	// match (9) and (26)
	res_array = /Time spent in solver = (\d+) ms \(count = (\d+)\)/.exec(line);
	if(res_array) {
		currentRow.solver_time = res_array[1];
		currentRow.solver_time_count = res_array[2];
		return ;
	}

	// match (10) and (27)
	res_array = /Number of multiex operations = (\d+)/.exec(line);
	if(res_array) {
		currentRow.multiex_op_num = res_array[1];
		return ;
	}

	// match (11) and (28)
	res_array = /Number of operations = (\d+)/.exec(line);
	if(res_array) {
		currentRow.op_num = res_array[1];
		return ;
	}

	// match (12) and (29)
	res_array = /Number of within theory assignments = (\d+)/.exec(line);
	if(res_array) {
		currentRow.within_theory_assign = res_array[1];
		return ;
	}

	// match (12-1) and (29-1)
	res_array = /Number of outside theory assignments = (\d+)/.exec(line);
	if(res_array) {
		currentRow.outside_theory_assign = res_array[1];
		return ;
	}

	// match (13) and (27)
	res_array = /Number of solver calls = (\d+)/.exec(line);
	if(res_array) {
		currentRow.solver_call_num = res_array[1];
		return ;
	}

	// match (14) and (31)
	res_array = /Number of sat = (\d+)/.exec(line);
	if(res_array) {
		currentRow.sat_num = res_array[1];
		return ;
	}

	// match (14-1) and (31-1)
	res_array = /Number of unsat = (\d+)/.exec(line);
	if(res_array) {
		currentRow.unsat_num = res_array[1];
		return ;
	}

	// match (15) and (33)
	res_array = /Number of MULTIEX inputs = (\d+)/.exec(line);
	if(res_array) {
		currentRow.multiex_input_num = res_array[1];
		return ;
	}

	// match (15-1) and (33-1)
	res_array = /Number of solver cache hit = (\d+)/.exec(line);
	if(res_array) {
		currentRow.solver_cache_hit_num = res_array[1];
		return ;
	}

	// match (16) and (34)
	res_array = /Number of DSE inputs = (\d+)/.exec(line);
	if(res_array) {
		currentRow.dse_input_num = res_array[1];
		return ;
	}

	// match (17) and (34)
	res_array = /vs-size: average = ([^\s]+) max = (\d+) min = (\d+)/.exec(line);
	if(res_array) {
		currentRow.avg_vs_size = res_array[1];
		currentRow.max_vs_size = res_array[2];
		currentRow.min_vs_size = res_array[3];
		return ;
	}

	// match (18) and (35)
	res_array = /paths to value ratio: average = ([^\s]+) max = ([^\s]+) min = ([^\s]+)/.exec(line);
	if(res_array) {
		currentRow.avg_pv_ratio = res_array[1];
		currentRow.max_pv_ratio = res_array[2];
		currentRow.min_pv_ratio = res_array[3];
		return ;
	}

	console.log(' **** unmatched line ****');
	console.log(line);
}
