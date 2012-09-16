var idgen = require('../idgenerator.js');

exports['getIdWithIdx'] = function (test) {
	var log = '';
	origLog = console.log;
	console.log = function(data) { log += (data + '\n'); }
	for(i = 0; i < 10; i++){
		if (i < 6)
			test.ok(idgen.getIdWithIdx(i), 'Should have generated something for ' + i);
		else 
			test.throws(function() {idgen.getIdWithIdx(i) }, Error, 'Should have thrown Exception');
	}
	test.notEqual(log.indexOf('Adjective Noun: 0 -> '), -1, 'Adject Noun not called');
	test.notEqual(log.indexOf('Verb Adverb: 1 -> '), -1, 'Verb Adverb not called');
	test.notEqual(log.indexOf('Verbing Noun: 2 -> '), -1, 'Verbing Noun not called');
	test.notEqual(log.indexOf('Adverb Verbing: 3 -> '), -1, 'Adverb Verbing not called');
	test.notEqual(log.indexOf('Verbing Mythology: 4 -> '), -1, 'Verbing Mythology not called');
	test.notEqual(log.indexOf('Noun of Mythology: 5 -> '), -1, 'Noun of Mythology not called');
	test.done();

	console.log = origLog;
}

exports['check idgen not null or no space'] = function (test) {
	var totalAsserts = 0;
	function checkWords(test, words, type){
		var i = 0;
		for(i = 0; i < words.length; i++) {
			test.ok(words[i], type + ' had unexpected value: ' + words[i] + ' with index ' + i);
			test.equals(words[i].indexOf(' '), -1, type + ' had space in word: ' + words[i] + ' with index ' + i);
			totalAsserts += 2;
		}
		test.equals(i, words.length, 'Count did not match for: ' + type + ' ' + i + ' ' + words.length);
	}
	checkWords(test, idgen.getNouns(), 'Nouns');
	checkWords(test, idgen.getVerbs(), 'Verbs');
	checkWords(test, idgen.getAdjectives(), 'Adjectives');
	checkWords(test, idgen.getAdverbs(), 'Adverbs');
	checkWords(test, idgen.getMythology(), 'Mythology');
	test.equals(totalAsserts, 7014, 'Total number of words does not match');
	test.done();
}

exports['check if all the ing form for the verb generates correctly'] = function (test) {
	verbs = idgen.getVerbs();
	for(i = 0; i < verbs.length; i++) {
		var verb = verbs[i];
		var verbing = idgen.getVerbingInternal(verb);
		test.ok(verbing, 'Could not figure the ing form for ' + verb);
		test.notEqual(verbing.indexOf('ing'), -1, 'Verb ' + verb + ' should have ended with ing but was: ' + verbing);
	}
	test.done();
}