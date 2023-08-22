const body = document.getElementsByTagName("BODY")[0];
const searchMusicDiv = document.querySelector("div.searchMusicDiv");
const textHeader = document.querySelector("#textHeader");
const searchMusicInput = document.querySelector("#searchMusicInput");
const searchMusicButton = document.getElementById("searchMusicButton");
const searchMusicCancelButton = document.getElementById("searchMusicCancelButton");

const playListDiv = document.querySelector("div.playListDiv")
const musicDiv = document.querySelectorAll("div.musicDiv");
const notFoundMessageDiv = document.getElementById("notFoundMessageDiv");

const playMusicDiv = document.querySelector("div.playMusicDiv");
const audioElement = document.getElementById("audioElement");
const coverMusicPlayed = document.getElementById("coverMusicPlayed");
const previousMusicButton = document.getElementById("previousMusicButton");
const playMusicButton = document.getElementById("playMusicButton");
const pauseMusicButton = document.getElementById("pauseMusicButton");
const nextMusicButton = document.getElementById("nextMusicButton");
const adjustVolumeMusicButton = document.getElementById("adjustVolumeMusicButton");
const adjustVolumeMusicRangeInput = document.getElementById("adjustVolumeMusicRangeInput");
const orderStatusPlaylistButton = document.getElementById("orderStatusPlaylistButton");
const downloadMusicA = document.getElementById("downloadMusicA");
const downloadMusicButton = document.getElementById("downloadMusicButton");
const closePlayMusicDivButton = document.getElementById("closePlayMusicDivButton");
const currentTimeMinute = document.getElementById("currentTimeMinute");
const currentTimeSecond = document.getElementById("currentTimeSecond");
const timeLineMusic = document.getElementById("timeLineMusic");
const durationTimeMinute = document.getElementById("durationTimeMinute");
const durationTimeSecond = document.getElementById("durationTimeSecond");

let searchMusicInputContent, musicSearched, resultSearch;
let musicSelected, musicSelectedIndex;
let musicPlaying, musicPlayingBackup;
let currentTimeMusic, durationTimeMusic;
let timer;
let orderStatusPlaylistVar = "normal", orderStatusPlaylistToggle = false;
let mobileMode = window.matchMedia("(max-width: 414px)");

let musics = [
    {
    id: "111",
    name: "Dawn",
    singer: "Jorge Méndez",
    cover: "cover/Jorge Méndez - Dawn.jpg",
    src: "music/Jorge Méndez - Dawn.mp3"
    }
    ,
    {
    id: "112",
    name: "Desolate",
    singer: "Vesky",
    cover: "cover/Vesky - Desolate.jpg",
    src: "music/Vesky - Desolate.mp3"
    }
    ,
    {
    id: "113",
    name: "Endless",
    singer: "Vesky",
    cover: "cover/Vesky - Endless.jpg",
    src: "music/Vesky - Endless.mp3"
    }
    ,
    {
    id: "114",
    name: "Fantasy World",
    singer: "Jurrivh",
    cover: "cover/Jurrivh - Fantasy World.jpg",
    src: "music/Jurrivh - Fantasy World.mp3"
    }
    ,
    {
    id: "115",
    name: "Meadow",
    singer: "Christoffer Franzen",
    cover: "cover/Christoffer Franzen - Meadow.jpg",
    src: "music/Christoffer Franzen - Meadow.mp3"
    }
    ,
    {
    id: "116",
    name: "Near Dawn",
    singer: "S.A.Karl",
    cover: "cover/S.A.Karl - Near Dawn.jpg",
    src: "music/S.A.Karl - Near Dawn.mp3"
    }
    ,
    {
    id: "117",
    name: "Overthinker",
    singer: "I-Human",
    cover: "cover/I-Human - Overthinker.jpg",
    src: "music/I-Human - Overthinker.mp3"
    }
    ,
    {
    id: "118",
    name: "Pebbles",
    singer: "John Ozbay",
    cover: "cover/John Ozbay - Pebbles.jpg",
    src: "music/John Ozbay - Pebbles.mp3"
    }
    ,
    {
    id: "119",
    name: "Skyline",
    singer: "Tony Anderson & Dennis Hamm",
    cover: "cover/Tony Anderson & Dennis Hamm - Skyline.jpg",
    src: "music/Tony Anderson & Dennis Hamm - Skyline.mp3"
    }
    ,
    {
    id: "120",
    name: "The Light In Your Eyes",
    singer: "Christoffer Franzen",
    cover: "cover/Christoffer Franzen - The Light In Your Eyes.jpg",
    src: "music/Christoffer Franzen - The Light In Your Eyes.mp3"
    }
];

// ***********************************************************************************************************

