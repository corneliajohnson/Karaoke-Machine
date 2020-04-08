
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
 // mic = new p5.AudioIn();
  song.play();
}

//Pause Song
function pauseSong() {
  song.pause();
}



//MICROPHONE CONTROL
let mic;
let volumeHistory = [];

function setup()
{
  let canvas = document.querySelector('.canvas');
  //createCanvas(400, 400);
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  //background(0);
  let volume = mic.getLevel();
  volumeHistory.push(volume);

  stroke(255);
  noFill();

  let currentY = map(volume, 0, 1, height, 0);

  translate(0, -height / 2 + currentY);
  beginShape();

  for (let i = 0; i < volumeHistory.length; i++) {
    let y = map(volumeHistory[i], 0, 1, height, 0);
    vertex(i, y);
  }

  endShape();

  if (volumeHistory.length > width) {
    volumeHistory.splice(0, 1);
  }

  //console.log(volume);
}
