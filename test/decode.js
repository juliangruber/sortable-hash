var test = require('tape');
var decode = require('..').decode;

test('decode', function (t) {
  t.plan(10);

  t.throws(decode.bind(null, 'numValues required'));

  t.deepEqual(i(decode('jm6dtm6dtm68', 1)), [10]);
  t.deepEqual(i(decode('jm6dtm6dtm68000000000000', 1)), [10]);
  t.deepEqual(i(decode('jm6dtm', 1)), [10]);

  t.deepEqual(i(decode('kqkuc9e5nqku', 2)), [10, -10]);
  t.deepEqual(i(decode('kqkuc9e5nqkuc9e5nqkuc960', 2)), [10, -10]);
  t.deepEqual(i(decode('kqkuc9', 2)), [10, -10]);

  t.deepEqual(i(decode('p4pp5e9cbbuk', 3)), [10, -10, 10]);
  t.deepEqual(i(decode('p4pp5e9cbbukqnpp5e9cbbuk', 3)), [10, -10, 10]);
  t.deepEqual(i(decode('p4pp5e', 3)), [10, -10, 10]);
});

function i (arr) {
  return arr.map(function (e) {
    return Math.round(e);
  });
}
