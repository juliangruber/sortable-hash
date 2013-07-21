var test = require('tape');
var encode = require('..').encode;

test('encode', function (t) {
  t.plan(10);

  t.throws(encode.bind(null, [-200]));

  t.equal(encode([10]), 'jm6dtm6dtm68');
  t.equal(encode([10], 24), 'jm6dtm6dtm68000000000000');
  t.equal(encode([10], 6), 'jm6dtm');

  t.equal(encode([10, -10]), 'kqkuc9e5nqku');
  t.equal(encode([10, -10], 24), 'kqkuc9e5nqkuc9e5nqkuc960');
  t.equal(encode([10, -10], 6), 'kqkuc9');

  t.equal(encode([10, -10, 10]), 'p4pp5e9cbbuk');
  t.equal(encode([10, -10, 10], 24), 'p4pp5e9cbbukqnpp5e9cbbuk');
  t.equal(encode([10, -10 ,10], 6), 'p4pp5e');
});
