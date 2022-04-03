# Developer Notes

I humbly think that, when possible, any modern Javascript project should be done with Typescript.
That's why I took the liberty of not only implementing my solutions with typescript but to
refactor the whole project to it, trying to modify as little as possible.

I expanded the tests with jest, linting with ESlint and also some NPM script to make my life easier.

Faker library is deprecated. I tried using faker-js but it made the whole project slower and, as I
already had changed a lot of things in the excercise, I prefered not to test my luck there.

I tried not to reinvent the wheel and, after implementing a solution
without using a heap (and also a recursive one that did not work 😜) I found
[this article](https://www.queryhome.com/tech/106726/given-active-stream-sorted-arrays-would-merge-efficiently#a_list_title)
that lead me to that data structure. I did not wanted to implement heaps myself so first I found
[heap-js](https://github.com/ignlg/heap-js) but, after a couple of bugs and frustration I realized
that maybe their push method is not working properly (maybe I'm wrong but when pushing into a heap I
expect it to be sorted again). I went with [heap.js](https://github.com/qiao/heap.js) instead and it
gave me what I needed.

I decided to go with heaps because I found out that the bottle neck beyond the natural limitation of
the streams of logs is the sorting of the available entries. Heaps (and its pop, push and replace methods)
makes the solution of this problem faster if we want to preserve memory as stated in the instructions of
the excercise.
