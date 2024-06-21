let songUl = document.querySelector('.songsList')
let songInfoSec = document.querySelector('.songInfoSec')
let previous = document.querySelector('#previous')
let next = document.querySelector('#next')
let songInfoSecInnerDiv = document.createElement('div')
let currentSong = new Audio()
let playBar = document.querySelector('.playBar')
let songUrl = []


async function getSongs() {
    let songs = await fetch("http://127.0.0.1:3000/songs/")
    let response = await songs.text()

    let div = document.createElement('div')
    div.innerHTML = response
    let as = div.getElementsByTagName('a')
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith('.mp3')) {
            songUrl.push(element.innerHTML)
        }
    }    
    displaySongs(songUrl)
}
function displaySongs(songs) {

    for (let i = 0; i < songs.length; i++) {
        const element = songs[i]; 
        let li = document.createElement('li')
        li.innerHTML = `
            <li class="songs">
                <img src="assets/music (1).png " class="musicIcon">
                <span>${element}</span>
                <img src="assets/play (2).png" class="songsPlayBtn">
            </li>
        `
        songUl.appendChild(li)
    }
    main()
}

function playMusic(songUrl) {
    currentSong.src = songUrl
    currentSong.play()
    console.log(songUrl)
}
function convertSecondsToTime(seconds) {
   const minutes = Math.floor(seconds / 60);
   const remainingSeconds = Math.floor(seconds % 60);
   const formattedMinutes = String(minutes).padStart(2, '0');
   const formattedSeconds = String(remainingSeconds).padStart(2, '0');
   return `${formattedMinutes}:${formattedSeconds}`;
}

function main() {
    let songsList = document.querySelectorAll('.songs')
    songsList.forEach((listItem) => {
        listItem.addEventListener('click',() => {
            songInfoSec.innerHTML = ''
            playBar.style.opacity = 1
            let songInfo = listItem.querySelector('span').innerHTML
            playMusic(`/songs/${songInfo}`)
            
             songInfoSecInnerDiv.innerHTML = ` 
             <div class="songInfoInnerDiv">
                <img src="assets/music (1).png " id="musicIcon">
                <p>${songInfo} </p>                   
            </div>`

             songInfoSec.appendChild(songInfoSecInnerDiv)
        })
    })
    playPause.addEventListener("click", ()=>{
        if (currentSong.paused) {
            currentSong.play();
            playPause.src = "assets/pause.png"
            document.querySelector('')
        } else {
            currentSong.pause();
            playPause.src = "assets/play (2).png"
        }
    })
    currentSong.addEventListener("timeupdate",()=>{
        document.querySelector("#durationTime").innerHTML = `${convertSecondsToTime(currentSong.currentTime)}`;
        document.querySelector("#fullDuration").innerHTML = `${convertSecondsToTime(currentSong.duration)}`;
        document.querySelector("#range").value = currentSong.currentTime
    })
   
    document.querySelector("#range").addEventListener("click", e=>{
        let percent = (e.offsetX/e.target.getBoundingClientRect().width) * 100;
        currentSong.currentTime = ((currentSong.duration)*percent)/100;
    })
    previous.addEventListener('click', () => {
        
    })
    previous.addEventListener('click', () => {
        let URL = currentSong.src.split("/songs/")[1]
        let newURL = URL.replaceAll('%20',' ')
        let index = songUrl.indexOf(newURL)-1
        if (index >= 0) {
            playMusic(`/songs/${songUrl[index]}`)
            songInfoSecInnerDiv.innerHTML = ` 
             <div class="songInfoInnerDiv">
                <img src="assets/music (1).png " id="musicIcon">
                <p>${songUrl[index]} </p>                   
            </div>`
        }
    })
    next.addEventListener('click', () => {
        let URL = currentSong.src.split("/songs/")[1]
        let newURL = URL.replaceAll('%20',' ')
        let index = songUrl.indexOf(newURL)+1
        if (index < songUrl.length) {
            playMusic(`/songs/${songUrl[index]}`)
            songInfoSecInnerDiv.innerHTML = ` 
             <div class="songInfoInnerDiv">
                <img src="assets/music (1).png " id="musicIcon">
                <p>${songUrl[index]} </p>                   
            </div>`
        }
    })
    let volumeRange = document.querySelector("#volumeRange");
        volumeRange.addEventListener("change", (e) => {
            currentSong.volume = parseInt(e.target.value)/100;
    })
    let volumeBtn = document.querySelector("#volumeBtn");
        volumeBtn.addEventListener('click', () => {
            if (currentSong.volume != 0) {
                currentSong.volume = 0;
                volumeBtn.src = "assets/mute.png" 
                volumeRange.value = 0               
            }else if(currentSong.volume == 0){
                currentSong.volume = 1;
                volumeBtn.src = "assets/volume.png" 
                volumeRange.value = 100
            }
        })
        document.querySelector(".hamburger").addEventListener("click", () => {
            document.querySelector(".left").style.left = "0"
        })
        document.querySelector(".closeBtn").addEventListener("click", () => {
            document.querySelector(".left").style.left = "-120%"
        })
}
getSongs()