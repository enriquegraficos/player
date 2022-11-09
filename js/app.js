let currentMusic = 0;

const music = document.querySelector("#audio");
const barraProgress = document.querySelector(".barra-progress");
const songName = document.querySelector('.name-song-title');
const artistName = document.querySelector("#artist");
const currentTime = document.querySelector("#current-time");
const durationSong = document.querySelector("#duration-song");
const cover = document.querySelector('.covercito');

const btnPlay = document.querySelector("#play");
const btnPrev = document.querySelector("#prev");
const btnNext = document.querySelector("#next");

btnPlay.addEventListener('click', () => {
    if(btnPlay.className.includes('fa-circle-pause')){
        music.pause();
    }
    else{
        music.play();
    }
    btnPlay.classList.toggle('fa-circle-pause');
})

// setup music

const setMusic = (i) => {
    barraProgress.value = 0; // set range slide value to 0
    let song = songs[i];
    currentMusic = i;
    music.src = song.path;

    songName.innerHTML = song.musicName;
    artistName.innerHTML = song.artist;
    cover.src = song.cover;

    currentTime.innerHTML = '00:00';
    
   setTimeout(() =>{
        barraProgress.max = music.duration;
        durationSong.innerHTML = formatTime(music.duration);
   }, 300);
   
}

setMusic(0);

// Formatting time in min and seconds format

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if(min < 10){
        min = `0${min}`;

    }
    let sec = Math.floor(time % 60);
    if(sec < 10){
        sec = `0${sec}`;
    }
    return `${min} : ${sec}`;

}


// seek bar

setInterval(() => {
    barraProgress.value = music.currentTime;
    currentTime.innerHTML = formatTime(music.currentTime);
    if(Math.floor(music.currentTime) == Math.floor(barraProgress.max)){
        btnNext.click();
    }
}, 500)

barraProgress.addEventListener('change', ()=> {
    music.currentTime = barraProgress.value;
} )


// prev and next btn
// adelantar
btnNext.addEventListener('click', () => {
    if(currentMusic >= songs.length -1){
        currentMusic = 0;
    } else{
        currentMusic++;
    }
    setMusic(currentMusic);
    playMusic();
})

// retroceder
btnPrev.addEventListener('click', () => {
    if(currentMusic <= 0){
        currentMusic = songs.length -1;
    } else{
        currentMusic--;
    }
    setMusic(currentMusic);
    playMusic();
})

const playMusic = () => {
    music.play();
    btnPlay.classList.remove('fa-circle-pause');
}