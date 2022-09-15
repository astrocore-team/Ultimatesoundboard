document.addEventListener("DOMContentLoaded", function(){  // When the page is loaded
    if (localStorage.getItem('hasshown') == null) {  // If the user has not seen the message
        location.assign('#welcometoultimate')  // Go to the welcome page
        localStorage.setItem('hasshown', true)  // Set the hasshown variable to true
    } 
    Favouritenumber = localStorage.getItem('FavNumber'); // Get the favourite number from local storage
    if (localStorage.getItem("speed") != null) {
        var slider = document.getElementById("myRange").value = parseInt(localStorage.getItem("speed")); // Get the speed from local storage and set it to the slider
        var sounds = document.getElementsByTagName('audio'); // Get all the audio tags
        for(i=0; i<sounds.length; i++) sounds[i].playbackRate=localStorage.getItem("speed"); // Set the playback rate of all the audio tags to the speed from local storage
    }
    var theme = localStorage.getItem("theme"); // Get the theme from local storage
    if (theme != null) { // If the theme is not null
        var themeslider = document.getElementById('theme').href = localStorage.getItem("theme"); // Set the theme to the theme from local storage
    }
    var checbox = localStorage.getItem("keepplaying"); // Get the keep playing from local storage
    if (checbox != null) { // If the keep playing is not null
        if (checbox == "#") { // If the keep playing is true
            var checckbox = document.getElementById("close").href = "#" // Set the checkbox to true
            var checckbox = document.getElementById("SoundPlay").checked = true;   // Set the checkbox to true
            keepplaying = true // Set the keep playing to true
        }
        else if (checbox == "/") { // If the keep playing is false
            var checckbox = document.getElementById("close").href = "/"
            var checckbox = document.getElementById("SoundPlay").checked = false;
            keepplaying = false
        }
    }

    var nsfwsoundscookie = localStorage.getItem("nsfwsoundscookie");
    if (nsfwsoundscookie != null) { // If the keep playing is not null
        if (nsfwsoundscookie == "true") { // If the keep playing is true
            var nsfwcheckbox = document.getElementById("NSFWSounds").checked = true;   // Set the checkbox to true
            nsfwsounds = true // Set the NSFW Sounds Showing to true
        }
        else if (checbox == "false") { // Set the NSFW Sounds Showing to true
            var nsfwcheckbox = document.getElementById("NSFWSounds").checked = false;
            nsfwsounds = false
        }
    }
});
   
function toggleTheme(value) { 
  var sheets = document.getElementsByTagName('link');
  localStorage.setItem("theme", value);

  sheets[0].href = value;
}

function myFunction() {
let input = document.getElementById('searchbar').value
input=input.toLowerCase();
let x = document.getElementsByClassName('Button');

for (i = 0; i < x.length; i++) { 
    if (!x[i].innerHTML.toLowerCase().includes(input)) {
        x[i].style.display="none";
    }
    else {
        x[i].style.display="unset";                 
    }
}
}

//Text to speech function
const speech = new SpeechSynthesisUtterance();
function tts() {
    //Stopping all sounds
    Stop_all()
    //Checking if enter key was pressed
    if(event.keyCode == 13) {
      let input = document.getElementById('texttospeech').value
      speech.text = input;
      //Stopping tts for russia
      if (input.toLowerCase() == 'russia is better than ukraine'){
          Talking_Ben_No()
          return
      }
      else {
        //Speak Speech
        window.speechSynthesis.speak(speech);
      }
    }
}

//Frequancy Generator
var osc = null;
var playing = false;
function freq() {
    //Declaring Variables
    var context = null;
    var usingWebAudio = true;
    //Declaring Audio Context
    if (typeof AudioContext !== 'undefined') {
        context = new AudioContext();
    } else if (typeof webkitAudioContext !== 'undefined') {
        context = new webkitAudioContext();
    } else {
        usingWebAudio = false;
    }
    //Getting input box value
    let freq = document.getElementById('Frequency').value;
    //Checking if enter key was pressed
    if(event.keyCode == 13) {
        //If already playing, stop
        if (playing == true) {
            osc.stop(0);
            playing = false;
          }
        //If not playing, start playing
        else {
            Stop_Sounds()
            osc = context.createOscillator();
            osc.connect(context.destination);
            osc.frequency.value = freq;
            osc.start(0);
            playing = true;
          }
    }
}

