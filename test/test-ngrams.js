 var vows = require('vows'),
    assert = require('assert'),
    ngram = require('../lib/ngram');

vows.describe('Ngram').addBatch({

    'A sentence': {
        topic: "Je mange des petits pois pour la première fois",
        'should be tokenized': function(sentence) {
            assert.equal(9, sentence.tokens().length);
        },
        'should be ngramed': function(sentence) {
            var n = new ngram.Ngrams();
            n.min = 3;
            n.feedAll(sentence);
            var ranks = n.ranks();
            assert.equal(63, n.keys.length);
        }
    }

}).run();

/*

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
*/
