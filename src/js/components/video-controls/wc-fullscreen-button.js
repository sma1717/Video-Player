/**
 * WC-Fullscreen-Button Web Component
 * Simple fullscreen toggle button for video player
 */

import EventHandler from '@modules/common/wd-event-handler.js';
import VideoManager from '@modules/video-manager.js';

export class WCFullscreenButton extends HTMLElement {
    constructor() {
        super();
        
        this.render();
    }

    connectedCallback() {
        EventHandler.bind(this.querySelector('#fullscreenButton'), 'click', ()=>{VideoManager.toggleFullscreen()}, 'fullscreenButton');
    }

    disconnectedCallback() {
        EventHandler.unbind(this.querySelector('#fullscreenButton'), 'click', 'fullscreenButton');
    }

    render() {

        this.innerHTML = `
            <wc-button
                id="fullscreenButton"
                customClass="zwd-icon zwd-black zwd-basic zwd-backgroundless"
                preTextIconName="wd_fullscreen">
            </wc-button>
        `;
    }

}

// Register the custom element
customElements.define('wc-fullscreen-button', WCFullscreenButton); 