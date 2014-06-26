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


var fs = require('fs');
var childProcess = require('child_process');

var curDir = process.cwd();
var algorithms = [curDir + '/src/js/analyses/puresymbolic/Single2', curDir + '/src/js/analyses/puresymbolic/Multiple'];


var expList = [];
//expList.push('tests/multiex/algorithms/mergeSort');


//expList.push('tests/multiex/datastructures/math-cordic');


expList.push('tests/compos/qsort');
expList.push('tests/compos/findMax');
expList.push('tests/compos/redblack');

//expList.push('tests/compos/indexOfFull'); // Single2 runs very long time
//expList.push('tests/compos/bst');
expList.push('tests/compos/parser');
expList.push('tests/compos/parser2');

//expList.push('tests/multiex/datastructures/treap');
expList.push('tests/multiex/algorithms/Kruskal');
expList.push('tests/multiex/datastructures/PriorityQueue');
expList.push('tests/multiex/datastructures/Queue');

//expList.push('tests/multiex/numeric_compareAbs');
expList.push('tests/multiex/datastructures/Queue');
expList.push('tests/multiex/datastructures/stack');
//expList.push('tests/multiex/datastructures/LinkedList');

expList.push('tests/multiex/datastructures/Deque_linkedList');
expList.push('tests/multiex/datastructures/DoubleLinkedList');
//expList.push('tests/multiex/algorithms/mergeSort'); // Multiple runs forever
expList.push('tests/multiex/algorithms/heapSort');
//expList.push('tests/multiex/datastructures/splay'); // runs forever


var curDataIndex = 0;
var curAlgorithmIndex = 0;
var cmd = 'python';
var args = 'src/python/jalangi_command.py symbolic -a `pwd`/src/js/analyses/puresymbolic/Algorithm -i 100000 Data'.split(' ');

var resultDB = {};

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

var exp_evn = clone(process.env);

run_next_exp();

function reset_exp_config(){
    exp_evn['OUTPUT_COUNT_THREASHOLD'] = 1200000;
}


function run_next_exp(){
    if(curAlgorithmIndex >= algorithms.length){
        curDataIndex++;
        curAlgorithmIndex = 0;
    }

    var content = convert_result_to_table();
    console.log(content);

    if(curDataIndex >= expList.length){
        // experiment done, convert db into table
        fs.writeFileSync('./result.csv', content);
        return ;
    }

    var curData = expList[curDataIndex];
    var curAlgorithm = algorithms[curAlgorithmIndex];

    console.log('running ' + curAlgorithm +' on ' + curData);
    args[3] = curAlgorithm;
    args[6] = curData;

    if(curAlgorithm.indexOf('Multiple')>=0) {
        args[5] = '1';
    } else {
        args[5] = '100000000';
    }



    console.log('\t' + cmd + ' ' + args.join(' '));

    exp_config(curAlgorithm, curData, exp_evn);

    var cp = childProcess.spawn(cmd, args, {env: exp_evn});

    var ops = null, time = null, path = null, SMTTime = null, numSMTCalls = null, symSize = null;
    var binaryOpTime = null, unaryOpTime = null;

    cp.stdout.on('data', function (data) {
        data = data.toString('utf8');
        //console.log(data);
        if(data.indexOf('[*]') >= 0){
            // intercept final output
            // use regular expression to carve out the time and paths
            // sample output:
            // [*] Num Operations: 3000
            // [*] Time used: 123s
            // [*] Tests Generated: 12
            var result = data.match(/\[[*]\][ ]Num[ ]Operations[:][ ]([\d\.]+)/);
            if(result !== null){
                ops = result[1];
                console.log('ops: ' + ops);
            }

            result = data.match(/\[[*]\][ ]Time[ ]used[:][ ]([\d\.]+)s/);
            if(result !== null){
                time = result[1];
                console.log('time: ' + time);
            }

            result = data.match(/\[[*]\][ ]Tests[ ]Generated[:][ ](\d+([\.]\d+)?)/);
            if(result !== null){
                path = result[1];
                console.log('path: ' + path);
            }

            result = data.match(/\[[*]\][ ]SMT[ ]Time[:][ ](\d+([\.]\d+)?)/);
            if(result !== null){
                SMTTime = result[1];
                console.log('SMT Time: ' + SMTTime);
            }

            result = data.match(/\[[*]\][ ]SMT[ ]Calls[:][ ](\d+([\.]\d+)?)/);
            if(result !== null){
                numSMTCalls = result[1];
                console.log('SMT Calls: ' + numSMTCalls);
            }

            result = data.match(/\[[*]\][ ]Symbolic[ ]Size[:][ ](\d+([\.]\d+)?)/);
            if(result !== null){
                symSize = result[1];
                console.log('Symbolic Size: ' + symSize);
            }

            result = data.match(/\[[*]\][ ]BOps[ ]Time[:][ ](\d+([\.]\d+)?)/);
            if(result !== null){
                binaryOpTime = result[1];
                console.log('Binary Operation Time: ' + binaryOpTime);
            }

            result = data.match(/\[[*]\][ ]UOps[ ]Time[:][ ](\d+([\.]\d+)?)/);
            if(result !== null){
                unaryOpTime = result[1];
                console.log('UOps Time: ' + unaryOpTime);
            }


            if(ops!== null && time !== null && path !== null){
                // record result
                record_result(curAlgorithm, curData, time, path, ops, SMTTime, numSMTCalls, symSize, binaryOpTime, unaryOpTime);

                // reset exp configuration
                reset_exp_config();

                curAlgorithmIndex++;
                run_next_exp();
            }
        }
    });

    cp.stderr.on('data', function (data) {
        console.log(data = data.toString('utf8'));
        //process.exit();
    });
}

