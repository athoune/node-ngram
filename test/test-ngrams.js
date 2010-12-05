var sys = require('sys'),
colors = require('colors'),
Ngrams = require('../lib/ngram').Ngrams;

var n = new Ngrams();
n.min = 3;

n.feed('je');
n.feed('mange');
n.feed('des');
n.feed('carottes');

sys.debug(n.ranks());