var fs = require('fs');

String.prototype.capitalize=function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
}

Array.prototype.generateRandom=function() {
	return this[modedRandom(this.length)].capitalize();
}

var nounFileName = __dirname + '/data/noun.dat';
var adjectiveFileName = __dirname + '/data/adjective.dat';
var adverbFileName = __dirname + '/data/adverb.dat';
var verbFileName = __dirname + '/data/verb.dat';
var mythologyFileName = __dirname + '/data/mythology.dat';
var foodFileName = __dirname + '/data/food.dat';

var nouns = fs.readFileSync(nounFileName, 'ascii').split('\n');
var adjectives = fs.readFileSync(adjectiveFileName, 'ascii').split('\n');
var adverbs = fs.readFileSync(adverbFileName, 'ascii').split('\n');
var verbs = fs.readFileSync(verbFileName, 'ascii').split('\n');
var mythology = fs.readFileSync(mythologyFileName, 'ascii').split('\n');
var foods = fs.readFileSync(foodFileName, 'ascii').split('\n');

nouns.splice(nouns.length - 1, 1);
adjectives.splice(adjectives.length - 1, 1);
adverbs.splice(adverbs.length - 1, 1);
verbs.splice(verbs.length - 1, 1);
mythology.splice(mythology.length - 1, 1);
foods.splice(mythology.length - 1, 1);

function getVerbing() {
	return getIngFormForVerb(verbs.generateRandom());
}

function getIngFormForVerb(verbVar){
	if (endsWith(verbVar, 'ee')){
		return verbVar + 'ing';
	}else if (endsWith(verbVar, 'e')){
		return verbVar.substring(0, verbVar.length - 1) + 'ing';
	}else if (endsWith(verbVar, 'ie')){
		return verbVar.substring(0, verbVar.length - 2) + 'ying';
	}else {
		return verbVar + 'ing';
	}
};

//	Helper Functions
function modedRandom(mod){
	return Math.floor(mod * Math.random());
}

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

//	Main getId()
function getId() {
	return getIdWithIdx(modedRandom(8));
}

function getEnglishId() {
	return getIdWithIdx(modedRandom(4));
}

function getMythologyId() {
	return getIdWithIdx(modedRandom(2) + 4);
}

function getFoodId() {
	return getIdWithIdx(modedRandom(2) + 6);
}

function getIdWithIdx(val) {
	var newId;
	var type;
	switch (val) {
		case 0: 
			type = 'Adjective Noun: ' + val;
			newId = adjectives.generateRandom() + nouns.generateRandom();
			break;
		case 1:
			type = 'Verb Adverb: ' + val;
			newId = verbs.generateRandom() + adverbs.generateRandom();
			break;
		case 2:
			type = 'Verbing Noun: ' + val;
			newId = getVerbing() + nouns.generateRandom();
			break;
		case 3:
			type = 'Adverb Verbing: ' + val;
			newId = adverbs.generateRandom() + getVerbing();
			break;
		//	Mythology
		case 4:
			type = 'Verbing Mythology: ' + val;
			newId = getVerbing() + mythology.generateRandom();
			break;
		case 5:
			type = 'Noun of Mythology: ' + val;
			newId = nouns.generateRandom() + 'Of' + mythology.generateRandom();
			break;
		//	Food
		case 6: 
			type = 'Food Noun: ' + val;
			newId = foods.generateRandom() + nouns.generateRandom();
			break;
		case 7: 
			type = 'Verbing Food: ' + val;
			newId = getVerbing() + foods.generateRandom();
			break;
		default:
			type = 'Unknonwn';
			throw new Error('Unexpected value: ' + val);
	}
	console.log(type + ' -> ' + newId);
	return '@' + newId;
};

//	Exports
exports.getId = getId;
exports.getIdWithIdx = getIdWithIdx;
exports.getEnglishId = getEnglishId;
exports.getMythologyId = getMythologyId;
exports.getFoodId = getFoodId;

//	For Tests
exports.getNouns = function() { return nouns; }
exports.getVerbs = function() { return verbs; }
exports.getAdjectives = function() { return adjectives; }
exports.getAdverbs = function() { return adverbs; }
exports.getMythology = function() { return mythology; }
exports.getIngFormForVerb = getIngFormForVerb;
exports.modedRandom = modedRandom;