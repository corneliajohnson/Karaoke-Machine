// import
//import Lyric from 'lrc-file-parser'


//FOR PLAYING THE SONG
let song = document.createElement('audio');
let liveTime;

songChoice();

//Returns Chosen Song File
function songChoice(){
  //TODO add parameter to change song
  song.setAttribute('src', '/audio_files/ease_your_social.mp3');
  song.setAttribute('onloadedmetadata', 'songTime()'); //for song load
  song.setAttribute('preload', 'metadata');
  return song;
}

//Play Song
function playSong() {
 // mic = new p5.AudioIn();
  song.play();
  timeControl()
}

//Pause Song
function pauseSong() {
  song.pause();
  clearInterval(liveTime);
}

//funtion to control the time
function timeControl ()
{
  liveTime = setInterval(songTime, 1000);
}

let time = 0;
//GET TIME OF THE MP3
function songTime() {
  let songDuration = song.duration;
  if(time == 0){
    time += parseInt(Math.floor(songDuration));
  }
  let minutes = parseInt(Math.floor(time/60));
  let seconds = Math.floor(time % 60);
  
  seconds = seconds < 10 ? '0' + seconds : seconds;
 
  //decrease time
  time--;
  document.querySelector('.time').innerHTML = `${minutes} : ${seconds}`;

}


//TODO FIGURE OUT HOW TO LOAD AN LRC FILE
//TO SYNC LRC FILE WITH AUDIO MP3




//MICROPHONE CONTROL
console.clear();

const audioCtx = new AudioContext();
const numberOfNodes = 256;
const data = new Uint8Array(numberOfNodes * 4);

const elVisualizer = document.querySelector('.canvas');

const elNodes = Array.from({ length: numberOfNodes }, (n,i)=> {
  let node = document.createElement('div');
  node.className = 'node';
  node.style.setProperty('--i',i);
  elVisualizer.appendChild(node);
  return node;
});

const analyserNode = new AnalyserNode(audioCtx, {
  fftSize: Math.max(numberOfNodes * 4, 32),
  maxDecibels: -20,
  minDecibels: -80,
  smoothingTimeConstant: 0.8
});

function updateVisualizer(){
  requestAnimationFrame(updateVisualizer);
  
  analyserNode.getByteFrequencyData(data);

  elNodes.forEach( (node,i) => {
    node.style.setProperty('--c', data[i]);
    node.style.setProperty(
      '--level', 
      (data[i] / 255) 
      // Attempt a log-ish scale for sensitivity in higher registers
      * (1 + (i / numberOfNodes))
    );
  });
  
  //window.volume.textContent = Math.round( (data[0] / 255) * 10) / 10;
  
}

function startStream(){
  window.volume.innerHTML = ' &nbsp; ';
  
  return navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
  .then( stream => audioCtx.createMediaStreamSource(stream) )
  .then( source => {
    source.connect(analyserNode);
  }).then(updateVisualizer);
        
}

// Have to initialize via a user event
document.addEventListener('click', ()=>{
  audioCtx.resume();
  startStream();
});
