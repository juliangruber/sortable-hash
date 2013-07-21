
Hash arrays of numbers into a string from which you can reconstruct the
original values, with configurable precision loss. The generated hashes
**sort well**, so similar input values cause large shared prefixes in hashes.

```js
encode([10, 10, 10]) == 'w07w1z0gs3y0';
encode([10, 11, 10]) == 'w07x1e1cs2yk';
```

## Usage

Hash the array `[10, -10, 10]` and then restore it, using differend
hash sizes.

```js
var sortable = require('sortable-hash');

var hash = sortable.encode([10, -10, 10]);
// => 'p4pp5e9cbbuk'

sortable.decode(hash, 3);
// => [ 9.999942779541016,
//      -9.999942779541016,
//      9.999942779541016 ]

var biggerHash = sortable.encode([10, -10, 10], 35);
// => 'p4pp5e9cbbukqnpp5e9cbbukqnpp5e9cb3h'

sortable.decode(biggerHash, 3);
// => [ 10, -10, 10 ]
```

## API

### sortable.encode(values[, options])

Hash the array `values`, which may only contain Numbers in the range of
`[-100, 100]`.

`options` can either be an object with those possible keys:

* `precision`: Length of the resulting hash

or a Number, in which case it sets `options.precision`.

```js
encode([10], 13) === encode([10], { precision: 13 });
```

### sortable.decode(string, numValues)

Decode `string` into an Array of Numbers. `numValues` needs to be the number
of elements initially passed to `hash.encode`.

## Installation

With [npm](http://npmjs.org) do:

```bash
$ npm install sortable-hash
```

## Kudos

This is the idea of [geohashes](http://en.wikipedia.org/wiki/Geohash)
generalized for use with all numeric data and numbers of input fields.

## License

Copyright (c) 2013 Julian Gruber &lt;julian@juliangruber.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
