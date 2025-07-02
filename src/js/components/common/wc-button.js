/**
 * WebComponent version of wd-button
 * Converted from Ember component
 */

// Import utilities
import { parseAndRenderText } from '@modules/common/render-text.js';

import EventHandler from '@modules/common/wd-event-handler.js';

class WcButton extends HTMLElement {
  // Define observed attributes for property changes
  static get observedAttributes() {
    return [
      'customClass',
      'disabled',
      'ariaLabelMessage',
      'displayName',
      'tooltip',
      'hasTooltip',
      'tooltipPosition',
      'isExpanded',
      'hasPopup',
      'role',
      'pretexticonname',
      'pretextitagclass',
      'pretexticonclass',
      'posttexticonname',
      'posttextitagclass',
      'lock-click-action',
      'name'
    ];
  }

  constructor() {
    super();

    // Internal state
    this._passEventInCB = false;
  }

  // Lifecycle method when element is added to DOM
  connectedCallback() {
    // Render the component
    this._render();
    
    // Add event listeners
    EventHandler.bind(this, 'click', (event) => {

      if (this.onClick) {
        if (this._passEventInCB) {
          this.onClick(event);
        } else {
          this.onClick();
        }
      }
    });
  }

  // Lifecycle method when element is removed from DOM
  disconnectedCallback() {
    // Remove event listeners
    EventHandler.unbind(this, 'click');
  }

  // When attributes change
  attributeChangedCallback(name, oldValue, newValue) {

    if (oldValue !== newValue) {

      this._render();
    }
  }

  // Getters for properties
  get customClass() {
    let value = this.getAttribute('customClass') || '';
    if (this.isDisabled) {
      value += ' zwd-disabled';
    }
    return value;
  }

  get isDisabled() {
    const value = this.getAttribute('disabled');
    return value === 'true' || value === '';
  }

  get ariaLabelMessage() {
    if (this.getAttribute('ariaLabelMessage')) {
      return this.getAttribute('ariaLabelMessage');
    }
    if (!this.getAttribute('displayName') && !this.getAttribute('name') && this.getAttribute('tooltip')) {
      return this.getAttribute('tooltip');
    }
    return '';
  }

  get hasTooltip() {
    const value = this.getAttribute('hasTooltip');
    return value === 'true' || value === '';
  }

  get tooltip() {
    return this.getAttribute('tooltip') || '';
  }

  get tooltipPosition() {
    return this.getAttribute('tooltipPosition') || '';
  }

  get isExpanded() {
    const value = this.getAttribute('isExpanded');
    return value === 'true' || value === '';
  }

  get hasPopup() {
    const value = this.getAttribute('hasPopup');
    return value === 'true' || value === '';
  }

  get id() {
    return this.getAttribute('id') || '';
  }

  get role() {
    return this.getAttribute('role') || '';
  }

  get preTextIconName() {
    return this.getAttribute('preTextIconName') || '';
  }

  get preTextITagClass() {
    return this.getAttribute('preTextITagClass') || '';
  }

  get preTextIconClass() {
    return this.getAttribute('preTextIconClass') || '';
  }

  get postTextIconName() {
    return this.getAttribute('postTextIconName') || '';
  }

  get postTextITagClass() {
    return this.getAttribute('postTextITagClass') || '';
  }

  get lockClickAction() {
    const value = this.getAttribute('lockClickAction');
    return value === 'true' || value === '';
  }

  // Render the component
  _render() {
    // Create the button element
    const buttonClasses = ['zwd-ui', 'zwd-button'];
    if (this.lockClickAction) {
      buttonClasses.push('zwd-loading');
    }
    if (this.customClass) {
      buttonClasses.push(this.customClass);
    }
    // Prepare display text
    const displayText = this.getAttribute('displayName') || 
      (this.getAttribute('name') ? parseAndRenderText(this.getAttribute('name')) : '');
    
    // Generate HTML directly without templates
    const buttonHTML = `
      <button 
        ${this.id ? `id="${this.id}"` : ''}
        type="button" 
        tabindex="0"
        role="${this.role || 'button'}"
        class="${buttonClasses.join(' ')}"
        ${this.hasTooltip ? 'zd-tooltip="true"' : ''}
        ${this.tooltip ? `zd-title="${this.tooltip}"` : ''}
        ${this.tooltipPosition ? `zd-tooltip-position="${this.tooltipPosition}"` : ''}
        ${this.ariaLabelMessage ? `aria-label="${this.ariaLabelMessage}"` : ''}
        ${this.isExpanded ? 'aria-expanded="true"' : ''}
        ${this.hasPopup ? 'aria-haspopup="true"' : ''}
        ${this.isDisabled ? 'aria-disabled="true"' : ''}
        preTextIconName=${this.getAttribute('preTextIconName')}
      >
        ${this.preTextIconName ? `
          <i class="zwd-icon zwd-flex ${this.preTextITagClass || ''}">
            <wc-svg-icon name=${this.preTextIconName} ${this.preTextIconClass ? `class="${this.preTextIconClass}"` : ''}></wc-svg-icon>
          </i>
        ` : ''}
        <span>
          ${displayText}
        </span>
        ${this.postTextIconName ? `
          <i class="zwd-icon zwd-right zwd-flex ${this.postTextITagClass || ''}">
            <wc-svg-icon name="${this.postTextIconName}"></wc-svg-icon>
          </i>
        ` : ''}
      </button>
    `;
    
    // Update the DOM
    this.innerHTML = buttonHTML;
  }
  
  // Public methods
  setPassEventInCallback(value) {
    this._passEventInCB = !!value;
  }
}

// Define the custom element
customElements.define('wc-button', WcButton);

export default WcButton; 