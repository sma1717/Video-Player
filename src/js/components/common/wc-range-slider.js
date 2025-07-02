export class WCRangeSlider extends HTMLElement {
    constructor() {
        super();
        this.render();
    }
    
    /**
     * Render the range slider
     */
    render() {
        
        const min = this.getAttribute('min') || '0';
        const max = this.getAttribute('max') || '100';
        const step = this.getAttribute('step') || '1';
        const value = this.getAttribute('value') || '0';
        const customStyle = this.getAttribute('custom-style') || '';

        this.innerHTML = `
                <input
                    id="${this.getAttribute('elemID')}"
                    type="range" 
                    class="wc-range-slider zwd-cursor"
                    value="${value}" 
                    min="${min}" 
                    max="${max}" 
                    step="${step}"
                    style="${customStyle}"
                >
        `;
    }
}

// Register the custom element
customElements.define('wc-range-slider', WCRangeSlider); 