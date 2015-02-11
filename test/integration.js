var test = require('tape');
var encode = require('..').encode;
var decode = require('..').decode;

test('integration', function (t) {
  t.plan(9);

  t.deepEqual(i(decode(encode([10]), 1)), [10]);
  t.deepEqual(i(decode(encode([10], 24), 1)), [10]);
  t.deepEqual(i(decode(encode([10], 6), 1)), [10]);

  t.deepEqual(i(decode(encode([10, -10]), 2)), [10, -10]);
  t.deepEqual(i(decode(encode([10, -10], 24), 2)), [10, -10]);
  t.deepEqual(i(decode(encode([10, -10], 6), 2)), [10, -10]);

  t.deepEqual(i(decode(encode([10, -10, 10]), 3)), [10, -10, 10]);
  t.deepEqual(i(decode(encode([10, -10, 10], 24), 3)), [10, -10, 10]);
  t.deepEqual(i(decode(encode([10, -10, 10], 6), 3)), [10, -10, 10]);
});

test('integration base16', function (t) {
  t.plan(9);

  t.deepEqual(i(decode(encode([10], {base: 16}), {num: 1, base: 16})), [10]);
  t.deepEqual(i(decode(encode([10], {precision: 24, base: 16}), {num: 1, base: 16})), [10]);
  t.deepEqual(i(decode(encode([10], {precision: 6, base: 16}), {num: 1, base: 16})), [10]);

  t.deepEqual(i(decode(encode([10, -10], {base: 16}), {num: 2, base: 16})), [10, -10]);
  t.deepEqual(i(decode(encode([10, -10], {precision: 24, base: 16}), {num: 2, base: 16})), [10, -10]);
  t.deepEqual(i(decode(encode([10, -10], {precision: 6, base: 16}), {num: 2, base: 16})), [10, -10]);

  t.deepEqual(i(decode(encode([10, -10, 10], {base: 16}), {num: 3, base: 16})), [10, -10, 10]);
  t.deepEqual(i(decode(encode([10, -10, 10], {precision: 24, base: 16}), {num: 3, base: 16})), [10, -10, 10]);
  t.deepEqual(i(decode(encode([10, -10, 10], {precision: 6, base: 16}), {num: 3, base: 16})), [10, -10, 10]);
});

function i (arr) {
  return arr.map(function (e) {
    return Math.round(e);
  });
}
