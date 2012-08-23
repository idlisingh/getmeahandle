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

function getVerbIng(){
	var verb = getVerb();
	if (endsWith(verb, 'ee')){
		return verb + 'ing';
	}else if (endsWith(verb, 'e')){
		return verb.substring(0, verb.length - 1) + 'ing';
	}else if (endsWith(verb, 'ie')){
		return verb.substring(0, verb.length - 2) + 'ying';
	}else {
		return verb + 'ing';
	}
};

//	Helper Functions
function modedRandom(mod){
	return Math.floor(mod * Math.random());
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

//	Main getId()
function getId() {
	var val = modedRandom(3) % 3;
	var newId;
	var type;
	switch (val) {
		case 0: 
			type = 'Adjective Noun: ' + val;
			newId = getAdjective() + getNoun();
			break;
		case 1:
			type = 'Verb Adverb: ' + val;
			newId = getVerb() + getAdverb();
			break;
		case 2:
			type = 'Verbing Noun: ' + val;
			newId = getVerbIng() + getNoun();
			break;
		case 3:
			type = 'Adverb Verbing:' + val;
			newId = getAdverb() + getVerbIng();
			break;
	}
	console.log(type + ' -> ' + newId);
	return newId;
};


//	Exports
exports.getId = getId;
exports.getAdjective = getAdjective;
exports.getNoun = getNoun;
exports.getAdverb = getAdverb;
exports.getVerb = getVerb;
