/*jslint browser: true*/
/*global $, jQuery, angular, console */
/*jslint plusplus: true */

(function () {
    'use strict';
    angular.module('app.service', [])
        .service('dictService', function () {
            var dictionary, addWord, getWords, removeWord, repeatCount, getNextRandom, dictDone, private_started, setHit, setMiss, getCount, getDone, getStarted, setStarted, restart, getRate, langSwitch, setLangSwitch, getLangSwitch, lastWord, setHitCount, getSomeWord, getResults, loadColors, loadAnimals, removeDictionary;
            
            dictionary = [];
            dictDone = [];
            repeatCount = 1;
            private_started = false;
            langSwitch = false;
            lastWord = null;
        
            function Word(lang1, lang2) {
                //console.log($scope.dictionary);
                if (dictionary !== undefined && dictionary.length > 0) {
                    this.id = dictionary[dictionary.length - 1].id + 1;
                } else {
                    this.id = 1;
                }
                this.lang1 = lang1;
                this.lang2 = lang2;
                this.countMiss = 0;
                this.countHit = 0;
            }
        
            setLangSwitch = function (val) {
                if (val === true || val === false) {
                    langSwitch = val;
                }
            };
        
            getLangSwitch = function () {
                return langSwitch;
            };
        
            restart = function () {
                var i;
                for (i = 0; i < dictDone.length; i++) {
                    dictionary.push(dictDone[i]);
                }
                
                dictDone = [];
                
                for (i = 0; i < dictionary.length; i++) {
                    dictionary[i].countHit = 0;
                    dictionary[i].countMiss = 0;
                }
                private_started = false;
            };
        
            getStarted = function () {
                return private_started;
            };
        
            setStarted = function (state) {
                if (state === true) {
                    private_started = true;
                } else if (state === false) {
                    private_started = false;
                }
            };
        
            getCount = function () {
                return (dictionary.length + dictDone.length) * repeatCount;
            };
        
            getDone = function () {
                var i, sum = 0;
                for (i = 0; i < dictionary.length; i++) {
                    sum += dictionary[i].countHit;
                }
                return (dictDone.length * repeatCount) + sum;
            };
        
            setHit = function (id) {
                var i;
                lastWord = null;
                for (i = 0; i < dictionary.length; i++) {
                    if (dictionary[i].id === id) {
                        dictionary[i].countHit++;
                        //console.log(repeatCount);
                        if (dictionary[i].countHit === repeatCount) {
                            //console.log("odebiram");
                            dictDone.push(dictionary[i]);
                            dictionary.splice(i, 1);
                            if (dictionary.length === 0) {
                                private_started = false;
                            }
                        }
                    }
                }
            };
        
            setMiss = function (id) {
                var i;
                lastWord = null;
                for (i = 0; i < dictionary.length; i++) {
                    if (dictionary[i].id === id) {
                        dictionary[i].countMiss++;
                    }
                }
            };
        
            getSomeWord = function () {
                if (dictionary.length !== 0) {
                    return dictionary[0];
                } else if (dictDone.length !== 0) {
                    return dictDone[0];
                } else {
                    return null;
                }
            };
        
            getNextRandom = function () {
                var i, upperBound, lowerBound;
                
                if (dictionary.length === 0) {
                    return null;
                }
                
                if (lastWord !== null) {
                    return lastWord;
                }
                
                lowerBound = 0;
                upperBound = dictionary.length;
                i = Math.floor((Math.random() * upperBound) + lowerBound);
                //console.log(i);
                
                lastWord = dictionary[i];
                return dictionary[i];
            };

            removeWord = function (id) {
                var i;
                for (i = 0; i < dictionary.length; i++) {
                    if (dictionary[i].id === id) {
                        dictionary.splice(i, 1);
                        break;
                    }
                }
            };
        
            addWord = function (lang1, lang2) {
                var i, add = true;
                lang1 = lang1.trim();
                lang2 = lang2.trim();
                for (i = 0; i < dictionary.length; i++) {
                    if (dictionary[i].lang1 === lang1 && dictionary[i].lang2 === lang2) {
                        add = false;
                        break;
                    }
                }
                if (add) {
                    dictionary.push(new Word(lang1, lang2));
                    restart();
                }
            };

            getWords = function () {
                return dictionary;
            };
        
            getRate = function () {
                var miss = 0, hit = 0, i;
                
                for (i = 0; i < dictionary.length; i++) {
                    miss += dictionary[i].countMiss;
                    hit += dictionary[i].countHit;
                }
                
                for (i = 0; i < dictDone.length; i++) {
                    miss += dictDone[i].countMiss;
                    hit += dictDone[i].countHit;
                }
                
                i = miss + hit;
                
                if (i === 0) {
                    return 0;
                }
                
                return hit / i;
            };
        
            setHitCount = function (count) {
                repeatCount = count;
            };
        
            getResults = function () {
                var i;
                
                for (i = 0; i < dictDone.length; i++) {
                    dictDone[i].rate = Math.round(100 * dictDone[i].countHit / (dictDone[i].countHit + dictDone[i].countMiss));
                }
                
                dictDone.sort(function (a, b) {
                    return a.rate > b.rate;
                });
                
                return dictDone;
            };
        
            loadAnimals = function () {
                dictionary.push(new Word("cat", "kočka"));
                dictionary.push(new Word("tiger", "tygr"));
                dictionary.push(new Word("dog", "pes"));
                dictionary.push(new Word("cow", "kráva"));
                dictionary.push(new Word("sheep", "ovce"));
                dictionary.push(new Word("snake", "had"));
                dictionary.push(new Word("parrot", "papoušek"));
                dictionary.push(new Word("elephant", "slon"));
                dictionary.push(new Word("roly-poly", "svinka"));
                dictionary.push(new Word("rabbit", "králík"));
                dictionary.push(new Word("giraffe", "žirafa"));
                dictionary.push(new Word("duck", "kachna"));
                dictionary.push(new Word("turkey", "krocan"));
                dictionary.push(new Word("monkey", "opice"));
                dictionary.push(new Word("chicken", "kuře"));
                dictionary.push(new Word("squirrel", "veverka"));
                dictionary.push(new Word("lion", "lev"));
                dictionary.push(new Word("bear", "medvěd"));
                dictionary.push(new Word("zebra", "zebra"));
                dictionary.push(new Word("kangaroo", "klokan"));
                dictionary.push(new Word("deer", "jelen"));
                dictionary.push(new Word("fish", "ryba"));
                dictionary.push(new Word("bird", "pták"));
                dictionary.push(new Word("ant", "mravenec"));
                dictionary.push(new Word("pig", "prase"));
                dictionary.push(new Word("rhinoceros", "nosorožec"));
                dictionary.push(new Word("shark", "žralok"));
                dictionary.push(new Word("swan", "labuť"));
                dictionary.push(new Word("turtle", "želva"));
                dictionary.push(new Word("hamster", "křeček"));
                dictionary.push(new Word("rat", "krysa"));
                dictionary.push(new Word("mouse", "myš"));
                dictionary.push(new Word("guinea-pig", "morče"));
                dictionary.push(new Word("fox", "liška"));
                dictionary.push(new Word("spider", "pavouk"));
                dictionary.push(new Word("bat", "netopýr"));
                dictionary.push(new Word("goat", "koza"));
                dictionary.push(new Word("stork", "čáp"));
                dictionary.push(new Word("owl", "sova"));
                dictionary.push(new Word("camel", "velbloud"));
                dictionary.push(new Word("horse", "kůň"));
                dictionary.push(new Word("butterfly", "motýl"));
                dictionary.push(new Word("ladybug", "beruška"));
                dictionary.push(new Word("panda", "panda"));
                dictionary.push(new Word("eagle", "orel"));
                dictionary.push(new Word("pigeon", "holub"));
                dictionary.push(new Word("lizard", "ještěrka"));
                dictionary.push(new Word("octopus", "chobotnice"));
                dictionary.push(new Word("frog", "žába"));
                dictionary.push(new Word("seal", "tuleň"));
                dictionary.push(new Word("dolphin", "delfín"));
                restart();
            };
            
            loadColors = function () {
                dictionary.push(new Word("red", "červená"));
                dictionary.push(new Word("blue", "modrá"));
                dictionary.push(new Word("black", "černá"));
                dictionary.push(new Word("white", "bílá"));
                dictionary.push(new Word("brown", "hnědá"));
                dictionary.push(new Word("grey", "šedá"));
                dictionary.push(new Word("purple", "fialová"));
                dictionary.push(new Word("yellow", "žlutá"));
                dictionary.push(new Word("green", "zelená"));
                dictionary.push(new Word("orange", "oranžová"));
                dictionary.push(new Word("pink", "růžová"));
                dictionary.push(new Word("gold", "zlatá"));
                dictionary.push(new Word("silver", "stříbrná"));
                restart();
            };
        
            removeDictionary = function () {
                dictDone = [];
                dictionary = [];
                private_started = false;
            };

            return {
                addWord: addWord,
                getWords: getWords,
                repeatCount: repeatCount,
                getNextRandom: getNextRandom,
                removeWord: removeWord,
                getCount: getCount,
                restart: restart,
                setMiss: setMiss,
                setHit: setHit,
                getDone: getDone,
                setStarted: setStarted,
                getStarted: getStarted,
                getRate: getRate,
                getLangSwitch: getLangSwitch,
                setLangSwitch: setLangSwitch,
                setHitCount: setHitCount,
                getSomeWord: getSomeWord,
                getResults: getResults,
                loadColors: loadColors,
                loadAnimals: loadAnimals,
                removeDictionary: removeDictionary
            };

        });
    
        

}());