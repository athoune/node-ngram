Ngram for Node
==============

Tokenization
------------

    var ngram = require('ngram');

    var tokens = "Hello world".tokens();
    console.log(tokens); // ['hello', 'world']

Language guessing
-----------------

OpenOffice and its variants (LibreOffice, NeoOffice, OOo4Kids ...) provides libtextcat languages ngram stats files.

    var ngram = require('ngram');

    var fp = new ngram.FingerPrint();
    fp.registerFolder('/Applications/LibreOffice.app/Contents/basis-link/share/fingerprint/');
    var n = new ngram.Ngrams();
    n.min = 3;
    n.feedAll('redis ça si tu es un homme'.tokens()); // fr
    n = new ngram.Ngrams();
    n.min = 3;
    n.feedAll('redis is a network tools'.tokens()); // en

Real World example
------------------

[node twitter reader](https://github.com/athoune/node-twitter-reader)

More links
----------

 * [libTextCat](http://software.wise-guys.nl/libtextcat/) wich provides original stats files.
 * [language_detector](https://github.com/feedbackmine/language_detector), a ruby tools with wikipedia's data.
