import EventHandler from '@modules/common/wd-event-handler.js';
import videoManager from '@modules/video-manager.js';

export class WCVolumeControl extends HTMLElement {
    
    constructor() {
        super();
        this.render();
    }

    connectedCallback() {

        const volumeButton = document.getElementById('volumeButton');
        const volumeSlider = document.getElementById('volume-slider');
        const video = videoManager.getVideoElement();

        if (this.getAttribute('muted') === 'true') {
            volumeButton.setAttribute('preTextIconName', 'wd_volume_mute');
        } else {
            volumeButton.setAttribute('preTextIconName', 'wd_volume');
        }

        EventHandler.bind(volumeButton, 'click', (e)=>{
            e.preventDefault();
            e.stopPropagation();
            videoManager.toggleMute();
            document.getElementById('volumeButton').setAttribute('preTextIconName', videoManager.isMuted() ? 'wd_volume_mute' : 'wd_volume');
        }, 'volume-button-click');

        
        // Listen to video volumechange event to update slider (same pattern as seekbar)
        EventHandler.bind(video, 'volumechange', () => {
            document.getElementById('volumeButton').setAttribute('preTextIconName', videoManager.isMuted() ? 'wd_volume_mute' : 'wd_volume');
            volumeSlider.value = videoManager.isMuted() ? 0 : video.volume * 100;
        }, 'volume-control');

        EventHandler.bind(volumeSlider, 'input', (e)=>{
            videoManager.setVolume(e.target.value / 100);
        }, 'volume-slider-input');

    }

    render() {
        this.className = 'wc-volume-control';
        this.innerHTML = `
            <div class="wc-volume-control__container">
            <wc-button
                    id="volumeButton"
                customClass="zwd-icon zwd-black zwd-basic zwd-backgroundless"
                ariaLabelMessage="Mute/unmute"
                    preTextIconName="wd_volume">
            </wc-button>
            <div class="wc-volume-control__slider-container">
                    <wc-range-slider
                        elemID="volume-slider"
                        value="100"
                        min="0"
                        max="100"
                        step="1"
                        custom-style="width: 80px; height: 5px;">
                    </wc-range-slider>
                </div>
            </div>
        `;

    }

}

// Register the custom element
customElements.define('wc-volume-control', WCVolumeControl);