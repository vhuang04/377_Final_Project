document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "04082a95d3d42a143f5505cb89aebba0";
  
    const artistForm = document.getElementById("artistForm");
    const clearBtn = document.getElementById("clearBtn");
    const artistInput = document.getElementById("artist_fname");
    const resultsDiv = document.getElementById("results");
    const micBtn = document.getElementById("micBtn");
    const micStatus = document.getElementById("micStatus");
  
    let clickedAction = "";
    let isListening = false;
  
    document.getElementById("similarBtn").addEventListener("click", function () {
      clickedAction = "similar";
    });
  
    document.getElementById("songBtn").addEventListener("click", function () {
      clickedAction = "song";
    });
  
    artistForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const artistName = artistInput.value.trim();
      resultsDiv.innerHTML = "Loading...";
  
      if (!artistName) {
        resultsDiv.textContent = "Please enter an artist name.";
        return;
      }
  
      if (clickedAction === "similar") {
        const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${encodeURIComponent(
          artistName
        )}&api_key=${apiKey}&format=json`;
  
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            const artists = data.similarartists?.artist || [];
  
            if (artists.length === 0) {
              resultsDiv.textContent = "No similar artists found.";
              return;
            }
  
            resultsDiv.innerHTML = "<h3>Similar Artists:</h3>";
            artists.slice(0, 10).forEach((artist) => {
              const link = document.createElement("a");
              link.href = artist.url;
              link.target = "_blank";
              link.textContent = artist.name;
              link.style.display = "block";
              resultsDiv.appendChild(link);
            });
          })
          .catch((err) => {
            console.error("Error fetching similar artists:", err);
            resultsDiv.textContent = "Error fetching similar artists.";
          });
      } else if (clickedAction === "song") {
        const url = `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${encodeURIComponent(
          artistName
        )}&api_key=${apiKey}&format=json`;
  
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            let tracks = data.toptracks?.track || [];
            if (!Array.isArray(tracks)) {
              tracks = [tracks];
            }
  
            if (tracks.length === 0) {
              resultsDiv.textContent = "no top tracks found.";
              return;
            }
  
            resultsDiv.innerHTML = "<h3>top tracks by artist:</h3>";
            tracks.slice(0, 10).forEach((track) => {
              const p = document.createElement("p");
              const link = document.createElement("a");
              link.href = track.url;
              link.target = "_blank";
              link.textContent = `${track.name} (${track.playcount} plays)`;
              p.appendChild(link);
              resultsDiv.appendChild(p);
            });
          })
          .catch((err) => {
            console.error("error fetching top tracks:", err);
            resultsDiv.textContent = "error fetching top tracks.";
          });
      }
  
      clickedAction = "";
    });
  
    clearBtn.addEventListener("click", () => {
      artistInput.value = "";
      resultsDiv.innerHTML = "";
    });
  
    //annyang Voice Commands (INSIDE DOMContentLoaded)
    if (window.annyang) {
      const stopAfterCommand = () => {
        annyang.abort();
        isListening = false;
        micStatus.textContent = " command received";
        micBtn.textContent = "🎤 voice Search";
      };
  
      const commands = {
        "find similar artist *name": function (name) {
          artistInput.value = name;
          clickedAction = "similar";
          artistForm.requestSubmit();
          stopAfterCommand();
        },
        "find songs by *name": function (name) {
          artistInput.value = name;
          clickedAction = "song";
          artistForm.requestSubmit();
          stopAfterCommand();
        },
        "clear the field": function () {
          artistInput.value = "";
          resultsDiv.innerHTML = "";
          stopAfterCommand();
        }
      };
  
// cursor animation
const cursor = document.getElementById("custom-cursor");

document.addEventListener("mousemove", (e) => {
  anime({
    targets: cursor,
    left: e.clientX - 10, // center cursor
    top: e.clientY - 10,
    duration: 300,
    easing: "easeOutExpo"
  });
});

document.addEventListener("click", () => {
    anime({
      targets: cursor,
      scale: [1, 2, 1],
      duration: 400,
      easing: "easeOutCubic"
    });
  });
  


      annyang.addCommands(commands);
  
      micBtn.addEventListener("click", () => {
        if (!isListening) {
          annyang.start({ autoRestart: false, continuous: false });
          isListening = true;
          micStatus.textContent = "🎙️ listening...";
          micBtn.textContent = "🛑 stop";


          anime({
            targets: '#micBtn',
            scale: [1, 1.1, 1],
            duration: 1000,
            easing: 'easeInOutSine'
          });
      
        } else {
          annyang.abort();
          isListening = false;
          micStatus.textContent = "🛑 stopped";
          micBtn.textContent = "🎤 voice Search";
        }
      });
    } else {
      micBtn.disabled = true;
      micStatus.textContent = "❌ voice not supported";
    }
  });
  