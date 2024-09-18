const synth = window.speechSynthesis;

const inputForm = document.querySelector("form");
const inputTxt = document.querySelector(".txt");
const voiceSelect = document.querySelector("select");

const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector(".pitch-value");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector(".rate-value");

let voices = [];
/**
 * 
 * @returns {SpeechSynthesisVoice} La voix par défaut
 * @description Remplit la liste déroulante des voix disponibles et retourne la voix par défaut
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisVoice
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/getVoices
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/voice
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/pitch
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/rate
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/text
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/speak
 * 
 */
function populateVoiceList() {
  voices = synth.getVoices();
  console.log(voices); //TODO: Remove
  voiceSelect.innerHTML = ""; // Efface les options précédentes

  const defaultVoiceName = "Microsoft Paul - French (France)";
  let selectedVoice = null;

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    // option.textContent = voices[i].name + " (" + voices[i].lang + ")";
    option.textContent = `${voices[i].name} (${voices[i].lang})`;

    if (voices[i].default) {
      option.textContent += " -- DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);

    // Ajoute l'option dans la liste déroulante
    voiceSelect.appendChild(option);

    // Si cette voix correspond à celle que tu veux par défaut
    if (voices[i].name === defaultVoiceName) {
      option.selected = true; // Sélectionne cette voix par défaut
      selectedVoice = voices[i];
    }
  }

  // Si la voix par défaut n'est pas trouvée, choisissez une alternative
  if (!selectedVoice) {
    selectedVoice =
      voices.find((voice) => voice.lang.startsWith("fr")) || voices[0];
    const alternativeOption = Array.from(voiceSelect.options).find(
      (option) => option.getAttribute("data-name") === selectedVoice.name
    );
    if (alternativeOption) {
      alternativeOption.selected = true;
    }
  }

  return selectedVoice;
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

inputForm.onsubmit = (event) => {
  event.preventDefault();

  const utterThis = new SpeechSynthesisUtterance(inputTxt.value);
  const selectedOption =
    voiceSelect.selectedOptions[0].getAttribute("data-name");

  // Recherche de la voix sélectionnée
  for (let i = 0; i < voices.length; i++) {
    if (voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
    }
  }

  utterThis.pitch = pitch.value;
  utterThis.rate = rate.value;
  synth.speak(utterThis);

  inputTxt.blur();
};
