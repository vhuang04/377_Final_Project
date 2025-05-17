if (annyang){
    console.log('making commands')
    var commands = {
        'Navigate to Playlist' : toPlaylist,
        'Navigate to Trending' : toTrending,
        'Navigate to Discover' : toDiscover, 
        'Navigate to Home Page' : toHomePage, 
        'Navigate to About'  : toAbout,
        'Show me top ten songs' : Songs,
        'Show me top ten artists' : Artist
    }

}


function toPlaylist(){
    window.location.href = "playlist.html"
}
function toTrending(){
    window.location.href = "trend.html"
}
function toDiscover(){
    window.location.href = "discover.html"
}
function toHomePage(){
    window.location.href = "homepage.html"
}
function toAbout(){
    window.location.href = "about.html"
}
function Songs(){

}

annyang.addCommands(commands);

function on(){
    console.log("it is on!");
    annyang.start(); 

}

function off(){
    console.log("it is off!");
    annyang.abort();
}
