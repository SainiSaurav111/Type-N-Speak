// Init SpeechSynth API
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

//Browser identifier
// Firefox 1.0+
// var isFirefox = typeof InstallTrigger !== 'undefined';

// // Chrome 1+
// var isChrome = !!window.chrome && !!window.chrome.webstore;

// Init voices array
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();


  // Loop through voices and create an option for each one
  voices.forEach(voice => {
    // Create option element
    const option = document.createElement('option');
    // Fill option with voice and language
    option.textContent = voice.name + '(' + voice.lang + ')';

    // Set needed option attributes
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);
  });
};
getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}
const speak = ()  => {


// body.style.background= '#34c3d5';
        


  if(synth.speaking){
    console.error('Already speaking ...');
    return ;
  }
  if(textInput.value !== ''){
    body.style.background  ='#141414 url(img/wave.gif)';
    body.style.backgroundRepeat = 'repeat-x';
    body.style.backgroundSize ='100% 100%';

    const speakText = new SpeechSynthesisUtterance(textInput.value);
    speakText.onend = e =>{
      console.log('Done speaking...');
      body.style.background= '#34c3d5';
     
    }
    speakText.onerror = e => {
      console.error('Something went wrong ');

    }
     const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
       voices.forEach(voice => {
        if(voices.name === selectedVoice){
          speakText.voice = voice;
        }
       });
       speakText.rate = rate.value;
       speakText.pitch = pitch.value;
       synth.speak(speakText);
  }

};
textForm.addEventListener('submit' , e => {
  e.preventDefault();
  speak();
  textInput.blur();
});


rate.addEventListener('change' , e => (rateValue.textContent = rate.value));

   //voiceSelect.addEventListener('change' , e =>speak() ); 


   pitch.addEventListener('change' , e => (pitchValue.textContent = pitch.value));

   
   voiceSelect.addEventListener('change' , e =>speak() ); 