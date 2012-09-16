var idgen = require('../idgenerator.js');

exports['getIdWithIdx'] = function (test) {
	test.ok(idgen.getIdWithIdx(0), 'Ok for 0');
	test.ok(idgen.getIdWithIdx(1), 'Ok for 1');
	test.ok(idgen.getIdWithIdx(2), 'Ok for 2');
	test.ok(idgen.getIdWithIdx(3), 'Ok for 3');
	test.ok(idgen.getIdWithIdx(4), 'Ok for 4');
	test.ok(idgen.getIdWithIdx(5), 'Ok for 5');
	test.throws(function() {idgen.getIdWithIdx(6) }, Error, 'Should have thrown Exception');
	test.done();
}

exports['check idgen not null or no space'] = function (test) {
	function checkWords(test, words, type){
		for(i = 0; i < words.length; i++) {
			test.ok(words[i], type + ' not ok for: ' + words[i] + ' with index ' + i);
		}
	}
	checkWords(test, idgen.getNouns(), 'Nouns');
	checkWords(test, idgen.getVerbs(), 'Verbs');
	checkWords(test, idgen.getAdjectives(), 'Adjectives');
	checkWords(test, idgen.getAdverbs(), 'Adverbs');
	checkWords(test, idgen.getMythology(), 'Mythology');
	test.done();
}