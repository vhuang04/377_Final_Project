document.getElementById("artistForm").addEventListener("submit", function (e) {
  e.preventDefault(); 

  const artistName = document.getElementById("artist_fname").value.trim();
  const apiKey = "04082a95d3d42a143f5505cb89aebba0";
  const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${encodeURIComponent(artistName)}&api_key=${apiKey}&format=json`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML = ""; 

      if (data.similarartists?.artist?.length > 0) {
        data.similarartists.artist.slice(0, 10).forEach((artist) => {
          const item = document.createElement("p");
          item.textContent = artist.name;
          resultsDiv.appendChild(item);
        });
      } else {
        resultsDiv.textContent = "No similar artists found.";
      }
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("results").textContent = "Error fetching results.";
    });
});

document.getElementById("clearBtn").addEventListener("click", function () {
  document.getElementById("artist_fname").value = "";
  document.getElementById("results").innerHTML = "";
});

document.getElementById("artistForm").addEventListener("submit", function (e) {
  e.preventDefault(); 

  const artistName = document.getElementById("artist_fname").value.trim();
  const apiKey = "04082a95d3d42a143f5505cb89aebba0";
  const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${encodeURIComponent(artistName)}&api_key=${apiKey}&format=json`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML = ""; 

      if (data.similarartists?.artist?.length > 0) {
        data.similarartists.artist.slice(0, 10).forEach((artist) => {
          const item = document.createElement("p");
          item.textContent = artist.name;
          resultsDiv.appendChild(item);
        });
      } else {
        resultsDiv.textContent = "No similar artists found.";
      }
    })
    .catch((err) => {
      console.error(err);
      document.getElementById("results").textContent = "Error fetching results.";
    });
});

document.getElementById("clearBtn").addEventListener("click", function () {
  document.getElementById("artist_fname").value = "";
  document.getElementById("results").innerHTML = "";
});