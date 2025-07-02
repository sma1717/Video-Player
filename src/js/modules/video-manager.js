import VideoShortcutHandler from '@modules/video-shortcut-handler.js';
import EventHandler from '@modules/common/wd-event-handler.js';

const VideoManager = {

    videoElement : null,

    timer : null,

    setVideoElement(videoElement) {
        this.videoElement = videoElement;
    },

    getVideoElement() {
        return this.videoElement;
    },

    initialize() {
        EventHandler.bind(document, 'fullscreenchange', ()=>{
            this.updateFullscreenUI();
        }, 'fullscreenchange');

        VideoShortcutHandler.setupKeyboardEventListeners(this.videoElement, 'videoPlayer');
    },

    playVideo() {
        this.getVideoElement().controls = false;
        this.getVideoElement().play();
    },

    pauseVideo() {
        this.getVideoElement().pause();
    },

    toggleVideo() {
        this.getVideoElement().paused ? this.playVideo() : this.pauseVideo();
        document.querySelector('#playButton').setAttribute('preTextIconName', this.getVideoElement().paused ? 'wd_play' : 'wd_pause');
        this.updateVideoStatusUI(this.getVideoElement().paused ? 'pause' : 'play');
    },

    seekBackward() {
        this.updateVideoStatusUI('backward');
        this.getVideoElement().currentTime = Math.max(0, this.getVideoElement().currentTime - 5);
    },

    seekForward() {
        this.updateVideoStatusUI('forward');
        this.getVideoElement().currentTime = Math.min(this.getVideoElement().duration, this.getVideoElement().currentTime + 5);
    },

    seekTo(time) {
        this.getVideoElement().currentTime = time;
    },

    toggleFullscreen() {

        if (this.isFullscreen()) {
            if (document.exitFullscreen) document.exitFullscreen();
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
            else if (document.msExitFullscreen) document.msExitFullscreen();
        } else {
            if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
            else if (document.documentElement.webkitRequestFullscreen) document.documentElement.webkitRequestFullscreen();
            else if (document.documentElement.msRequestFullscreen) document.documentElement.msRequestFullscreen();
        }
    },

    updateFullscreenUI() {

        document.querySelector('#fullscreenButton').setAttribute('preTextIconName', document.fullscreenElement ? 'wd_exitfullscreen' : 'wd_fullscreen');
        document.querySelector('.wc-video-player__container').classList.toggle('wc-video--custom-fullscreen');
        document.querySelector('.demo-container').classList.toggle('zwd-width0');
    },

    isFullscreen() {
        return document.querySelector('.wc-video-player__container').classList.contains('wc-video--custom-fullscreen');
    },

    isMuted() {
        return this.getVideoElement().muted;
    },

    setVolume(volume) {
        this.getVideoElement().volume = volume;
    },

    incrementVolume() {
        if (this.isMuted()) {
            this.getVideoElement().muted = false;
        }
        
        const change = 0.10;
        this.getVideoElement().volume = Math.min(1, this.getVideoElement().volume + change);
        this.updateVideoStatusUI('volume');
    },

    decrementVolume() {

        const change = 0.10;

        let newVolume = Math.max(0, this.getVideoElement().volume - change);
        if (newVolume < 1e-10) {
            this.getVideoElement().muted = true;
            this.updateVideoStatusUI('mute');
        } else {
            this.getVideoElement().volume = newVolume;
            this.updateVideoStatusUI('volume');
        }

        this.getVideoElement().volume = newVolume;
        
    },

    toggleMute() {
        this.getVideoElement().muted = !this.getVideoElement().muted;
        this.updateVideoStatusUI(this.getVideoElement().muted ? 'mute' : 'volume');
    },
    
    updateVideoStatusUI( action ) {

        let interval = 1000;

        if (this.timer) {
            clearTimeout(this.timer);
        }
       
        switch (action) {
            case 'pause':
                document.querySelector('#videoStatusButton').setAttribute('preTextIconName', 'wd_pause');
                interval = 500;
                break;
            case 'play':
                document.querySelector('#videoStatusButton').setAttribute('preTextIconName', 'wd_play');
                document.querySelector('#videoStatusButton').children[0].classList.add('zwd-hide-display');
                break;
            case 'forward':
                document.querySelector('#videoStatusButton').setAttribute('preTextIconName', 'wd_forward');
                break;
            case 'backward':
                document.querySelector('#videoStatusButton').setAttribute('preTextIconName', 'wd_backward');
                break;
            case 'volume':
                document.querySelector('#videoStatusButton').setAttribute('preTextIconName', 'wd_volume');
                break;
            case 'mute':
                document.querySelector('#videoStatusButton').setAttribute('preTextIconName', 'wd_volume_mute');
                break;
        }

        if (action !== 'play') {

            document.querySelector('#videoStatusButton').children[0].classList.remove('zwd-large');
            document.querySelector('#videoStatusButton').children[0].classList.add('zwd-big');
            document.querySelector('#videoStatusButton').children[0].classList.remove('zwd-hide-display');

            this.timer =  setTimeout(() => {

                clearTimeout(this.timer);
                this.timer = null;

                if (this.getVideoElement().paused) {
                    document.querySelector('#videoStatusButton').setAttribute('preTextIconName', 'wd_play');
                } else {
                    document.querySelector('#videoStatusButton').children[0].classList.add('zwd-hide-display');
                }
            }, interval);
        } else {
            document.querySelector('#videoStatusButton').children[0].classList.remove('zwd-big');
            document.querySelector('#videoStatusButton').children[0].classList.add('zwd-large');
        }
    }
}

export default VideoManager;