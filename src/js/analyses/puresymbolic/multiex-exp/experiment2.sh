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

# f arg1 arg2
# arg1 -> name of dataset
# arg2 -> location
runexp() {
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



: <<'END' 
END

# Bresenham drawline algorithm
runexp "bresenham_drawline" "tests/multiex/algorithms/Bresenham-drawline"

# max element
runexp "find_max" "tests/compos/findMax"

# red black tree
runexp "red_black" "tests/compos/redblack"

# calc parser
runexp "calc_parser" "tests/compos/parser"

# PL/0 parser
runexp "pl_0_parser" "tests/compos/parser2"

# binary seearch tree
runexp "binary_search_tree" "tests/compos/bst"

# symbolic array index
runexp "symbolic_array_index" "tests/compos/symbolicArrayIndex"

# index Of full
# runexp "index_of_full" "tests/compos/indexOfFull" # single2 runs forever;

# priority queue
runexp "priority_queue" "tests/multiex/datastructures/PriorityQueue"

# queue
runexp "queue" "tests/multiex/datastructures/Queue"

# stack
runexp "stack" "tests/multiex/datastructures/stack"

# kruskal algorithm
runexp "kruskal" "tests/multiex/algorithms/Kruskal"

# priority queue
runexp "priority_queue" "tests/multiex/datastructures/PriorityQueue"

# deque linked list
runexp "deque_linked_list" "tests/multiex/datastructures/Deque_linkedList"

# double linked list
runexp "double_linked_list" "tests/multiex/datastructures/DoubleLinkedList"

# heap sort
runexp "head_sort" "tests/multiex/algorithms/heapSort"

# selection sort
runexp "selection_sort" "tests/multiex/algorithms/selection-sort"

# insertion sort
runexp "insertion_sort" "tests/multiex/algorithms/insertion-sort"

# shell sort
runexp "shell_sort" "tests/multiex/algorithms/shellsort"

# Kadane max sub array algorithm
runexp "Kadane-max-subarray" "tests/multiex/algorithms/maxsubarray"


# fac
#runexp "index_of" "tests/compos/fac"

# index Of
#runexp "index_of" "tests/compos/indexOf"

# knapsack
# runexp "prim" "tests/multiex/algorithms/knapsack"

# bfs
# runexp "prim" "tests/multiex/algorithms/bfs"

# merge sort
# runexp "merge_sort" "tests/multiex/algorithms/mergeSort"

# prim algorithm
# runexp "prim" "tests/multiex/algorithms/Prim"

# damerau levenshtein
# runexp "damerau_levenshtein" "tests/multiex/algorithms/Damerau-Levenshtein"

# 3d-cube
# runexp "3d_cube" "tests/multiex/algorithms/3d-cube"

# 3d-morph
# runexp "3d_morph" "tests/multiex/algorithms/3d-morph"

# 3d-raytrace
#runexp "3d_raytrace" "tests/multiex/algorithms/3d-raytrace"

# access fannkuch
# runexp "access_fannkuch" "tests/multiex/algorithms/access-fannkuch"

# run length
#runexp "run_length" "tests/multiex/algorithms/runlength"

# longest increasing subsequence
# runexp "longest_increase_subsequence" "tests/multiex/algorithms/long-increase-subseq"

echo '[*]exp-done' >> result.txt
