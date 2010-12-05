var sys = require('sys'),
colors = require('colors'),
ngram = require('../lib/ngram');


exports.testTokens = function(test) {
	test.expect(1);
	var sentence = "Je mange des petits pois pour la première fois";
	//sys.debug(sentence.tokens());
	test.equals(9, sentence.tokens().length, "tokenization");
	test.done();
};

exports.testNgrams = function(test) {
	test.expect(1);
	var n = new ngram.Ngrams();
	n.min = 3;
	n.feedAll('Je mange des carottes et des patates'.tokens());
	var ranks = n.ranks();
	test.equals(44, n.keys.length);
	//sys.debug(sys.inspect(ranks));
	test.done();
};

exports.testLm = function(test) {
	test.expect(2);
	var fp = new ngram.FingerPrint();
	fp.register('fr', '/Applications/LibreOffice.app/Contents/basis-link/share/fingerprint/french.lm');
	fp.register('en', '/Applications/LibreOffice.app/Contents/basis-link/share/fingerprint/english.lm');
	fp.register('it', '/Applications/LibreOffice.app/Contents/basis-link/share/fingerprint/italian.lm');
	var n = new ngram.Ngrams();
	n.min = 3;
	n.feedAll('redis ça si tu es un homme'.tokens());
	test.equals('fr', fp.guess(n));
	n = new ngram.Ngrams();
	n.min = 3;
	n.feedAll('redis is a network tools'.tokens());
	test.equals('en', fp.guess(n));
	test.done();
};