#!/bin/bash

#
# Copyright (c) 2014, University of California, Berkeley
# All rights reserved.
#
# Redistribution and use in source and binary forms, with or without
# modification, are permitted provided that the following conditions are met:
#
# 1. Redistributions of source code must retain the above copyright notice, this
# list of conditions and the following disclaimer.
# 2. Redistributions in binary form must reproduce the above copyright notice,
# this list of conditions and the following disclaimer in the documentation
# and/or other materials provided with the distribution.
#
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
# ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
# WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
# DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
# ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
# (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
# LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
# ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
# (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
# SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
#
# The views and conclusions contained in the software and documentation are those
# of the authors and should not be interpreted as representing official policies,
# either expressed or implied, of the FreeBSD Project.
#

# author: Liang Gong

# back up the preivous results
rm result.bak.txt;
mv result.txt result.bak.txt;

# f arg1 arg2 arg3
# arg1 -> name of dataset
# arg2 -> location
f() {
    echo '[*]'"$1" >> result.txt
	echo '[*]single2' >> result.txt
	# run conventional symbolic execution on dataset
	( { time python scripts/jalangi.py symbolic -a src/js/analyses/puresymbolic/Single2 -i 10000 "$2" | tee >(grep -Ei "(^Tests Generated)" >> result.txt); } 2>&1 ) | { tee >(grep -Ei "^(real|user|sys)" >> result.txt); }
	# get collected statistics
	cd jalangi_tmp; node ../src/js/utils/StatCollector.js >> ../result.txt; cd ..
	
	echo '[*]multiple' >> result.txt
	# run multiex on dataset
	( { time python scripts/jalangi.py symbolic -a src/js/analyses/puresymbolic/Multiple -i 1 "$2" | tee >(grep -Ei "(^Tests Generated)" >> result.txt); } 2>&1 ) | { tee >(grep -Ei "^(real|user|sys)" >> result.txt); }
	# get collected statistics
	cd jalangi_tmp; node ../src/js/utils/StatCollector.js >> ../result.txt; cd ..
}

# max element
f "find_max" "tests/compos/findMax"

# red black tree
f "red_black" "tests/compos/redblack"

# calc parser
f "calc_parser" "tests/compos/parser"

# PL/0 parser
f "pl_0_parser" "tests/compos/parser2"

# priority queue
f "priority_queue" "tests/multiex/datastructures/PriorityQueue"

# queue
f "queue" "tests/multiex/datastructures/Queue"

# stack
f "stack" "tests/multiex/datastructures/stack"

# kruskal algorithm
f "kruskal" "tests/multiex/algorithms/Kruskal"

# priority queue
f "priority_queue" "tests/multiex/datastructures/PriorityQueue"

# deque linked list
f "deque_linked_list" "tests/multiex/datastructures/Deque_linkedList"

# double linked list
f "double_linked_list" "tests/multiex/datastructures/DoubleLinkedList"

# heap sort
f "head_sort" "tests/multiex/algorithms/heapSort"

echo '[*]exp-done' >> result.txt
