/**
 * WC-Video-Player Web Component
 * Simple video player with all controls
 */

import EventHandler from '@modules/common/wd-event-handler.js';
import VideoManager from '@modules/video-manager.js';

export class WCVideoPlayer extends HTMLElement {
    constructor() {
        super();
        
    }

    connectedCallback() {

        this.getVideoSrc();

        EventHandler.bind(this.querySelector('#seekBackwardButton'), 'click', ()=>{VideoManager.seekBackward()}, 'seekBackwardButton');
        EventHandler.bind(this.querySelector('#seekForwardButton'), 'click', ()=>{VideoManager.seekForward()}, 'seekForwardButton');
    }

    getVideoSrc() {

        const urlJson = window.urlJson;
        let posterSrc = "images/video-poster.png",
            videoSrc = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

        // if (typeof urlJson === 'object') {

        //     let pcUrl = urlJson.PC_URL,
        //         apiPathPrefix = urlJson.API_PATH_PREFIX,
        //         resUrl = pcUrl + apiPathPrefix + '/file/' + window.location.href.split('/')[window.location.href.split('/').length - 1] + '/previewinfo';
                
        //     videoSrc = "https://download-accl.zoho.com/v1/workdrive/download/" + resUrl + "?orig=true";

        //     fetch(resUrl)
        //         .then(response => response.json())
        //         .then(data => {
        //             posterSrc = data.attributes.poster_image;
        //         })
        //         .catch(error => {
        //             console.error('Error:', error);
        //         });

        //     this.setAttribute('src', videoSrc);
        //     this.setAttribute('poster', posterSrc);

        // }else{
        //     posterSrc = "images/Zoho-Desk-Sridhar-Vembu.jpg";
        //     videoSrc = "https://download-accl.zoho.com/v1/workdrive/download/irovwbe2d94f95cfd4dc9aed9fb0c11eb2bbe?orig=true";
        // }


        this.setAttribute('src', videoSrc);
        this.setAttribute('poster', posterSrc);

        this.render();
    }

    /**
     * Render the video player
     */
    render() {

        this.className = 'wc-video-player';
        
        this.innerHTML = `
            <div class="wc-video-player__container">

                <wc-video-status></wc-video-status>

                <wc-video 
                    class="wc-video-player__video"
                    src=${this.getAttribute('src')}
                    poster=${this.getAttribute('poster')}
                    width=${this.getAttribute('width')}
                    height=${this.getAttribute('height')}
                    show-controls=${this.getAttribute('show-controls')}
                    autoplay=${this.getAttribute('autoplay')}
                    loop=${this.getAttribute('loop')}
                    muted=${this.getAttribute('muted')}
                    preload=${this.getAttribute('preload')}>
                </wc-video>
                
                <div id="custom-controls" class="zwd-m-top16 zwd-video-controller zwd-unselectable zwd-flex wc-video__controls">
                    
                    <div id="progress">
                        <wc-seekbar></wc-seekbar>
                    </div>
                    
                    <div class="zwd-flex zwd-alignitem-center zwd-m-left8">
                        <wc-button
                            id="seekBackwardButton"
                            customClass="zwd-icon zwd-black zwd-basic zwd-backgroundless"
                            preTextIconName="wd_backward">
                        </wc-button>

                        <wc-play-button></wc-play-button>

                        <wc-button
                            id="seekForwardButton"
                            customClass="zwd-icon zwd-black zwd-basic zwd-backgroundless"
                            preTextIconName="wd_forward">
                        </wc-button>

                        <wc-volume-control 
                            muted=${this.getAttribute('muted')}>
                        </wc-volume-control>

                        <wc-time-display 
                            class="wc-video-player__time-display transformX">
                        </wc-time-display>

                    </div>
                    
                    <div class="zwd-flex zwd-justify-end zwd-flex-shrink-0 zwd-m-leftauto">
                        <wc-fullscreen-button></wc-fullscreen-button>
                    </div>
                </div>
            </div>
        `;

    }

}

// Register the custom element
customElements.define('wc-video-player', WCVideoPlayer); 