//Stopping everything
function Stop_all(){
    //Stops frequency
    if (osc != null) {
        osc.stop(0);
        playing = false;
    }
    //Stops tts
    speechSynthesis.cancel();
    //Stops all sound effects
    var sounds = document.getElementsByTagName('audio');
    for(i=0; i<sounds.length; i++) sounds[i].pause();
    for(i=0; i<sounds.length; i++) sounds[i].currentTime=0;
}

//Stopping all sounds
function Stop_Sounds(){
    //Stops text to speech
    speechSynthesis.cancel();
    //Gets all audios and stops them
    var sounds = document.getElementsByTagName('audio');
    for(i=0; i<sounds.length; i++) sounds[i].pause();
    for(i=0; i<sounds.length; i++) sounds[i].currentTime=0;
}

//Speed Function
function sliderfunction() {
    //Grabs Speed Slider
    var slider = document.getElementById("myRange");
    localStorage.setItem("speed", slider.value);
    //Sets audio speed to the sliders value
    var sounds = document.getElementsByTagName('audio');
    for(i=0; i<sounds.length; i++) sounds[i].playbackRate=slider.value;
};

//Changing Volume of sounds
function volumefunction() {
    //Getting Slider for volume
    var volume = document.getElementById("Volume");
    localStorage.setItem("volume", volume.value/10);
    //Setting Volume for all sounds
    var sounds = document.getElementsByTagName('audio');
    for(i=0; i<sounds.length; i++) sounds[i].volume=volume.value/10
};

//play all sounds at once
function AllSounds(){
    var sounds = document.getElementsByTagName('audio');
    for(i=0; i<sounds.length; i++) sounds[i].play();
}

//Toggling Dropdown Menu
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

//Toggling if keep playing on settings close
var keepplaying = false
function SoundPlay() {
    //If that setting is false...
    if (keepplaying == false) {
        //It will set it to True
        var checckbox = document.getElementById("close").href = "#"
        localStorage.setItem("keepplaying", "#");
        keepplaying = true
    }
    //If that setting is true...
    else if (keepplaying == true) {
        //It will set it to False
        var checckbox = document.getElementById("close").href = "/"
        localStorage.setItem("keepplaying", "/");
        keepplaying = false
    }
}

//Toggling Dropdown Menu
function dropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

//Playing a Sound.
//First it will grab the element passed
function playsound(sound) {
    //stopping all other sounds
    Stop_all()
    //Playing Sounds
    sound.getElementsByTagName("audio")[0].currentTime=0;
    sound.getElementsByTagName("audio")[0].play();
}

var nsfwsounds = false;
function NSFWSounds() {
    //If that setting is false...
    if (nsfwsounds == false) {
        //It will set it to True
        var nsfw = document.getElementsByClassName('NSFW');
        for(i=0; i<nsfw.length; i++) nsfw[i].style.display="unset";
        localStorage.setItem("nsfwsoundscookie", "true");
        nsfwsounds = true
    }
    //If that setting is true...
    else if (nsfwsounds == true) {
        //It will set it to False
        var nsfw = document.getElementsByClassName('NSFW');
        for(i=0; i<nsfw.length; i++) nsfw[i].style.display="none";
        localStorage.setItem("nsfwsoundscookie", "false");
        nsfwsounds = false
    }
}
function RandomSound() {
    Stop_all()
    if (nsfwsounds = false) {
        let nsfwelements = document.getElementsByTagName('audio').querySelectorAll('span:not([NSFW])');
        let arrayOfElements = Array.from(nsfwelements);
        var item = arrayOfElements[Math.floor(Math.random()*arrayOfElements.length)];
        item.play()
    } else {
        let nsfwelements = document.getElementsByTagName('audio');
        let arrayOfElements = Array.from(nsfwelements);
        var item = arrayOfElements[Math.floor(Math.random()*arrayOfElements.length)];
        item.play()
    }
}