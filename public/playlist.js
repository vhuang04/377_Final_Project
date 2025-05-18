// global variable to hold the generated playlist
let playlistSong = [];

// fetch playlist based on genre tag
async function playlist(tag) {
  return await fetch(`https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${tag}&api_key=04082a95d3d42a143f5505cb89aebba0&format=json`)
    .then((result) => result.json())
    .then((resultjson) => {
      console.log("Fetched playlist:", resultjson);
      return resultjson;
    });
}

// cursor animation (unchanged)
const cursor = document.getElementById("custom-cursor");

document.addEventListener("mousemove", (e) => {
  anime({
    targets: cursor,
    left: e.clientX - 10,
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

// generate Playlist
async function generate() {
  const searchbar = document.getElementById("user-input");
  const genreInput = searchbar.value;

  const genre = await playlist(genreInput);

  console.log('Genre Data:', genre);
  const table = document.getElementById('playlist-container');
  table.innerHTML = "";

  // table headers
  const songhead = document.createElement("th");
  const artisthead = document.createElement("th");

  artisthead.textContent = "Artist";
  songhead.textContent = "Song";

  table.appendChild(songhead);
  table.appendChild(artisthead);

  playlistSong = genre.tracks.track;

  console.log('Shuffled Playlist:', playlistSong.length);

  // shuffle playlist
  for (let i = playlistSong.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    [playlistSong[i], playlistSong[randomIndex]] = [playlistSong[randomIndex], playlistSong[i]];
  }

  // display 20 songs
  for (let i = 0; i < 20; i++) {
    const track = playlistSong[i];
    const row = document.createElement('tr');
    const song = document.createElement('td');
    const artist = document.createElement('td');

    song.textContent = track.name;
    artist.textContent = track.artist.name;

    row.appendChild(song);
    row.appendChild(artist);
    table.appendChild(row);
  }

  table.style.display = "block";
}

// save Playlist Button Handler
document.getElementById("savePlaylistBtn").addEventListener("click", () => {
  const genre = document.getElementById("user-input").value;

  if (!playlistSong.length) {
    alert("Generate a playlist first!");
    return;
  }

  const cleanedPlaylist = playlistSong.slice(0, 20).map(track => ({
    name: track.name,
    artist: track.artist.name
  }));

  fetch('http://localhost:3000/api/save-playlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ genre, playlist: cleanedPlaylist })
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message || "Playlist saved successfully!");
    })
    .catch(err => {
      console.error("Save failed:", err);
      alert("Error saving playlist.");
    });
});
