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
	return capitalize(nouns[modedRandom(nouns.length)]);
};

function getAdjective() {
	return capitalize(adjectives[modedRandom(adjectives.length)]);
};

function getAdverb() {
	return capitalize(adverb[modedRandom(adverb.length)]);
};

function getVerb() {
	return capitalize(verb[modedRandom(verb.length)]);
};

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function getId() {
	console.log('in getId()');
	var val = modedRandom(4) % 4;
	switch (val) {
		case 0: 
			console.log('Adjective Noun: ' + val);
			return getAdjective() + getNoun();
		case 1:
			console.log('Verb Adverb: ' + val);
			return getVerb() + getAdverb();
		case 2:
			console.log('Verbing Noun: ' + val);
			return getVerb() + 'ing' + getNoun();
		case 3:
			console.log('Adverb Verbing:' + val);
			return getAdverb() + getVerb() + 'ing';
		default:
			console.log('Default: ' + val);
	}
};

exports.getId = getId;
exports.getAdjective = getAdjective;
exports.getNoun = getNoun;
exports.getAdverb = getAdverb;
exports.getVerb = getVerb;
