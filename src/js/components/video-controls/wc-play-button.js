import EventHandler from '@modules/common/wd-event-handler.js';
import VideoManager from '@modules/video-manager.js';

export class WCPlayButton extends HTMLElement {
    constructor() {
        super();
        
        this.playIconName = 'wd_play';
        this.render();
    }

    connectedCallback() {
        EventHandler.bind(this.querySelector('#playButton'), 'click', ()=>{VideoManager.toggleVideo()}, 'playButton');
    }

    disconnectedCallback() {
        EventHandler.unbind(this.querySelector('#playButton'), 'click', 'playButton');
    }

    render() {
        this.className = 'wc-play-button';
        this.innerHTML = `
            <wc-button
                id="playButton"
                customClass="zwd-icon zwd-black zwd-basic zwd-backgroundless"
                preTextIconName="wd_play"
                >
            </wc-button>
        `;
    }
}

// Register the custom element
customElements.define('wc-play-button', WCPlayButton); 