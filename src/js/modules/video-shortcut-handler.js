import videoManager from '@modules/video-manager.js';
import EventHandler from '@modules/common/wd-event-handler.js';

const VideoShortcutHandler = {

    setupKeyboardEventListeners(videoElement, group) {
        const keyboardHandler = (event) => {

            switch (event.code) {
                case 'Space':
                    event.preventDefault();
                    videoManager.toggleVideo();
                    break;

                case 'ArrowLeft':
                    event.preventDefault();
                    videoManager.seekBackward();
                    break;
                
                case 'ArrowRight':
                    event.preventDefault();
                    videoManager.seekForward();
                    break;
                
                case 'ArrowUp':
                    event.preventDefault();
                    videoManager.incrementVolume();
                    break;
                
                case 'ArrowDown':
                    event.preventDefault();
                    videoManager.decrementVolume();
                    break;
                
                case 'KeyM':
                    event.preventDefault();
                    videoManager.toggleMute();
                    break;
                
                case 'KeyF':
                    event.preventDefault();
                    videoManager.toggleFullscreen();
                    break;
            }
        };

        EventHandler.bind(document, 'keydown', keyboardHandler, group);
        EventHandler.bind(videoElement, 'click', ()=>{videoManager.toggleVideo()}, 'videoElement');
    }
}

export default VideoShortcutHandler;