const chucknorrisData = [];

async function fetchChuckNorris() {
  const apiUrl = `https://api.chucknorris.io/jokes/random`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    const valueChuck = data.value;

    chucknorrisData.push({ valueChuck });

    // Visa alla påståenden varje gång en ny hämtas
    displayChuckNorris(chucknorrisData);
  } catch (error) {
    console.error("Error fetching: ", error);
  }
}

function displayChuckNorris(chucknorrisData) {
  // Hämta container från HTML
  const chucknorrisContainer = document.getElementById("chucknorrisDiv");

  // Återställ innehållet
  chucknorrisContainer.innerHTML = "";

  // Skapa och lägg till påståenden för varje hämtat påstående
  chucknorrisData.forEach((item) => {
    const chuckNorrisDiv = document.createElement("div");
    chuckNorrisDiv.className = "chucknorrisBox";

    chuckNorrisDiv.innerHTML = `
      <div class="chucknorrisInfo">${item.valueChuck}</div>
    `;

    chucknorrisContainer.appendChild(chuckNorrisDiv);
  });
}

// Hämta fyra olika påståenden om Chuck Norris
fetchChuckNorris();
fetchChuckNorris();
fetchChuckNorris();


