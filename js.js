//https://www.sitepoint.com/using-fourier-transforms-web-audio-api/
var A = 440;
var notes = ["A", "A#/Bb", "B",     "C",     "C#/Db", "D",     "D#/Eb", "E",     "F",     "F#/Gb", "G",     "G#"];
var freqs = [440, 466.164, 493.883, 523.252, 554.366, 293.665, 311.127, 329.628, 349.228, 369.994, 391.995, 415.305];
var cents = 1200; //number of cents they heard correctly
var duration = 1; //how long to play the notes? in seconds
var intermission = .1; //how long between notes? in seconds
var lastNote = 440;
var higher = true;
var debug = true;
var bestCents;
var instruments;

var audioContext = new (window.AudioContext || window.webkitAudioContext)();

var gainNode1 = audioContext.createGain();
var gainNode2 = audioContext.createGain();
gainNode1.connect(audioContext.destination);
gainNode2.connect(audioContext.destination);
gainNode1.gain.value = 0.07;
gainNode2.gain.value = 0.07;

$(function(){
	init();
});

function playNotes(repeat){
	//place balls
	var percentDone = 1.0-(cents/1200.0);
	$("#topball").css("top", (10-(percentDone*95)+"vh"));
	$("#topball").css("width", (35+(percentDone*100)+"vh"));
	$("#topball").css("height", (35+(percentDone*100)+"vh"));
	$("#bottomball").css("bottom", (10-(percentDone*95)+"vh"));
	$("#bottomball").css("width", (35+(percentDone*100)+"vh"));
	$("#bottomball").css("height", (35+(percentDone*100)+"vh"));

	//color balls
	var randomColor = Math.floor(Math.random() * (360.0 - 0.0 + 1.0)) + 0.0;

	var percectColor = randomColor + ((1.0-percentDone)*180.0);
	if(Math.abs(percectColor - randomColor) < 1) percectColor = randomColor + 1;
	var colorString = "hsl("+percectColor+", 100%, 50%)";

	$("#topball").css("background-color", colorString);
	$("#bottomball").css("background-color", "hsl("+randomColor+", 100%, 50%)");

	//same or different
	//pick a starting note
	if(!repeat){
		var picker = Math.floor(Math.random() * (11 - 0 + 1)) + 0;
		var note1 = freqs[picker];
		higher = Math.round(Math.random());
		lastNote = note1;
	} else{
		var note1 = lastNote;
	}

	//pick a timbre

	//play first note
	var osc1 = audioContext.createOscillator();
	osc1.type = 'square';
	osc1.frequency.value = note1;
	var r = Math.floor(Math.random()*instruments.length);
	osc1.setPeriodicWave(instruments[r].wave);
	osc1.connect(gainNode1);
	osc1.start();
	osc1.stop(audioContext.currentTime + duration);

	//play second note after delay
	var osc2 = audioContext.createOscillator();
	osc2.type = 'triangle';
	osc2.frequency.value = note1;
	if(higher<1){
		osc2.detune.value = -1*cents;
		var direction = "down";
	}
	else{
		osc2.detune.value = cents;
		var direction = "up";
	}
	r = Math.floor(Math.random()*instruments.length);
	osc2.setPeriodicWave(instruments[r].wave);
	osc2.connect(gainNode2);
	osc2.start(audioContext.currentTime + duration + intermission);
	osc2.stop(audioContext.currentTime +intermission+ duration + duration);

	//debug
	$("#cents").html(""+cents);
	//$("#direction").html(""+direction);
	$("#note").html(notes[picker]);
}

