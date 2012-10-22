var idgen = require('../idgenerator.js');
var should = require('should');

exports['getIdWithIdx'] = function (test) {
	var log = '';
	origLog = console.log;
	console.log = function(data) { log += (data + '\n'); }
	for(i = 0; i < 10; i++){
		if (i < 8)
			should.exist(idgen.getIdWithIdx(i));
		else 
			(function() {idgen.getIdWithIdx(i) }).should.throw();
	}
	function check(stringToCheck) { 
		(log.indexOf(stringToCheck)).should.not.equal(-1);
	}
	
	check('Adjective Noun: 0 -> ');
	check('Verb Adverb: 1 -> ');
	check('Verbing Noun: 2 -> ');
	check('Adverb Verbing: 3 -> ');
	check('Verbing Mythology: 4 -> ');
	check('Noun of Mythology: 5 -> ');

	test.done();

	console.log = origLog;
}

exports['check idgen not null or no space'] = function (test) {
	var totalAsserts = 0;
	function checkWords(test, words, type){
		var i = 0;
		for(i = 0; i < words.length; i++) {
			should.exist(words[i], type + ' had unexpected value: ' + words[i] + ' with index ' + i);
			(words[i].indexOf(' ')).should.equal(-1, type + ' had space in word: ' + words[i] + ' with index ' + i);
			totalAsserts += 2;
		}
		(i).should.equal(words.length, 'Count did not match for: ' + type + ' ' + i + ' ' + words.length);
	}
	checkWords(test, idgen.getNouns(), 'Nouns');
	checkWords(test, idgen.getVerbs(), 'Verbs');
	checkWords(test, idgen.getAdjectives(), 'Adjectives');
	checkWords(test, idgen.getAdverbs(), 'Adverbs');
	checkWords(test, idgen.getMythology(), 'Mythology');
	(totalAsserts).should.equal(7014, 'Total number of words does not match');
	test.done();
}

exports['getVerbing -> check if all the ing form for the verb generates correctly'] = function (test) {
	verbs = idgen.getVerbs();
	for(i = 0; i < verbs.length; i++) {
		var verb = verbs[i];
		var verbing = idgen.getIngFormForVerb(verb);
		should.exist(verbing, 'Could not figure the ing form for ' + verb);
		(verbing.indexOf('ing')).should.not.equal(-1, 'Verb ' + verb + ' should have ended with ing but was: ' + verbing);
	}
	test.done();
}

exports['modedRandom -> check moded value is in the range'] = function(test) {
	for(i = 1; i < 100; i++) {
		for(times = 0; times < 1000; times++) {
			var val = idgen.modedRandom(i);
			val.should.be.within(0, (i - 1), 'Value should have been between 0 and ' + i + ' but was ' + val);
		}
	}
	test.done();
}
