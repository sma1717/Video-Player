/**
 * WC-Time-Display Web Component
 * Displays current time and duration of the video
 */

import EventHandler from '@modules/common/wd-event-handler.js';
import videoManager from '@modules/video-manager.js';

export class WCTimeDisplay extends HTMLElement {
    constructor() {
        super();
        this.videoElement = null;
        this.render();
    }

    connectedCallback() {
        this.videoElement = videoManager.getVideoElement();
        this.setupEventListeners();
    }

    disconnectedCallback() {
        this.cleanup();
    }

    setupEventListeners() {
        if (!this.videoElement) return;

        const timeUpdateHandler = () => {
            if (this.videoElement.duration) {
                this.updateTimeDisplay();
            }
        };

        EventHandler.bind(this.videoElement, 'timeupdate', timeUpdateHandler, { group: this.componentId });
        EventHandler.bind(this.videoElement, 'loadedmetadata', () => {
            this.updateTimeDisplay();
        }, { group: this.componentId });
    }

    cleanup() {
        EventHandler.unbind(null, null, this.componentId);
    }

    formatTime(seconds) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = Math.floor(seconds % 60);
        
        if (h > 0) {
            return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }
        return `${m}:${s.toString().padStart(2, '0')}`;
    }

    updateTimeDisplay() {
        const currentTime = this.videoElement.currentTime;
        const duration = this.videoElement.duration;
        
        const currentTimeElement = this.querySelector('.wc-time-display__current');
        const durationElement = this.querySelector('.wc-time-display__duration');
        
        if (currentTimeElement) {
            currentTimeElement.textContent = this.formatTime(currentTime);
        }
        
        if (durationElement) {
            durationElement.textContent = this.formatTime(duration);
        }
    }

    render() {
        this.innerHTML = `
            <div class="wc-time-display">
                <span class="wc-time-display__current">0:00</span>
                <span class="wc-time-display__separator">/</span>
                <span class="wc-time-display__duration">0:00</span>
            </div>
        `;
    }
}

// Register the custom element
customElements.define('wc-time-display', WCTimeDisplay); 