function init(){
	instruments = [
		{
			"name":"Bass_Amp360",
			"var":Bass_Sub_Dub_2
		},
		{
			"name":"Bass_Fuzz",
			"var":Bass_Fuzz
		},
		{
			"name":"Bass_Fuzz_2",
			"var":Bass_Fuzz_2
		},
		{
			"name":"Bass_Sub_Dub_2",
			"var":Bass_Sub_Dub_2
		},
		{
			"name":"Bass_Sub_Dub",
			"var":Bass_Sub_Dub
		},
		{
			"name":"Bass",
			"var":Bass
		},
		{
			"name":"Brass",
			"var":Brass
		},
		{
			"name":"Brit_Blues_Driven",
			"var":Brit_Blues_Driven
		},
		{
			"name":"Brit_Blues",
			"var":Brit_Blues
		},
		{
			"name":"Buzzy_1",
			"var":Buzzy_1
		},
		{
			"name":"Buzzy_2",
			"var":Buzzy_2
		},
		{
			"name":"Celeste",
			"var":Celeste
		},
		{
			"name":"Chorus_Strings",
			"var":Chorus_Strings
		},
		{
			"name":"Dissonant_1",
			"var":Dissonant_1
		},
		{
			"name":"Dissonant_2",
			"var":Dissonant_2
		},
		{
			"name":"DissonantPiano",
			"var":DissonantPiano
		},
		{
			"name":"Dyna_EP_Bright",
			"var":Dyna_EP_Bright
		},
		{
			"name":"Dyna_EP_Med",
			"var":Dyna_EP_Med
		},
		{
			"name":"Ethnic_33",
			"var":Ethnic_33
		},
		{
			"name":"Full_1",
			"var":Full_1
		},
		{
			"name":"Full_2",
			"var":Full_2
		},
		{
			"name":"Guitar_Fuzz",
			"var":Guitar_Fuzz
		},
		{
			"name":"Harsh",
			"var":Harsh
		},
		{
			"name":"Mkl_Hard",
			"var":Mkl_Hard
		},
		{
			"name":"Organ_2",
			"var":Organ_2
		},
		{
			"name":"Organ_3",
			"var":Organ_3
		},
		{
			"name":"Phoneme_ah",
			"var":Phoneme_ah
		},
		{
			"name":"Phoneme_bah",
			"var":Phoneme_bah
		},
		{
			"name":"Phoneme_ee",
			"var":Phoneme_ee
		},
		{
			"name":"Phoneme_o",
			"var":Phoneme_o
		},
		{
			"name":"Phoneme_ooh",
			"var":Phoneme_ooh
		},
		{
			"name":"Phoneme_pop_ahhhs",
			"var":Phoneme_pop_ahhhs
		},
		{
			"name":"Piano",
			"var":Piano
		},
		{
			"name":"Putney_Wavering",
			"var":Putney_Wavering
		},
		{
			"name":"Throaty",
			"var":Throaty
		},
		{
			"name":"Trombone",
			"var":Trombone
		},
		{
			"name":"Twelve_OpTines",
			"var":Twelve_OpTines
		},
		{
			"name":"TwelveStringGuitar1",
			"var":TwelveStringGuitar1
		},
		{
			"name":"Wurlitzer_2",
			"var":Wurlitzer_2
		},
		{
			"name":"Wurlitzer",
			"var":Wurlitzer
		}
		
	];
	for (var i = instruments.length - 1; i >= 0; i--) {
		instruments[i].real = Float32Array.from(instruments[i].var.real);
		instruments[i].imag = Float32Array.from(instruments[i].var.imag);
		instruments[i].wave = audioContext.createPeriodicWave(instruments[i].real, instruments[i].imag);
	};

	$("#topball").on('mouseup touchup', function(){
		//top ball touch up
		if(higher){
			win();
		}
		else{
			lose();
		}
	});
	$("#bottomball").on('mouseup touchup', function(){
		//bottom ball touch up
		if(!higher){
			win();
		}
		else{
			lose();
		}
	});
	$("#replay").on('mouseup touchup', function(){
		//replay?
		playNotes(true);
	});

	//get best cents
	if(!localStorage.getItem("bestCents")){
		localStorage.setItem("bestCents", 1200);
		cents = 1200;
	}
	else{
		bestCents = localStorage.getItem("bestCents");
		cents = bestCents*3;
	}
	if(debug) cents = 1200;
	$("#bestCents").html(""+bestCents);

	//place balls

	playNotes();
}

function win(){
	console.log("correct");
	if(cents < bestCents){
		localStorage.setItem("bestCents", cents);
		$("#bestCents").html(""+cents);
	}
	cents = getNewCents("won");
	playNotes();
}

function lose(){
	cents = getNewCents("lost");
	console.log("wrong");
	playNotes();
}

function getNewCents(won){
	if(won == "won"){
		if(cents > 100) newCents = cents-100;
		else newCents = cents/2.0;
	}
	else{
		if(cents>100) newCents = cents + 200;
		else newCents = cents*1.5;
	}
	return newCents;
}