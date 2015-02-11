var bases = {
  2: {
    chars: '01',
    bits: [1]
  },
  4: {
    chars: '0123',
    bits: [2, 1]
  },
  8: {
    chars: '01234567',
    bits: [4, 2, 1]
  },
  16: {
    chars: '0123456789abcdef',
    bits: [8, 4, 2, 1]
  },
  32: {
    chars: '0123456789bcdefghjkmnpqrstuvwxyz',
    bits: [16, 8, 4, 2, 1]
  }
};

var Hash = {};

Hash.decode = function (hash, opts) {
  if (typeof opts == 'undefined') throw new Error('`num` or `opts` argument required');
  if (typeof opts == 'number') {
    opts = { num: opts };
  }

  var num = opts.num;
  var base = opts.base || 32;
  if(typeof bases[base] !== 'object') throw new Error('invalid base');
  var b = bases[base];

  var ranges = [];
  for (var i = 0; i < num; i++) {
    ranges[i] = [-100, 100];
  }
  var id = 0;

  for (var i = 0; i < hash.length; i++) {
    for (var j = 0; j < b.bits.length; j++) {
      var range = ranges[id++ % ranges.length];
      var side = b.chars.indexOf(hash[i]) & b.bits[j]
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
  var base = opts.base || 32;
  if(typeof bases[base] !== 'object') throw new Error('invalid base');
  var b = bases[base];

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
      ch |= b.bits[bit];
      range[0] = mid;
    } else {
      range[1] = mid;
    }

    if (bit < b.bits.length - 1) {
      bit++;
    } else {
      hash += b.chars[ch];
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
