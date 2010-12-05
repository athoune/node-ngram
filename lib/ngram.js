var util = require('util');

function cleanup(txt) {
	return txt.replace(/(^[\\("']+)|([,:;.?!)"'|\\]+$)/, '').toLowerCase();
}

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
};

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
};

Ngrams.prototype.feedAll = function(words) {
	var g = this;
	words.forEach(function(word) {
		g.feed(word);
	});
};

Ngrams.prototype.ranks = function() {
	var g = this;
	this.keys.sort(function(a,b) {
			return g.stats[a] - g.stats[b];
	});
	var rank = 0;
	var ranks = {};
	var before = null;
	this.keys.reverse().forEach(function(key) {
		if(g.stats[key] != before) {
			before = g.stats[key];
			rank += 1;
		}
		ranks[key] = rank;
	});
	return ranks;
};

exports.Ngrams = Ngrams;

String.prototype.tokens = function (filter) {
	var s = this;
	return this.split(/\s+/).map(function(word) {
		if(filter != null) {
			return filter.call(s, word);
		}
		return word.toLowerCase();
	});
};
