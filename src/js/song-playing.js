
//FOR PLAYING THE SONG
let song = document.createElement('audio');
songChoice();

//Returns Chosen Song File
function songChoice(){
  //TODO add parameter to change song
  return song.setAttribute('src', '/audio_files/ease_your_social.mp3');
}

//Play Song
function playSong() {
  song.play();
}

//Pause Song
function pauseSong() {
  song.pause();
}


//FOR MICROPHONE CONTROL
let mic;
function setup()
{
  createCanvas(200, 200);
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background(0);
  let volume = mic.getLevel();
  
  ellipse(100, 100, volume * 200, volume * 200);
}