searchMusicInput.addEventListener("keypress", searchMusic);
searchMusicButton.addEventListener("click", searchMusic);
searchMusicCancelButton.addEventListener("click", cancelSearchMusic);
body.addEventListener("keydown", cancelSearchMusic);
body.addEventListener("keydown", playAndPuaseMusic);
musicDiv.forEach((element) => {element.addEventListener("click", selectPlayingMusic)});
audioElement.addEventListener("loadedmetadata", getDuraionMusic);
audioElement.addEventListener("load", loadingMusic);
timeLineMusic.addEventListener("change", changeCurrentTimeMusic)
previousMusicButton.addEventListener("click",  previousMusic);
playMusicButton.addEventListener("click",  playMusic);
pauseMusicButton.addEventListener("click",  pauseMusic);
nextMusicButton.addEventListener("click",  nextMusic);
adjustVolumeMusicButton.addEventListener("click", adjustVolumeMusic);
adjustVolumeMusicRangeInput.addEventListener("change", changeVolumeMusic);
orderStatusPlaylistButton.addEventListener("click", orderStatusPlaylist);
closePlayMusicDivButton.addEventListener("click", closePlayMusicDiv);

// ***********************************************************************************************************

function searchMusic(event) {

    if (mobileMode.matches) {
        searchMusicDiv.classList.add("mobileMode");
        textHeader.classList.add("hidden");
        searchMusicInput.classList.add("mobileMode");
        searchMusicButton.classList.add("mobileMode");
        searchMusicCancelButton.classList.add("mobileMode");

        searchMusicInput.focus();
    }

    if (searchMusicInput.value != '' && (event.key === "Enter" || event.type === "click")) {

        resultSearch = [];
        searchMusicInputContent =  searchMusicInput.value;

        musicDiv.forEach((element) => {
            element.classList.remove("hidden");
        });

        notFoundMessageDiv.classList.add("hidden");

        musicSearched = musics.forEach((element) => {
            if (
                element.name.toLocaleLowerCase().includes(searchMusicInputContent.toLocaleLowerCase())
                ||
                element.singer.toLocaleLowerCase().includes(searchMusicInputContent.toLocaleLowerCase())
            ) {
                resultSearch.push(element.id);
            }
        });

        musicDiv.forEach((element) => {
            if (!resultSearch.includes(element.classList[1])) {
                element.classList.add("hidden");
            }
        });

        if (resultSearch.length === 0) {
            notFoundMessageDiv.classList.remove("hidden");
        }

        searchMusicButton.classList.add("hidden");
        searchMusicCancelButton.classList.remove("hidden");
    }
}

function cancelSearchMusic(event) {

    if (mobileMode.matches) {
        searchMusicDiv.classList.remove("mobileMode");
        textHeader.classList.remove("hidden");
        searchMusicInput.classList.remove("mobileMode");
        searchMusicButton.classList.remove("mobileMode");
        searchMusicCancelButton.classList.remove("mobileMode");
    }

    if (event.type === "click" || (event.type === "keydown" && event.key === "Escape")) {

        searchMusicInput.value = "";

        musicDiv.forEach((element) => {
            element.classList.remove("hidden");
            element.classList.remove("openPlayMusicDiv");
            element.classList.remove("closePlayMusicDiv");
            if (mobileMode.matches && playMusicDiv.classList.contains("openPlayMusicDiv")) {
                element.style.height = "15%";
            }
        });

        notFoundMessageDiv.classList.add("hidden");

        searchMusicButton.classList.remove("hidden");
        searchMusicCancelButton.classList.add("hidden");
    }
}

function selectPlayingMusic(event) {

    playMusicDiv.classList.add("openPlayMusicDiv");
    playMusicDiv.classList.remove("closePlayMusicDiv");

    if (mobileMode.matches && !playListDiv.classList.contains("openPlayMusicDiv")) {
        playListDiv.classList.add("openPlayMusicDiv");
        playListDiv.classList.remove("closePlayMusicDiv");
        musicDiv.forEach((element) => {
            element.classList.add("openPlayMusicDiv");
            element.classList.remove("closePlayMusicDiv");
            element.style.height = "15%"; 
        });
    }

    if (mobileMode.matches && event.clientY > 520) {
        automaticScroll();
    }

    musicSelectedIndex = -1;
    
    musicSelected = musics.find((element) => {
        musicSelectedIndex += 1;
        return element.id == event.target.classList[1];
    });

    musicPlaying = musicSelected.id;

    if (musicPlaying === musicPlayingBackup) {
        togglePlay();
    } else {
        setPropertiesSelectedMusic();
    }

    musicPlayingBackup = musicSelected.id;
}

function automaticScroll() {

    let timer = setInterval(() => {
        playListDiv.scrollTop += 1;
    }, 10);

    setTimeout(() => {
        clearInterval(timer);
    }, (playListDiv.scrollTop === 0) ? body.clientHeight * 1.5 : 2000);

}

