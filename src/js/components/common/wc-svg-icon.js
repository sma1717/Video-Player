// Helper function to convert camelCase attribute names to kebab-case
function _convertAttributeName(attr) {
  switch (attr) {
    case 'className':
      return 'class'; //No I18N
    case 'fillRule':
      return 'fill-rule'; //No I18N
    case 'fillOpacity':
      return 'fill-opacity'; //No I18N
    case 'clipRule':
      return 'clip-rule'; //No I18N
    case 'strokeLinecap':
      return 'stroke-linecap'; //No I18N
    case 'strokeLinejoin':
      return 'stroke-linejoin'; //No I18N
    default:
      return attr.toLowerCase();
  }
}

function _setAttributes(element, obj, attributes) {
  attributes.forEach(attr => {
    if (obj[attr] !== undefined && obj[attr] !== '') {
      const attributeName = _convertAttributeName(attr);
      element.setAttribute(attributeName, obj[attr]);
    }
  });
}

// Helper function to convert object attributes to string
function _attributesToString(obj, attributes) {
  return attributes
    .filter(attr => obj[attr] !== undefined && obj[attr] !== '')
    .map(attr => {
      const attributeName = _convertAttributeName(attr);
      return `${attributeName}="${obj[attr]}"`;
    })
    .join(' ');
}

class SvgIcon extends HTMLElement {
  constructor() {
    super();
    this._name = '';
    this._svgJson = null;
    this._replaced = false;
  }

  static get observedAttributes() {
    return ['name', 'viewbox', 'aria-label', 'class']; //No I18N
  }

  connectedCallback() {

    if (this.hasAttribute('name')) {
      this._name = this.getAttribute('name');
      this._updateIcon();
    }
  }

  _updateIcon() {

    if (this._replaced) {
      return;
    }

    // Look up icon data from window.svg_icons
    this._svgJson = window.svg_icons && window.svg_icons[this._name] ? window.svg_icons[this._name] : null;

    if (this._svgJson) {
      this._replaceWithSvg();
    }
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
    this._updateIcon();
  }

  _replaceWithSvg() {
    // Build SVG attributes
    const attributes = [];
    
    if (this.hasAttribute('class')) {
      attributes.push(`class="${this.getAttribute('class')}"`);
    }
    
    if (this.hasAttribute('aria-label')) {
      attributes.push(`aria-label="${this.getAttribute('aria-label')}"`);
    }
    
    // Set viewBox from icon data or attribute
    const viewBox = this._svgJson.viewBox || this.getAttribute('viewbox') || '0 0 20 20'; //No I18N
    attributes.push(`viewBox="${viewBox}"`);
    
    // Set aria-label from icon data if not already set
    if (this._svgJson.ariaLabel && !this.hasAttribute('aria-label')) {
      attributes.push(`aria-label="${this._svgJson.ariaLabel}"`);
    }
    
    // Set data attribute
    attributes.push(`data-svg-name="${this._name}"`);

    // Generate SVG content
    const svgContent = this._generateSvgContent();
    
    // Create SVG HTML string
    const svgHTML = `<svg ${attributes.join(' ')}>${svgContent}</svg>`;
    
    // Create temporary container and extract SVG
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = svgHTML;
    const svg = tempDiv.firstElementChild;
    
    // Replace the custom element with the SVG
    this.parentNode.replaceChild(svg, this);
    this._replaced = true;
  }

  _generateSvgContent() {
    if (!this._svgJson) {
      return '';
    }

    let content = '';

    // Generate rectangles
    if (this._svgJson.rect) {
      this._svgJson.rect.forEach(rectObj => {
        const attrs = _attributesToString(rectObj, ['className', 'fill', 'opacity', 'width', 'height', 'stroke', 'x', 'y', 'rx', 'fillRule']);
        content += `<rect ${attrs}/>`;
      });
    }

    // Generate lines
    if (this._svgJson.line) {
      this._svgJson.line.forEach(lineObj => {
        const attrs = _attributesToString(lineObj, ['className', 'x1', 'y1', 'x2', 'y2', 'stroke', 'strokeLinecap', 'strokeLinejoin']);
        content += `<line ${attrs}/>`;
      });
    }

    // Generate paths
    if (this._svgJson.path) {
      this._svgJson.path.forEach(pathObj => {
        const attrs = _attributesToString(pathObj, ['className', 'd', 'fill', 'opacity', 'stroke', 'transform', 'fillRule', 'fillOpacity', 'clipRule']);
        content += `<path ${attrs}/>`;
      });
    }

    // Generate ellipses
    if (this._svgJson.ellipse) {
      this._svgJson.ellipse.forEach(ellipseObj => {
        const attrs = _attributesToString(ellipseObj, ['className', 'cx', 'cy', 'rx', 'ry', 'stroke', 'fill', 'fillRule', 'opacity']);
        content += `<ellipse ${attrs}/>`;
      });
    }

    // Generate polygons
    if (this._svgJson.polygon) {
      this._svgJson.polygon.forEach(polygonObj => {
        const attrs = _attributesToString(polygonObj, ['className', 'points', 'transform', 'fill', 'fillRule']);
        content += `<polygon ${attrs}/>`;
      });
    }

    // Generate circles
    if (this._svgJson.circle) {
      this._svgJson.circle.forEach(circleObj => {
        const attrs = _attributesToString(circleObj, ['className', 'cx', 'cy', 'r', 'fill', 'fillRule']);
        content += `<circle ${attrs}/>`;
      });
    }

    return content;
  }
}

// Register the custom element
customElements.define('wc-svg-icon', SvgIcon); //No I18N

export default SvgIcon; 