function exp_config(curAlgorithm, curData, exp_evn) {
    if(curAlgorithm.indexOf('Single2') >= 0 && curData.indexOf('/treap') >= 0) {
        exp_evn['OUTPUT_COUNT_THREASHOLD'] = 2;
    } else if(curAlgorithm.indexOf('Multiple') >= 0 && curData.indexOf('/treap') >= 0) {
        exp_evn['OUTPUT_COUNT_THREASHOLD'] = 5;
    } else if(curData.indexOf('/math-cordic') >= 0) {
        exp_evn['OUTPUT_COUNT_THREASHOLD'] = 40;
    }
}

function record_result(curAlgorithm, curData, time, path, ops, SMTTime, numSMTCalls, symSize, binaryOpTime, unaryOpTime){
    if(!resultDB[curData]) {
        resultDB[curData] = {};
    }

    if(!resultDB[curData][curAlgorithm]){
        resultDB[curData][curAlgorithm] = {};
    }

    resultDB[curData][curAlgorithm].time = time;
    resultDB[curData][curAlgorithm].path = path;
    resultDB[curData][curAlgorithm].ops = ops;
    resultDB[curData][curAlgorithm].SMTTime = SMTTime;
    resultDB[curData][curAlgorithm].numSMTCalls = numSMTCalls;
    resultDB[curData][curAlgorithm].symSize = symSize;
    resultDB[curData][curAlgorithm].binaryOpTime = binaryOpTime;
    resultDB[curData][curAlgorithm].unaryOpTime = unaryOpTime;
}


function convert_result_to_table(){
    var lines = [];
    lines.push('data, algorithm, time, ops, paths, SMT_time, num_SMT_calls, sym_size, binary_op_time, unary_op_time');
    for(var data in resultDB){
        if(resultDB.hasOwnProperty(data)) {
            for(alg in resultDB[data]) {
                if(resultDB[data].hasOwnProperty(alg)) {
                    var line = [];
                    line.push(data);
                    line.push(alg);
                    line.push(resultDB[data][alg].time);
                    line.push(resultDB[data][alg].ops);
                    line.push(resultDB[data][alg].path);
                    line.push(resultDB[data][alg].SMTTime);
                    line.push(resultDB[data][alg].numSMTCalls);
                    line.push(resultDB[data][alg].symSize);
                    line.push(resultDB[data][alg].binaryOpTime);
                    line.push(resultDB[data][alg].unaryOpTime);
                    lines.push(line.join(','));
                }
            }
        }
    }
    var content = lines.join('\n');
    console.log('final result : ');
    console.log(content);

    return content;
}


// slow list:
//expList.push('tests/multiex/algorithm/knapsack');
//expList.push('tests/multiex/algorithm/dynamicProgramming');
//expList.push('tests/multiex/datastructures/AVLTree');
//expList.push('tests/multiex/algorithms/Prim');
//expList.push('tests/multiex/datastructures/B_plus_tree');
//expList.push('tests/multiex/algorithms/Prim');
//expList.push('tests/multiex/machinelearning/knn');