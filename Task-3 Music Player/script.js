const audio = document.getElementById('audio');
const playPauseBtn = document.querySelector('.play-pause');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');
const currentTimeEl = document.querySelector('.current-time');
const durationEl = document.querySelector('.duration');
const trackTitle = document.querySelector('.track-title');
const artist = document.querySelector('.artist');
const albumArt = document.querySelector('.album-art');
const volumeControl = document.getElementById('volume');
const trackList = document.querySelector('.track-list');

const tracks = [
    {
        title: 'Track 1',
        artist: 'Artist 1',
        src: 'assets/tracks/track1.mp3',
        art: 'assets/images/album1.jpeg'
    },
    {
        title: 'Track 2',
        artist: 'Artist 2',
        src: 'assets/tracks/track2.mp3',
        art: 'assets/images/album2.jpeg'
    },
    {
        title: 'Track 3',
        artist: 'Artist 3',
        src: 'assets/tracks/track3.mp3',
        art: 'assets/images/album3.jpeg'
    },
    {
        title: 'Track 4',
        artist: 'Artist 4',
        src: 'assets/tracks/track4.mp3',
        art: 'assets/images/album4.jpeg'
    }
];

let currentTrackIndex = 0;

function loadTrack(index) {
    const track = tracks[index];
    trackTitle.textContent = track.title;
    artist.textContent = track.artist;
    audio.src = track.src;
    albumArt.src = track.art;
    updatePlaylistHighlight();
}

function updatePlaylistHighlight() {
    document.querySelectorAll('.track-item').forEach((item, i) => {
        item.classList.toggle('active', i === currentTrackIndex);
    });
}

function playPause() {
    if (audio.paused) {
        audio.play().catch(error => console.error('Playback failed:', error));
        playPauseBtn.textContent = '⏸';
    } else {
        audio.pause();
        playPauseBtn.textContent = '▶';
    }
}

function updateProgress() {
    if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = `${percent}%`;
        currentTimeEl.textContent = formatTime(audio.currentTime);
        durationEl.textContent = formatTime(audio.duration);
    }
}

function setProgress(e) {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Populate playlist
tracks.forEach((track, index) => {
    const li = document.createElement('li');
    li.classList.add('track-item');
    li.innerHTML = `
        <img src="${track.art}" alt="${track.title}">
        <div>
            <p class="track-title">${track.title}</p>
            <p class="artist">${track.artist}</p>
        </div>
    `;
    li.addEventListener('click', () => {
        currentTrackIndex = index;
        loadTrack(currentTrackIndex);
        playPause();
    });
    trackList.appendChild(li);
});

// Event listeners
playPauseBtn.addEventListener('click', playPause);
prevBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    playPause();
});
nextBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    playPause();
});
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
});
progressContainer.addEventListener('click', setProgress);
volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
});

// Load first track
loadTrack(currentTrackIndex);