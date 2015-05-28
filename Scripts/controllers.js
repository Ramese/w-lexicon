/*jslint browser: true*/
/*global $, jQuery, angular, console, FileReader, Audio */
/*jslint plusplus: true */

(function () {
    'use strict';
    
    angular.module('app.controllers', ['ngFileUpload'])

        .controller('MainCtrl', ['$scope', 'dictService', '$rootScope', function ($scope, dictService, $rootScope) {
            
            $rootScope.rotate = 0;
            $rootScope.rotatePosition = 0;
            $rootScope.translate = 0;

            $rootScope.state = 0;
            $rootScope.title = "Upload | W-Lexicon";
            $scope.started = dictService.getStarted();
            
            $scope.dictionary = dictService.getWords();
            
            $scope.removeWord = function (id) {
                dictService.removeWord(id);
                //$scope.$apply();
            };
            
            function setup_reader(file) {
                var reader = new FileReader(), parseAndAdd;
                
                
                parseAndAdd = function (wordTxt) {
                    var tmp = wordTxt.split(";");

                    if (tmp.length === 2 || (tmp.length === 3 && tmp[2] === "")) {
                        dictService.addWord(tmp[0], tmp[1]);
                    }
                };
                
                if (file.type === "text/plain") {
                    reader.onload = function (e) {
                        var k, text = e.target.result;
                        text = text.split("\n");

                        for (k = 0; k < text.length; k++) {
                            if (text[k] !== "") {
                                //console.log(text[k]);
                                parseAndAdd(text[k]);
                                $scope.$apply();
                            }
                        }
                        //console.log($scope.dictionary);
                    };
                    reader.readAsText(file, "UTF-8");
                } else {
                    console.log("Nenacteny soubor!");
                }
            }
            
            
            $scope.$watch('files', function () {
                $scope.upload($scope.files);
            });
            
            

            $scope.upload = function (files) {
                var file, i = 0;

                if (files && files.length) {
                    for (i = 0; i < files.length; i++) {
                        //console.log(files[i]);
                        setup_reader(files[i]);
                        
                    }
                }
                
            };
            
            $scope.loadAnimals = function () {
                dictService.loadAnimals();
                $scope.started = dictService.getStarted();
            };
            
            $scope.loadColors = function () {
                dictService.loadColors();
                $scope.started = dictService.getStarted();
            };
            
            $scope.removeAll = function () {
                dictService.removeDictionary();
                $scope.dictionary = dictService.getWords();
                //$scope.$apply();
            };
        }])
    
        .controller('LearnCtrl', ['$scope', 'dictService', '$rootScope', function ($scope, dictService, $rootScope) {
            
            
            $rootScope.state = 1;
            $rootScope.title = "Practise | W-Lexicon";
            $scope.dictionary = dictService.getWords();
            $scope.started = dictService.getStarted();
            $scope.langSwitch = dictService.getLangSwitch();
            $scope.example = "Choose dict first ...";
            $scope.rate = Math.round(dictService.getRate() * 100);
            $scope.count = dictService.getCount();
            $scope.wordToTranslate = "";
            $scope.phase = "init";
            $scope.hitcount = dictService.repeatCount;
            
            $scope.soundCorrect = [];
            $scope.soundWrong = [];
            $scope.soundFinish = [];
            $scope.audioEnabled = true;
            
            var pathsWav, pathsMp3, tmp, dir = "sounds/", pom;
            
            pathsWav = [ "applause2.wav", "applause6.wav", "applause8.wav", "boo2.wav", "boo3.wav", "boohiss.wav", "umgawa.wav" ];
            pathsMp3 = [ "applause2.wav", "applause6.wav", "applause8.wav", "boo2.wav", "boo3.wav", "boohiss.wav", "umgawa.wav" ];
            
            pom = new Audio().canPlayType("audio/mpeg");
            
            if (pom === "probably") {
                $scope.soundCorrect.push(new Audio(dir + pathsMp3[0]));
                $scope.soundCorrect.push(new Audio(dir + pathsMp3[1]));
                $scope.soundCorrect.push(new Audio(dir + pathsMp3[2]));
                
                $scope.soundWrong.push(new Audio(dir + pathsMp3[3]));
                $scope.soundWrong.push(new Audio(dir + pathsMp3[4]));
                $scope.soundWrong.push(new Audio(dir + pathsMp3[5]));
                
                $scope.soundFinish.push(new Audio(dir + pathsMp3[6]));
            } else {
                pom = new Audio().canPlayType("audio/wav");
                if (pom === "probably") {
                    $scope.soundCorrect.push(new Audio(dir + pathsWav[0]));
                    $scope.soundCorrect.push(new Audio(dir + pathsWav[1]));
                    $scope.soundCorrect.push(new Audio(dir + pathsWav[2]));

                    $scope.soundWrong.push(new Audio(dir + pathsWav[3]));
                    $scope.soundWrong.push(new Audio(dir + pathsWav[4]));
                    $scope.soundWrong.push(new Audio(dir + pathsWav[5]));

                    $scope.soundFinish.push(new Audio(dir + pathsWav[6]));
                } else {
                    pom = new Audio().canPlayType("audio/mpeg");
                    if (pom === "maybe") {
                        $scope.soundCorrect.push(new Audio(dir + pathsMp3[0]));
                        $scope.soundCorrect.push(new Audio(dir + pathsMp3[1]));
                        $scope.soundCorrect.push(new Audio(dir + pathsMp3[2]));

                        $scope.soundWrong.push(new Audio(dir + pathsMp3[3]));
                        $scope.soundWrong.push(new Audio(dir + pathsMp3[4]));
                        $scope.soundWrong.push(new Audio(dir + pathsMp3[5]));

                        $scope.soundFinish.push(new Audio(dir + pathsMp3[6]));
                    } else {
                        pom = new Audio().canPlayType("audio/wav");
                        if (pom === "maybe") {
                            $scope.soundCorrect.push(new Audio(dir + pathsWav[0]));
                            $scope.soundCorrect.push(new Audio(dir + pathsWav[1]));
                            $scope.soundCorrect.push(new Audio(dir + pathsWav[2]));

                            $scope.soundWrong.push(new Audio(dir + pathsWav[3]));
                            $scope.soundWrong.push(new Audio(dir + pathsWav[4]));
                            $scope.soundWrong.push(new Audio(dir + pathsWav[5]));

                            $scope.soundFinish.push(new Audio(dir + pathsWav[6]));
                        } else {
                            $scope.audioEnabled = false;
                        }
                    }
                }
            }
            
            tmp = dictService.getSomeWord();
            
            
            /*var i, pom, pole = [];
            
            var lowerBound = 0;
            var upperBound = 4;
                
            for (i = 0; i < upperBound; i++) {
                pole.push(0);
            }
            
            for (i = 0; i < 1000; i++) {
                pom = Math.floor((Math.random() * upperBound) + lowerBound);
                pole[pom]++;
            }
            
            for (i = 0; i < upperBound; i++) {
                console.log(i + " " + pole[i]);
            }*/
            
            if (dictService.getCount() === 0) {
                $scope.progress = 0;
            } else {
                $scope.progress = Math.round(dictService.getDone() * 100 / dictService.getCount());
            }
            
            if (!dictService.getStarted() && $scope.progress === 100) {
                $scope.phase = "end";
            } else if (dictService.getStarted()) {
                $scope.phase = "try";
                $scope.word = dictService.getNextRandom();
                if (dictService.getLangSwitch()) {
                    $scope.wordToTranslate = $scope.word.lang2;
                } else {
                    $scope.wordToTranslate = $scope.word.lang1;
                }
            }
            
            if (dictService.getCount() === 0) {
                $scope.progress = 0;
            } else {
                $scope.progress = Math.round(dictService.getDone() * 100 / dictService.getCount());
            }
            
            
            if (tmp !== null) {
                $scope.example = tmp.lang1 + " -> " + tmp.lang2;
            }
            
            if ($scope.started === true) {
                $scope.example = "Nothing here";
            }
            
            $scope.playCorrect = function () {
                var lowerBound = 0, upperBound = $scope.soundCorrect.length, i;
                
                if ($scope.audioEnabled) {
                    i = Math.floor((Math.random() * upperBound) + lowerBound);
                    
                    $scope.soundCorrect[i].play();
                }
            };
            
            $scope.playWrong = function () {
                var lowerBound = 0, upperBound = $scope.soundWrong.length, i;
                
                if ($scope.audioEnabled) {
                    i = Math.floor((Math.random() * upperBound) + lowerBound);
                    
                    $scope.soundWrong[i].play();
                }
            };
            
            $scope.playFinish = function () {
                $scope.soundFinish[0].play();
            };
            
            $scope.tryTranslate = function () {
                
                
                if ($scope.phase === "try") {
                    if (dictService.getLangSwitch()) {
                        if ($scope.word.lang1 === $scope.translation) {
                            dictService.setHit($scope.word.id);
                            $scope.phase = "hit";
                            $rootScope.stav = 1;
                            $('text').attr("class", "oki");
                            console.log("oki");
                            $scope.playCorrect();
                        } else {
                            dictService.setMiss($scope.word.id);
                            $scope.phase = "miss";
                            $rootScope.stav = 0;
                            $('text').attr("class", "noki");
                            $scope.playWrong();
                            $scope.translation = $scope.word.lang1;
                        }
                    } else {
                        if ($scope.word.lang2 === $scope.translation) {
                            dictService.setHit($scope.word.id);
                            $scope.phase = "hit";
                            $rootScope.stav = 1;
                            $('text').attr("class", "oki");
                            console.log("oki1");
                            $scope.playCorrect();
                        } else {
                            dictService.setMiss($scope.word.id);
                            $scope.phase = "miss";
                            $('text').attr("class", "noki");
                            $rootScope.stav = 0;
                            $scope.playWrong();
                            $scope.translation = $scope.word.lang2;
                        }
                    }
                    $scope.rate = dictService.getRate();
                    $scope.rate = Math.round($scope.rate * 100);
                    $scope.progress = dictService.getDone() / dictService.getCount();
                    $scope.progress = Math.round($scope.progress * 100);
                } else if ($scope.phase === "miss") {
                    $scope.translation = "";
                    $scope.word = dictService.getNextRandom();
                    if ($scope.word === null) {
                        $scope.phase = "end";
                        $scope.playFinish();
                    } else {
                        $scope.phase = "try";
                        $rootScope.stav = 2;
                        $('text').attr("class", "");
                        if (dictService.getLangSwitch()) {
                            $scope.wordToTranslate = $scope.word.lang2;
                        } else {
                            $scope.wordToTranslate = $scope.word.lang1;
                        }
                    }
                } else if ($scope.phase === "hit") {
                    $scope.translation = "";
                    $scope.phase = "try";
                    $('text').attr("class", "");
                    $scope.word = dictService.getNextRandom();
                    if ($scope.word === null) {
                        $scope.phase = "end";
                        $scope.playFinish();
                    } else {
                        $scope.phase = "try";
                        if (dictService.getLangSwitch()) {
                            $scope.wordToTranslate = $scope.word.lang2;
                        } else {
                            $scope.wordToTranslate = $scope.word.lang1;
                        }
                        
                    }
                }
            };
            
            
            $scope.reset = function () {
                dictService.restart();
                $scope.started = dictService.getStarted();
                $scope.progress = 0;
                $scope.rate = 0;
                if (tmp !== null) {
                    $scope.example = tmp.lang1 + " -> " + tmp.lang2;
                }
            };
            
            $scope.settingsChange = function () {
                dictService.setLangSwitch($scope.langSwitch);
                if (dictService.getLangSwitch() && tmp !== null) {
                    $scope.example = tmp.lang2 + " -> " + tmp.lang1;
                } else if (tmp !== null && !dictService.getLangSwitch()) {
                    $scope.example = tmp.lang1 + " -> " + tmp.lang2;
                } else {
                    $scope.example = "Choose dict first ...";
                }
                
                dictService.setHitCount($scope.hitcount);
                
                //console.log(dictService.repeatCount);
                
            };
            
            $scope.settings = function () {
                $scope.phase = "try";
                dictService.setStarted(true);
                $scope.started = true;
                $scope.word = dictService.getNextRandom();
                if (dictService.getLangSwitch()) {
                    $scope.wordToTranslate = $scope.word.lang2;
                } else {
                    $scope.wordToTranslate = $scope.word.lang1;
                }
                $scope.example = "Nothing here!";
            };
            
        }])
    
        .controller('ResultsCtrl', ['$scope', 'dictService', '$rootScope', function ($scope, dictService, $rootScope) {
            $rootScope.rotate = 0;
            $rootScope.rotatePosition = 0;
            $rootScope.translate = 0;
            
            $rootScope.state = 2;
            $rootScope.title = "Results | W-Lexicon";
            $scope.results = dictService.getResults();
            
            
        }])
    
        .controller('AboutCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
            $rootScope.rotate = 0;
            $rootScope.rotatePosition = 0;
            $rootScope.translate = 0;
            
            $rootScope.title = "About | W-Lexicon";
            $rootScope.state = 3;
        }]);
    
}());
