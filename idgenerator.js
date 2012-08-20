var fs = require('fs');

var nounFileName = __dirname + '/data/noun.dat';
var adjectiveFileName = __dirname + '/data/adjective.dat';
var adverbFileName = __dirname + '/data/adverb.dat';
var verbFileName = __dirname + '/data/verb.dat';

var nouns = fs.readFileSync(nounFileName, 'ascii').split('\n');
var adjectives = fs.readFileSync(adjectiveFileName, 'ascii').split('\n');
var adverb = fs.readFileSync(adverbFileName, 'ascii').split('\n');
var verb = fs.readFileSync(verbFileName, 'ascii').split('\n');

nouns.splice(nouns.length - 1, 1);
adjectives.splice(adjectives.length - 1, 1);
adverb.splice(adjectives.length - 1, 1);
verb.splice(adjectives.length - 1, 1);

function modedRandom(mod){
	return Math.floor(mod * Math.random());
}

function getNoun(){
	return nouns[modedRandom(nouns.length)];
};

function getAdjective() {
	return adjectives[modedRandom(adjectives.length)];
};

function getAdverb() {
	return adverb[modedRandom(adverb.length)];
};

function getVerb() {
	return verb[modedRandom(verb.length)];
};

function getId() {
	if (modedRandom(2) % 2 == 0)
		return getAdjective() + getNoun();
	else
		return getVerb() + getAdverb();
};

exports.getId = getId;
exports.getAdjective = getAdjective;
exports.getNoun = getNoun;
exports.getAdverb = getAdverb;
exports.getVerb = getVerb;
