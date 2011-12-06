
var FingerPrint = function() {
    this.languages = {};
};

exports.FingerPrint = FingerPrint;

/**
 * Register a lm file
 */
FingerPrint.prototype.register = function(name, path) {
    this.languages[name] = new Ngrams();
    this.languages[name].readLm(path);
};

/**
 * Register all lm files in a folder
 * In a Mac it can be here : /Applications/LibreOffice.app/Contents/basis-link/share/fingerprint/
 */
FingerPrint.prototype.registerFolder = function(path) {
    var f = this;
    fs.readdirSync(path).forEach(function(lm) {
        f.register(lm.split('.')[0], path + lm);
    });
};

/**
 * Guess language from Ngram
 */
FingerPrint.prototype.guess = function(ngram) {
    var language = undefined;
    var score = undefined;
    for(var lang in this.languages) {
        var distance = ngram.distance(this.languages[lang]);
        if(score === undefined || distance < score) {
            score = distance;
            language = lang;
        }
    }
    return language;
};
