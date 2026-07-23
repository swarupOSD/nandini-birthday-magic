(function() {
    // Prevent multiple instances
    if (window.hasGlobalMusicInitialized) return;
    window.hasGlobalMusicInitialized = true;

    window.setBGMVolume = function(vol) {
        if(window.globalAudio) window.globalAudio.volume = vol;
    };

    // Check if music should be playing
    if (sessionStorage.getItem('globalBGMPlaying') === 'true') {
        let savedTime = parseFloat(sessionStorage.getItem('globalBGMTime') || 0);
        let bgMusic = window.globalAudio;
        if (!bgMusic) {
            bgMusic = new Audio('bgm.mp3');
            window.globalAudio = bgMusic;
        }
        
        // Only set current time if we are just starting on a new page to avoid skips
        if (bgMusic.paused) {
            bgMusic.currentTime = savedTime;
        }
        
        bgMusic.loop = true;
        bgMusic.volume = 0.6; // Default normal volume
        
        bgMusic.play().catch(e => {
            console.log("Autoplay blocked. Tap to play.");
            const playOnInteract = () => { 
                if (!window.isVideoPlaying) { bgMusic.play(); } 
                document.body.removeEventListener('click', playOnInteract);
                document.body.removeEventListener('touchstart', playOnInteract);
            };
            document.body.addEventListener('click', playOnInteract);
            document.body.addEventListener('touchstart', playOnInteract);
        });

        // Save time frequently so next page knows exactly where we left off
        setInterval(() => {
            if(!bgMusic.paused) {
                sessionStorage.setItem('globalBGMTime', bgMusic.currentTime);
            }
        }, 100);
    }
})();

