// 1. Live klocka
function updateClock() {
  let time = new Date();
  // Får fram nuvarande tiden
  const currentTimeBox = document.getElementById("currentTime");

  // Skickar ut det till html dokumentet
  currentTimeBox.innerText = time.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// 1. Live datum
function updateDate() {
  let date = new Date();

  const monthList = [
    "Januari",
    "Februari",
    "Mars",
    "April",
    "Maj",
    "Juni",
    "Juli",
    "Augusti",
    "Septeber",
    "Oktober",
    "November",
    "December",
  ];

  const currentDateBox = document.getElementById("currentDate");
  currentDateBox.innerText =
    date.getDate() +
    " " +
    monthList[date.getMonth()] +
    " " +
    date.getFullYear();
}
setInterval(updateDate, 60000);
updateDate();

// https://api.unsplash.com/photos/dark-neon?orientation=landscape?client_id=AZEWWmFqjiio-lu2GxoUaRUwlPKYBJZneshjVdUm4R4

// 2. Klicka på dashboard namnet för att redigera texten

document.addEventListener("DOMContentLoaded", function () {
  const editableText = document.getElementById("editableText");

  // Ladda innehållet från localStorage
  editableText.innerText =
    localStorage.getItem("userText") || "John Does Dashboard";

  function enableEditing() {
    editableText.contentEditable = "true";
    // Spara texten i localStorage
    editableText.addEventListener("input", function () {
      localStorage.setItem("userText", this.innerText) || "John Does Dashboard";
      this.spellcheck = false;
    });

    // Använder mig av en eventlistener för att undvika konflikt med contenteditable
    editableText.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault(); // Förhindrar radbrytning vid klick av enter
        this.blur(); // Avfokuserar texten
      }
    });
  }
  enableEditing();
  editableText.addEventListener("click", enableEditing);
});

// 3. Låt användare skapa egna länkar

function togglePopup() {
  const popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

function stopPropagation(event) {
  event.stopPropagation();
}

function addLink() {
  let linkName = document.getElementById("linkName").value;
  let linkDomain = document.getElementById("linkDomain").value;

  const displayLinks = document.getElementById("displayLinks");

  const newLinkItem = document.createElement("li");

  newLinkItem.innerHTML = `
  <img height="28" width="28" src='http://www.google.com/s2/favicons?domain=www.${linkName}' />
  <a href="https://www.${linkName}" target="_blank">${linkDomain}</a>
  <i class="fa-regular fa-circle-xmark" onclick="removeLink(this)"></i>
  `;
  displayLinks.appendChild(newLinkItem);

  // Rensa input fältet efter att länken har använts
  document.getElementById("linkName").value = "";
  document.getElementById("linkDomain").value = "";
}

// Tar bort den önskade länken
function removeLink(element) {
  const listItem = element.closest("li");
  listItem.remove();
}
