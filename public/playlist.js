let currentPlaylist = []

async function playlist(tag){
    return await fetch (`https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${tag}&api_key=04082a95d3d42a143f5505cb89aebba0&format=json`)
        .then((result)=> result.json())
        .then((resultjson)=> {
            console.log(resultjson)
            return resultjson
        })
}
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
  
async function generate(){
    Math.floor(Math.random())


    searchbar = document.getElementById("user-input")
    genreInput= searchbar.value

    genre = await (playlist(genreInput))
    
    console.log('genre', genre)
    const table = document.getElementById('playlist-container')
    table.innerHTML=""

    const songhead = document.createElement("th")
    const artisthead = document.createElement("th") 


    artisthead.textContent = "Artist"
    songhead.textContent = "Song"

    table.appendChild(songhead)
    table.appendChild(artisthead)

    playlistSong = genre.tracks.track


    console.log('length', playlistSong.length)

    for (let i = playlistSong.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i));
        [playlistSong[i], playlistSong[randomIndex]] = [playlistSong[randomIndex], playlistSong[i]];
    }

    currentPlaylist = [];
    for(let i = 0; i<20; i++){
        track = playlistSong[i]
        const rowtable = document.createElement('tr')
        const song = document.createElement('td')
        const artist = document.createElement('td')

        rowtable.innerHTML= ""
        song.innerHTML = ""
        artist.innerHTML = ""

        song.textContent=`${track.name}`
        artist.textContent = track.artist.name

        rowtable.appendChild(song)
        rowtable.appendChild(artist)
        table.appendChild(rowtable)

        currentPlaylist.push({
            song: track.name,
            artist: track.artist.name
        });

        table.style.display = "block"

    }}
  
async function savePlaylist(){
    await fetch('/customer',{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            songs: currentPlaylist
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("playlist saved", data)
    })
}



