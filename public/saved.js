document.addEventListener("DOMContentLoaded", () => {
  const cursor = document.getElementById("custom-cursor");

  // cursor animation
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

  // load saved playlists
  fetch('http://localhost:3000/api/playlists')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("saved-playlists");
      if (data.length === 0) {
        container.innerHTML = "<p>no playlists saved yet.</p>";
        return;
      }

      data.forEach(entry => {
        const div = document.createElement("div");
        div.classList.add("box");

        const h3 = document.createElement("h3");
        h3.textContent = `Genre: ${entry.genre}`;
        div.appendChild(h3);

        const ul = document.createElement("ul");
        entry.playlist.forEach(track => {
          const li = document.createElement("li");
          li.textContent = `${track.name} by ${track.artist}`;
          ul.appendChild(li);
        });

        div.appendChild(ul);
        container.appendChild(div);
      });
    })
    .catch(err => {
      console.error("Error fetching playlists:", err);
      document.getElementById("saved-playlists").textContent = "Failed to load.";
    });
});
