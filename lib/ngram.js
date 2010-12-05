var util = require('util');

function ngram(word, min, max) {
	var ngrams = [];
	word = '_' + word + '_';
	for(var i=0; i < word.length; i++) {
		for(var s=min; s <=max; s++) {
			if(i+s <= word.length) {
				var ngram = word.substr(i,s);
				if(ngram != '_')
					ngrams.push(ngram);
			}
		}
	}
	return ngrams;
}

exports.ngram = ngram;

var Ngrams = function() {
	this.keys = [];
	this.stats = {};
	this.min = 1;
	this.max = 4;
}

Ngrams.prototype.feed = function(word) {
	var g = this;
	ngram(word, this.min, this.max).forEach(function(n) {
		if(g.stats[n] == null) {
			g.stats[n] = 1;
			g.keys.push(n);
		}else{
			g.stats[n] += 1;
		}
	});
}

Ngrams.prototype.ranks = function() {
	var g = this;
	this.keys.sort(function(a,b) {
		if(g.stats[a] != g.stats[b]) {
			return g.stats[a] - g.stats[b];
		}
		if(a == b) {
			return 0;
		}
		if(a > b) {
			return 1;
		}
		return -1;
	});
	return this.keys;
}

exports.Ngrams = Ngrams;