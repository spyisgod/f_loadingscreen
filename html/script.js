// Initialize the loading screen
document.addEventListener('DOMContentLoaded', () => {
    initializeCursor();
    initializeBackground();
    initializeLogo();
    initializeNews();
    initializeLoadingBar();
    initializeMusicPlayer();
});

// Custom Cursor
function initializeCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let cursorDotX = 0, cursorDotY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateCursor() {
        // Ana cursor için smooth hareket
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        cursorX += dx * 0.2;
        cursorY += dy * 0.2;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Cursor dot için daha hızlı hareket
        const dotDx = mouseX - cursorDotX;
        const dotDy = mouseY - cursorDotY;
        cursorDotX += dotDx * 0.5;
        cursorDotY += dotDy * 0.5;
        cursorDot.style.left = cursorDotX + 'px';
        cursorDot.style.top = cursorDotY + 'px';

        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    const hoverElements = document.querySelectorAll('button, .news-item');

    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorDot.classList.add('hover');
        });

        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorDot.classList.remove('hover');
        });
    });
}

// Background initialization
function initializeBackground() {
    const container = document.getElementById('background-container');
    container.innerHTML = ''; // Clear existing content

    if (Config.background.type === 'youtube') {
        const iframe = document.createElement('iframe');
        const videoId = Config.background.youtube.videoId;
        const params = new URLSearchParams({
            autoplay: Config.background.youtube.autoplay ? '1' : '0',
            mute: Config.background.youtube.muted ? '1' : '0',
            loop: Config.background.youtube.loop ? '1' : '0',
            controls: Config.background.youtube.controls ? '1' : '0',
            playlist: videoId,
            start: '0',
            enablejsapi: '1',
            rel: '0',
            showinfo: '0',
            modestbranding: '1'
        });
        
        iframe.src = `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
        iframe.style.filter = `blur(${Config.background.youtube.blur}px)`;
        iframe.style.opacity = Config.background.youtube.opacity;
        iframe.allow = 'autoplay; encrypted-media';
        iframe.allowFullscreen = false;
        container.appendChild(iframe);
    } else if (Config.background.type === 'video') {
        const video = document.createElement('video');
        video.src = Config.background.video.path;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.style.filter = `blur(${Config.background.video.blur}px)`;
        video.style.opacity = Config.background.video.opacity;
        container.appendChild(video);
    } else {
        const img = document.createElement('img');
        img.src = Config.background.image.path;
        img.style.filter = `blur(${Config.background.image.blur}px)`;
        img.style.opacity = Config.background.image.opacity;
        container.appendChild(img);
    }
}

// Logo initialization
function initializeLogo() {
    if (Config.logo.enabled) {
        const logo = document.getElementById('server-logo');
        logo.src = Config.logo.path;
        logo.style.width = Config.logo.width;
        logo.style.height = Config.logo.height;

        if (Config.logo.animation.enabled) {
            logo.style.animation = `${Config.logo.animation.type} ${Config.animations.duration}s infinite`;
        }
    }
}

// News initialization
function initializeNews() {
    if (!Config.news.enabled) return;

    const newsContainer = document.querySelector('.news-container');
    const newsTitle = document.querySelector('.news-container h2');
    newsTitle.textContent = Config.news.title;
    

    newsContainer.classList.add('hidden');
    
    const newsListContainer = document.getElementById('news-list');
    newsListContainer.innerHTML = '';

    Config.news.items.forEach((item, index) => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.style.animationDelay = `${index * 0.2}s`;
        

        const icon = getNewsIcon(item.type || 'default');
        
        let newsContent = `
            <div class="news-header">
                <div class="news-icon">
                    <i class="${icon}"></i>
                </div>
                <h3>${item.title}</h3>
            </div>
            <div class="news-content">
        `;

        if (item.image) {
            newsContent += `
                <div class="news-image" data-title="${item.title}">
                    <img src="${item.image}" alt="${item.title}">
                </div>
            `;
        }

        newsContent += `
                <p>${item.content}</p>
                <div class="news-footer">
                    <div class="date">
                        <i class="far fa-clock"></i>
                        ${item.date}
                    </div>
                    <div class="news-tag">${item.tag || 'Genel'}</div>
                </div>
            </div>
        `;
        
        newsItem.innerHTML = newsContent;
        newsListContainer.appendChild(newsItem);
    });


    initializeImagePopup();
}


function initializeImagePopup() {
    const overlay = document.querySelector('.image-popup-overlay');
    const popupImage = overlay.querySelector('.popup-image');
    const closeBtn = overlay.querySelector('.close-popup');
    const titleElement = overlay.querySelector('.popup-image-title');
    const newsImages = document.querySelectorAll('.news-image');

    newsImages.forEach(imageContainer => {
        imageContainer.addEventListener('click', () => {
            const img = imageContainer.querySelector('img');
            popupImage.src = img.src;
            titleElement.textContent = imageContainer.dataset.title;
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });


    closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closePopup();
        }
    });


    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closePopup();
        }
    });

    function closePopup() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            popupImage.src = '';
            titleElement.textContent = '';
        }, 300);
    }
}


function getNewsIcon(type) {
    const icons = {
        update: 'fas fa-sync-alt',
        event: 'fas fa-calendar-alt',
        announcement: 'fas fa-bullhorn',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle',
        default: 'fas fa-newspaper'
    };
    return icons[type] || icons.default;
}


let audioPlayer;
let isPlaying = false;

function initializeMusicPlayer() {
    audioPlayer = document.getElementById('music-player');
    const playPauseBtn = document.getElementById('play-pause');
    const volumeSlider = document.querySelector('.volume-slider');
    const volumeBtn = document.querySelector('.volume-btn');
    const albumArt = document.querySelector('.album-art');


    audioPlayer.volume = 0.5;


    audioPlayer.play().then(() => {
        isPlaying = true;
        playPauseBtn.querySelector('i').classList.replace('fa-play', 'fa-pause');
        playPauseBtn.classList.add('active');
        albumArt.classList.add('playing');
    }).catch(error => {
        console.error('Autoplay prevented:', error);
    });


    let pressTimer;
    
    playPauseBtn.addEventListener('mousedown', () => {
        pressTimer = setTimeout(() => {
            stopMusic();
        }, 500);
    });

    playPauseBtn.addEventListener('mouseup', () => {
        clearTimeout(pressTimer);
    });

    playPauseBtn.addEventListener('mouseleave', () => {
        clearTimeout(pressTimer);
    });

    playPauseBtn.addEventListener('click', (e) => {
        if (e.detail === 1) {
            togglePlay();
        }
    });


    volumeSlider.addEventListener('input', (e) => {
        const volume = e.target.value / 100;
        setVolume(volume);
    });


    volumeBtn.addEventListener('click', toggleMute);


    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !e.repeat) {
            e.preventDefault();
            togglePlay();
        } else if (e.code === 'KeyM' && !e.repeat) {
            e.preventDefault();
            toggleMute();
        } else if (e.code === 'KeyS' && !e.repeat) {
            e.preventDefault();
            stopMusic();
        }
    });
}

function togglePlay() {
    if (isPlaying) {
        audioPlayer.pause();
        document.getElementById('play-pause').querySelector('i').classList.replace('fa-pause', 'fa-play');
        document.getElementById('play-pause').classList.remove('active');
        document.querySelector('.album-art').classList.remove('playing');
    } else {
        audioPlayer.play();
        document.getElementById('play-pause').querySelector('i').classList.replace('fa-play', 'fa-pause');
        document.getElementById('play-pause').classList.add('active');
        document.querySelector('.album-art').classList.add('playing');
    }
    isPlaying = !isPlaying;
}

function stopMusic() {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    isPlaying = false;
    document.getElementById('play-pause').querySelector('i').classList.replace('fa-pause', 'fa-play');
    document.getElementById('play-pause').classList.remove('active');
    document.querySelector('.album-art').classList.remove('playing');
}

function setVolume(volume) {
    audioPlayer.volume = volume;
    document.querySelector('.volume-slider').value = volume * 100;
    
    const volumeIcon = document.querySelector('.volume-btn i');
    volumeIcon.className = 'fas';
    
    if (volume > 0.5) {
        volumeIcon.classList.add('fa-volume-up');
    } else if (volume > 0) {
        volumeIcon.classList.add('fa-volume-down');
    } else {
        volumeIcon.classList.add('fa-volume-mute');
    }
}

function toggleMute() {
    if (audioPlayer.volume > 0) {
        audioPlayer.dataset.previousVolume = audioPlayer.volume;
        setVolume(0);
    } else {
        const previousVolume = parseFloat(audioPlayer.dataset.previousVolume) || 0.5;
        setVolume(previousVolume);
    }
}

// Loading bar initialization and animation
function initializeLoadingBar() {
    const progressBar = document.querySelector('.progress');
    const loadingPercentage = document.getElementById('loading-percentage');
    let progress = 0;

    function updateLoadingBar() {
        if (progress >= 100) return;
        
        progress += 0.5;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = `${progress}%`;
        loadingPercentage.textContent = `${Math.floor(progress)}%`;
        
        if (progress < 100) {
            setTimeout(updateLoadingBar, 100);
        }
    }

    updateLoadingBar();
}

let currentProgress = 0;
let targetProgress = 0;
let animationFrameId = null;

function updateLoadingProgress(progress) {
    const progressBar = document.querySelector('.progress');
    const loadingPercentage = document.getElementById('loading-percentage');
    
    if (progressBar && loadingPercentage) {
        targetProgress = progress;
        
        if (!animationFrameId) {
            animateProgress();
        }
    }
}

function animateProgress() {
    const diff = targetProgress - currentProgress;
    const step = diff * 0.1;

    if (Math.abs(diff) > 0.1) {
        currentProgress += step;
        
        const progressBar = document.querySelector('.progress');
        const loadingPercentage = document.getElementById('loading-percentage');
        
        progressBar.style.width = `${currentProgress}%`;
        loadingPercentage.textContent = `${Math.round(currentProgress)}%`;
        
        animationFrameId = requestAnimationFrame(animateProgress);
    } else {
        currentProgress = targetProgress;
        const progressBar = document.querySelector('.progress');
        const loadingPercentage = document.getElementById('loading-percentage');
        
        progressBar.style.width = `${currentProgress}%`;
        loadingPercentage.textContent = `${Math.round(currentProgress)}%`;
        
        animationFrameId = null;
    }
}


window.addEventListener('message', function(event) {
    if (event.data.eventName === 'loadProgress') {
        const progress = Math.floor(event.data.loadFraction * 100);
        updateLoadingProgress(progress);
    }
});

// News Toggle Functionality
const newsContainer = document.querySelector('.news-container');
const toggleNewsBtn = document.querySelector('.toggle-news');

toggleNewsBtn.addEventListener('click', () => {
    newsContainer.classList.toggle('hidden');
}); 