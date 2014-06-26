#!/bin/bash

# back up the preivous results
rm result.bak.txt;
mv result.txt result.bak.txt;

# max element
echo '[*]findMax' >> result.txt
echo '[*]single2' >> result.txt
{ time python scripts/jalangi.py symbolic -a src/js/analyses/puresymbolic/Single2 -i 10000 tests/compos/findMax | tee >(grep -Ei "(^Tests Generated)|^(real|user|sys)" >> result.txt); } 2>> result.txt
cd jalangi_tmp; node ../src/js/utils/StatCollector.js >> ../result.txt; cd ..
echo '[*]multiple' >> result.txt
time python scripts/jalangi.py symbolic -a src/js/analyses/puresymbolic/Multiple -i 1 tests/compos/findMax
cd jalangi_tmp; node ../src/js/utils/StatCollector.js >> ../result.txt; cd ..

# red black tree
echo '[*]redblack' >> result.txt
echo '[*]single2' >> result.txt
time python scripts/jalangi.py symbolic -a src/js/analyses/puresymbolic/Single2 -i 10000 tests/compos/redblack
cd jalangi_tmp; node ../src/js/utils/StatCollector.js >> ../result.txt; cd ..
echo '[*]multiple' >> result.txt
time python scripts/jalangi.py symbolic -a src/js/analyses/puresymbolic/Multiple -i 1 tests/compos/redblack
cd jalangi_tmp; node ../src/js/utils/StatCollector.js >> ../result.txt; cd ..

# calc parser
echo '[*]parser' >> result.txt
echo '[*]single2' >> result.txt
time python scripts/jalangi.py symbolic -a src/js/analyses/puresymbolic/Single2 -i 10000 tests/compos/parser
cd jalangi_tmp; node ../src/js/utils/StatCollector.js >> ../result.txt; cd ..
echo '[*]multiple' >> result.txt
time python scripts/jalangi.py symbolic -a src/js/analyses/puresymbolic/Multiple -i 1 tests/compos/parser
cd jalangi_tmp; node ../src/js/utils/StatCollector.js >> ../result.txt; cd ..

# PL/0 parser
echo '[*]parser2' >> result.txt
echo '[*]single2' >> result.txt
time python scripts/jalangi.py symbolic -a src/js/analyses/puresymbolic/Single2 -i 10000 tests/compos/parser2
cd jalangi_tmp; node ../src/js/utils/StatCollector.js >> ../result.txt; cd ..
echo '[*]multiple' >> result.txt
time python scripts/jalangi.py symbolic -a src/js/analyses/puresymbolic/Multiple -i 1 tests/compos/parser2
cd jalangi_tmp; node ../src/js/utils/StatCollector.js >> ../result.txt; cd ..

# kruskal algorithm
echo '[*]kruskal' >> result.txt
echo '[*]single2' >> result.txt
time python scripts/jalangi.py symbolic -a src/js/analyses/puresymbolic/Single2 -i 10000 tests/multiex/algorithms/Kruskal
cd jalangi_tmp; node ../src/js/utils/StatCollector.js >> ../result.txt; cd ..
echo '[*]multiple' >> result.txt
time python scripts/jalangi.py symbolic -a src/js/analyses/puresymbolic/Multiple -i 1 tests/multiex/algorithms/Kruskal
cd jalangi_tmp; node ../src/js/utils/StatCollector.js >> ../result.txt; cd ..

# priority queue
echo '[*]priority_queue' >> result.txt
echo '[*]single2' >> result.txt
time python scripts/jalangi.py symbolic -a src/js/analyses/puresymbolic/Single2 -i 10000 tests/multiex/datastructures/PriorityQueue
cd jalangi_tmp; node ../src/js/utils/StatCollector.js >> ../result.txt; cd ..
echo '[*]multiple' >> result.txt
time python scripts/jalangi.py symbolic -a src/js/analyses/puresymbolic/Multiple -i 1 tests/multiex/datastructures/PriorityQueue
cd jalangi_tmp; node ../src/js/utils/StatCollector.js >> ../result.txt; cd ..

# queue
echo '[*]queue' >> result.txt
echo '[*]single2' >> result.txt
time python scripts/jalangi.py symbolic -a src/js/analyses/puresymbolic/Single2 -i 10000 tests/multiex/datastructures/Queue
cd jalangi_tmp; node ../src/js/utils/StatCollector.js >> ../result.txt; cd ..
echo '[*]multiple' >> result.txt
time python scripts/jalangi.py symbolic -a src/js/analyses/puresymbolic/Multiple -i 1 tests/multiex/datastructures/Queue
cd jalangi_tmp; node ../src/js/utils/StatCollector.js >> ../result.txt; cd ..

# stack
echo '[*]stack' >> result.txt
echo '[*]single2' >> result.txt
time python scripts/jalangi.py symbolic -a src/js/analyses/puresymbolic/Single2 -i 10000 tests/multiex/datastructures/stack
cd jalangi_tmp; node ../src/js/utils/StatCollector.js >> ../result.txt; cd ..
echo '[*]multiple' >> result.txt
time python scripts/jalangi.py symbolic -a src/js/analyses/puresymbolic/Multiple -i 1 tests/multiex/datastructures/stack
cd jalangi_tmp; node ../src/js/utils/StatCollector.js >> ../result.txt; cd ..

# deque linked list
echo '[*]deque_linked_list' >> result.txt
echo '[*]single2' >> result.txt
time python scripts/jalangi.py symbolic -a src/js/analyses/puresymbolic/Single2 -i 10000 tests/multiex/datastructures/Deque_linkedList
cd jalangi_tmp; node ../src/js/utils/StatCollector.js >> ../result.txt; cd ..
echo '[*]multiple' >> result.txt
time python scripts/jalangi.py symbolic -a src/js/analyses/puresymbolic/Multiple -i 1 tests/multiex/datastructures/Deque_linkedList
cd jalangi_tmp; node ../src/js/utils/StatCollector.js >> ../result.txt; cd ..

# double linked list
echo '[*]double_linked_list' >> result.txt
echo '[*]single2' >> result.txt
time python scripts/jalangi.py symbolic -a src/js/analyses/puresymbolic/Single2 -i 10000 tests/multiex/datastructures/DoubleLinkedList
cd jalangi_tmp; node ../src/js/utils/StatCollector.js >> ../result.txt; cd ..
echo '[*]multiple' >> result.txt
time python scripts/jalangi.py symbolic -a src/js/analyses/puresymbolic/Multiple -i 1 tests/multiex/datastructures/DoubleLinkedList
cd jalangi_tmp; node ../src/js/utils/StatCollector.js >> ../result.txt; cd ..

# heap sort
echo '[*]head_sort' >> result.txt
echo '[*]single2' >> result.txt
time python scripts/jalangi.py symbolic -a src/js/analyses/puresymbolic/Single2 -i 10000 tests/multiex/algorithms/heapSort
cd jalangi_tmp; node ../src/js/utils/StatCollector.js >> ../result.txt; cd ..
echo '[*]multiple' >> result.txt
time python scripts/jalangi.py symbolic -a src/js/analyses/puresymbolic/Multiple -i 1 tests/multiex/algorithms/heapSort
cd jalangi_tmp; node ../src/js/utils/StatCollector.js >> ../result.txt; cd ..

