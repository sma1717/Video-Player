import EventHandler from '@modules/common/wd-event-handler.js';
import VideoManager from '@modules/video-manager.js';

export default class WcVideoStatus extends HTMLElement {    

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
             <div class="zwd-absolute-position zwd-position-middle zwd-position-center zwd-flex zwd-justify-center zwd-zindex10">
                    <wc-button 
                        id="videoStatusButton"
                        customClass="zwd-opacity5 zwd-black zwd-icon zwd-marginless zwd-circular zwd-large zwd-animating zwd-transition"
                        pretexticonname="wd_play"
                        style="z-index: 9999;"
                    >
                    </wc-button>
                </div>
        `;

        EventHandler.bind(this.querySelector('#videoStatusButton'), 'click', ()=>{VideoManager.toggleVideo()}, 'centerPlayButton');
    }
}

customElements.define('wc-video-status', WcVideoStatus);