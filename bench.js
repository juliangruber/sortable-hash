var hash = require('./');
var ben = require('ben');

var ms = ben(100000, function () {
  hash.decode(hash.encode([10, 10, 10]), 3);
});

console.log('%s ms/op', ms);
