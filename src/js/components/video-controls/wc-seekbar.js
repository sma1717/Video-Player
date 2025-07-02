import EventHandler from '@modules/common/wd-event-handler.js';
import videoManager from '@modules/video-manager.js';

export class WCSeekbar extends HTMLElement {
    
    constructor() {
        super();
        this.render();
    }

    connectedCallback() {
        this.bindProgressEvents();
        this.bindTooltipEvents();
    }

    bindProgressEvents() {
       
        const video = videoManager.getVideoElement();
        const seekbar = document.getElementById('vp-seekbar');
        
        EventHandler.bind(video, 'loadedmetadata', () => {
            seekbar.max = video.duration;
        }, 'vp-seekbar');

        EventHandler.bind(video, 'timeupdate', () => {
            seekbar.value = video.currentTime;
        }, 'vp-seekbar');

        EventHandler.bind(seekbar, 'input', () => {
            videoManager.seekTo(seekbar.value);
        }, 'vp-seekbar');

        EventHandler.bind(seekbar, 'click', (e) => {
            const rect = seekbar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            videoManager.seekTo(percent * video.duration);
        }, 'vp-seekbar');
    }

    bindTooltipEvents() {

        const video = videoManager.getVideoElement();
        const seekbar = document.getElementById('vp-seekbar');
        const tooltip = document.getElementById('vp-tooltip');

        EventHandler.bind(seekbar, 'mousemove', (e) => {
            const rect = seekbar.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            const time = percent * video.duration;

            tooltip.style.left = `${e.clientX - rect.left}px`;
            tooltip.style.display = 'block';
            tooltip.textContent = formatTime(time);
        }, 'vp-seekbar');

        EventHandler.bind(seekbar, 'mouseleave', () => {
            tooltip.style.display = 'none';
        }, 'vp-seekbar');

        // Format time as mm:ss
        function formatTime(time) {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60).toString().padStart(2, '0');
            return `${minutes}:${seconds}`;
        }
    }

    render() {
        this.innerHTML = `
            <div id="vp-tooltip" style="position: absolute; top: -40px; background: black; color: white; padding: 2px 6px; border-radius: 4px; display: none; pointer-events: none;"></div>
            <div class="wc-seek-bar__track">
                <wc-range-slider
                    elemID="vp-seekbar"
                    value="0"
                    min="0"
                    step="0.1"
                    custom-style="width: 100%;">
                </wc-range-slider>
            </div>
        `;
    }
}

// Register the custom element
customElements.define('wc-seekbar', WCSeekbar); 