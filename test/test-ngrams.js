var sys = require('sys'),
colors = require('colors'),
Ngrams = require('../lib/ngram').Ngrams;


exports.testTokens = function(test) {
	test.expect(1);
	var sentence = "Je mange des petits pois pour la première fois";
	sys.debug(sentence.tokens());
	test.equals(9, sentence.tokens().length, "tokenization");
	test.done();
};

exports.testNgrams = function(test) {
	test.expect(1);
	var n = new Ngrams();
	n.min = 3;
	n.feedAll('Je mange des carottes et des patates'.tokens());
	var ranks = n.ranks();
	test.equals(44, n.keys.length);
	sys.debug(sys.inspect(ranks));
	test.done();
};
