Ngram for Node
==============

		var Ngrams = require('ngram').Ngrams;
		
		var tokens = "Hello world".tokens();
		console.log(tokens); // ['hello', 'world']

Language guessing
-----------------

OpenOffice and its variants (LibreOffice, NeoOffice, OOo4Kids ...) provides libtextcat languages ngram stats files.

		var ngram = require('ngram');
		
		var fp = new ngram.FingerPrint();
		var folder = '/Applications/LibreOffice.app/Contents/basis-link/share/fingerprint/';
		fp.register('fr', folder + 'french.lm');
		fp.register('en', folder + 'english.lm');
		fp.register('it', folder + 'italian.lm');
		var n = new ngram.Ngrams();
		n.min = 3;
		n.feedAll('redis ça si tu es un homme'.tokens()); // fr
		n = new ngram.Ngrams();
		n.min = 3;
		n.feedAll('redis is a network tools'.tokens()); // en

Next step
---------

A twitter language filter for real and small sentences testing in real world.