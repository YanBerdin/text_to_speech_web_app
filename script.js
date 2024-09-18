// synth : Référence l’objet speechSynthesis, responsable de la génération de la voix synthétisée
const synth = window.speechSynthesis;

const inputForm = document.querySelector("form");
const inputTxt = document.querySelector(".txt");
const voiceSelect = document.querySelector("select");

const pitch = document.querySelector("#pitch"); // Récupère l'input de type range
const pitchValue = document.querySelector(".pitch-value"); // Affiche la valeur du pitch
const rate = document.querySelector("#rate"); // Récupère l'input de type range
const rateValue = document.querySelector(".rate-value"); // Affiche la valeur du rate

// stock la liste des voix disponibles à partir de l'API SpeechSynthesis
let voices = [];

/**
 *
 * @returns {SpeechSynthesisVoice} La voix par défaut sélectionnée
 * @description Remplit la liste déroulante des voix disponibles et retourne la voix par défaut
 * @see https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
 *
 */
function populateVoiceList() {
  voices = synth.getVoices(); // Récupère les voix disponibles
  // console.log(voices);
  voiceSelect.innerHTML = ""; // Efface les options précédentes

  const defaultVoiceName = "Microsoft Paul - French (France)";
  let selectedVoice = null;

  // Parcourt la liste des voix et crée une option pour chaque voix
  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    // option.textContent = voices[i].name + " (" + voices[i].lang + ")";
    option.textContent = `${voices[i].name} (${voices[i].lang})`;

    // Si la voix est par défaut, ajoute un indicateur
    if (voices[i].default) {
      option.textContent += " -- DEFAULT";
    }
    // Définit les attributs pour chaque voix (langue et nom)
    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);

    // Ajoute l'option à la liste déroulante
    voiceSelect.appendChild(option);

    // Si cette voix correspond à celle voulue par défaut
    if (voices[i].name === defaultVoiceName) {
      option.selected = true; // Sélectionner cette voix
      selectedVoice = voices[i];
    }
  }

  // Si aucune voix n'est trouvée, choisir la première voix française ou la première voix disponible par défaut
  if (!selectedVoice) {
    selectedVoice =
      voices.find((voice) => voice.lang.startsWith("fr")) || voices[0];
    // Trouve la première voix française ou la première voix disponible
    const alternativeOption = Array.from(voiceSelect.options).find(
      (option) => option.getAttribute("data-name") === selectedVoice.name
    );
    // Sélectionne la voix alternative
    if (alternativeOption) {
      alternativeOption.selected = true;
    }
  }

  return selectedVoice;
}

// Remplit la liste déroulante des voix disponibles
populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

// Lors de la soumission du formulaire, lire le texte.
inputForm.onsubmit = (event) => {
  event.preventDefault();

  // Crée une instance de SpeechSynthesisUtterance qui contient le texte à lire .
  const utterThis = new SpeechSynthesisUtterance(inputTxt.value);
  //  récupère la voix sélectionnée dans la liste déroulante.
  const selectedOption =
    voiceSelect.selectedOptions[0].getAttribute("data-name");

  // Parcourir toutes les voix disponibles
  // Assigner à utterThis.voice la voix sélectionnée.
  for (let i = 0; i < voices.length; i++) {
    if (voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
    }
  }

  // Met à jour la valeur du pitch et du rate
  utterThis.pitch = pitch.value;
  utterThis.rate = rate.value;
  // speak() fourni l’instance utterThis à l’API SpeechSynthesis pour qu'elle soit lue.
  synth.speak(utterThis);

  // Retirer le focus du champ de texte après la soumission
  inputTxt.blur();
};