function setPropertiesSelectedMusic() {
    audioElement.src = musicSelected.src;
    coverMusicPlayed.src = musicSelected.cover;
    downloadMusicA.href = musicSelected.src;

    audioElement.addEventListener("loadedmetadata", showDurationTimeMusic);

    musicDiv.forEach((element) => {
        if (element.classList[1] == musicSelected.id) {
            element.classList.add("selected");
        } else {
            element.classList.remove("selected");
        }
    });
    
    playMusic();
}

function playMusic() {
    playMusicButton.classList.add("hidden");
    pauseMusicButton.classList.remove("hidden");

    timer = setInterval(showCurrentTimeMusic, 1000);

    audioElement.play();
}

function pauseMusic() {
    playMusicButton.classList.remove("hidden");
    pauseMusicButton.classList.add("hidden");
    
    clearInterval(timer);

    audioElement.pause();
}

function playAndPuaseMusic(event) {
    if (
        event.code === "Space"
        &&
        playMusicDiv.classList.contains("openPlayMusicDiv")
        &&
        event.target != searchMusicInput
    ) {
        event.preventDefault();
        togglePlay();
    }
}

function togglePlay() {
    return audioElement.paused ? playMusic() : pauseMusic();
}

function previousMusic() {

    if (orderStatusPlaylistVar === "normal") {
        musicSelectedIndex -= 1;
    }

    if (musicSelectedIndex < 0) {
        musicSelectedIndex = musics.length - 1;
    }

    musicSelected = musics[musicSelectedIndex];

    setPropertiesSelectedMusic();
}

function nextMusic() {

    if (orderStatusPlaylistVar === "normal") {
        musicSelectedIndex += 1;
    }
    
    if (musicSelectedIndex >= musics.length) {
        musicSelectedIndex = 0;
    }
    
    musicSelected = musics[musicSelectedIndex];

    setPropertiesSelectedMusic();
}

function adjustVolumeMusic() {
    orderStatusPlaylistButton.classList.toggle("hidden");
    downloadMusicButton.classList.toggle("hidden");
    adjustVolumeMusicRangeInput.classList.toggle("hidden");
}

function changeVolumeMusic() {
    audioElement.volume = adjustVolumeMusicRangeInput.value / 100;
    if (audioElement.volume != 0) {
        adjustVolumeMusicButton.firstElementChild.src = "icon/speaker.png";
    } else {
        adjustVolumeMusicButton.firstElementChild.src = "icon/mute.png";
    }
}

function orderStatusPlaylist() {

    if (orderStatusPlaylistToggle) {

        orderStatusPlaylistVar = "normal";
        orderStatusPlaylistButton.firstElementChild.src = "icon/playList.png";

    } else {

        orderStatusPlaylistVar = "repeat";
        orderStatusPlaylistButton.firstElementChild.src = "icon/repeat.png";
        
    }
    
    orderStatusPlaylistToggle = !orderStatusPlaylistToggle;
}

function getDuraionMusic() {
    durationTimeMusic = audioElement.duration;
}

function showDurationTimeMusic() {
    durationTimeMinute.innerHTML = (parseInt(durationTimeMusic / 60) < 10) ? "0" + parseInt(durationTimeMusic / 60) : parseInt(durationTimeMusic / 60);
    durationTimeSecond.innerHTML = (parseInt(durationTimeMusic % 60) < 10) ? "0" + parseInt(durationTimeMusic % 60) : parseInt(durationTimeMusic % 60);
}

function showCurrentTimeMusic() {
    currentTimeMusic = audioElement.currentTime;

    currentTimeMinute.innerHTML = (parseInt(currentTimeMusic / 60) < 10) ? "0" + parseInt(currentTimeMusic / 60) : parseInt(currentTimeMusic / 60);
    currentTimeSecond.innerHTML = (parseInt(currentTimeMusic % 60) < 10) ? "0" + parseInt(currentTimeMusic % 60) : parseInt(currentTimeMusic % 60);

    timeLineMusic.value = currentTimeMusic / durationTimeMusic * 100; 

    if (currentTimeMusic == durationTimeMusic) {
        nextMusic()
    }
}

function changeCurrentTimeMusic() {
    audioElement.currentTime = audioElement.duration * timeLineMusic.value / 100; 
}

function loadingMusic() {
    timeLineMusic.value = 0;
}

function closePlayMusicDiv() {
    playListDiv.classList.remove("openPlayMusicDiv");
    playListDiv.classList.add("closePlayMusicDiv");

    musicDiv.forEach((element) => {
        element.classList.remove("openPlayMusicDiv");
        element.classList.add("closePlayMusicDiv");
        element.style.height = "12.58%"; 
    });

    playMusicDiv.classList.add("closePlayMusicDiv");
    playMusicDiv.classList.remove("openPlayMusicDiv");

    musicDiv.forEach((element) => {
        element.classList.remove("selected");
    });

    audioElement.currentTime = 0;
    pauseMusic();
}