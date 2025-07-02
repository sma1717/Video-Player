import VideoManager from '@modules/video-manager.js';

export class WCVideo extends HTMLElement {
    constructor() {
        super();
        
        this.initialized = false;
        this.render();
    }

    connectedCallback() {
        this.initialized = true;
    }

    disconnectedCallback() {
        this.initialized = false;
        VideoManager.cleanup();
    }
 
    /**
     * Render the video player component
     */
    render() {
        this.innerHTML = `<video class="wc-video__video wc-video"
                                tabindex="0"
                                src=${this.getAttribute('src')}
                                poster=${this.getAttribute('poster')}
                                width=${this.getAttribute('width')}
                                height=${this.getAttribute('height')}
                                ${this.getAttribute('playsinline') === 'true' ? "playsinline" : ""}
                                ${this.getAttribute('autoplay') === 'true' ? "autoplay" : ""}
                                ${this.getAttribute('loop') === 'true' ? "loop" : ""}
                                ${this.getAttribute('muted') === 'true' ? "muted" : ""}
                                ${this.getAttribute('preload') === 'true' ? "preload" : ""}
                                ></video>`;

        VideoManager.setVideoElement(this.querySelector('video'));
        VideoManager.initialize();
    }
       
}

// Register the custom element
customElements.define('wc-video', WCVideo); 