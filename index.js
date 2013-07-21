var bits = [16, 8, 4, 2, 1];
var base32 = '0123456789bcdefghjkmnpqrstuvwxyz';

var Hash = {};

Hash.decode = function (hash, num) {
  if (typeof num == 'undefined') throw new Error('`num` required');

  var ranges = [];
  for (var i = 0; i < num; i++) {
    ranges[i] = [-100, 100];
  }
  var id = 0;
  
  for (var i = 0; i < hash.length; i++) {
    for (var j = 0; j < bits.length; j++) {
      var range = ranges[id++ % ranges.length];
      var side = base32.indexOf(hash[i]) & bits[j]
        ? 0
        : 1;
      range[side] = avg(range);
    }
  }

  var averaged = [];
  for (var i = 0; i < ranges.length; i++) {
    averaged[i] = avg(ranges[i]);
  }
  return averaged;
};

Hash.encode = function (values, opts) {
  if (typeof opts == 'number') {
    opts = { precision: opts };
  }
  if (!opts) opts = {};

  var bit = 0;
  var ch = 0;
  var precision = opts.precision || 12;

  var ranges = [];
  for (var i = 0; i < values.length; i++) {
    if (values[i] < -100 || values[i] > 100) {
      throw new Error('accepted input range: [-100, 100]');
    }
    ranges[i] = [-100, 100];
  }

  var hash = '';
  var i = 0;

  while (hash.length < precision) {
    var arg = i++ % values.length;
    var range = ranges[arg];
    var value = values[arg];
    var mid = avg(range);

    if (value > mid) {
      ch |= bits[bit];
      range[0] = mid;
    } else {
      range[1] = mid;
    }

    if (bit < 4) {
      bit++;
    } else {
      hash += base32[ch];
      bit = 0;
      ch = 0;
    }
  }

  return hash;
}

function avg (r) {
  return (r[0] + r[1]) / 2;
}

module.exports = Hash;

/*console.log(Hash.encode([-2.4/180*100, 10.3/90*100]));
console.log(Hash.encode([10, 10, 10]));
console.log(Hash.encode([11, 10, 10]));
console.log(Hash.encode([10, 11, 10]));
console.log(Hash.encode([10, 10, 11]));
console.log(Hash.decode(Hash.encode([10, 10, 10]), 3));
console.log(Hash.decode(Hash.encode([11, 10, 10]), 3));
console.log(Hash.decode(Hash.encode([-2.4/180*100, 10.3/90*100]), 2));*/
