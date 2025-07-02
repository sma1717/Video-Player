/**
 * Utility functions for text rendering
 * Similar to the renderTextAttributes in the original Ember component
 */

/**
 * Escape special characters in the given text array
 * @param {Array} givenTextArray - Array of text values to escape
 * @returns {Array} - Array of escaped values
 */
function escapeTheGivenText(givenTextArray) {
  let escapedValues = [];

  givenTextArray.forEach((value) => {
    // Simple HTML escaping for web components (replace with proper escaping if needed)
    const escapedValue = String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/`/g, '&#x60;')
      .replace(/=/g, '&#x3D;');
    escapedValues.push(escapedValue);
  });

  return escapedValues;
}

/**
 * Replace placeholders in intl message with dynamic values (with escaping)
 * @param {string} intlKey - Internationalization key
 * @param {Array} dynamicValues - Array of dynamic values to replace
 * @returns {string} - Processed intl message with escaped values
 */
function safeReplace(intlKey, dynamicValues) {
  let escapedValues = escapeTheGivenText(dynamicValues);
  return replace(intlKey, escapedValues);
}

/**
 * Replace placeholders in intl message with dynamic values
 * @param {string} intlKey - Internationalization key
 * @param {Array} dynamicValues - Array of dynamic values to replace
 * @returns {string} - Processed intl message
 */
function replace(intlKey, dynamicValues) {
  let intlMessage = window.wdI18NObj && window.wdI18NObj[intlKey];

  if (intlMessage) {
    /**
     * Encode the i18n value to find the defined params exact position while replacing
     * This prevents wrong replacement if dynamic values contain {n} patterns
     */
    intlMessage = encodeURIComponent(intlMessage);

    dynamicValues.forEach((replaceWord, index) => {
      intlMessage = intlMessage.replace(
        new RegExp(encodeURIComponent('{' + index + '}'), 'gi'), 
        '{' + index + '}'
      );
    });

    dynamicValues.forEach((replaceWord, index) => {
      let canReplace = intlMessage.indexOf('{' + index + '}') !== -1;

      if (typeof replaceWord !== 'undefined' && canReplace) {
        /**
         * Encode and replace the dynamic value to avoid wrong params updation
         * If the dynamic value contains {n}, this prevents incorrect replacement
         */
        intlMessage = intlMessage.replace(
          new RegExp('{[' + index + ']}', 'gi'), 
          encodeURIComponent(replaceWord)
        );
      }
    });

    return decodeURIComponent(intlMessage);
  }

  return intlKey; // Return key if message not found
}

/**
 * Render text based on different types (plain string, internationalized key, etc.)
 * @param {Object|string} textObj - Text object or string to render
 * @returns {string} - Rendered text
 */
export function renderText(textObj) {

  // If no text is provided, return empty string
  if (!textObj) {
    return '';
  }
  
  // If it's a simple string, return it directly
  if (typeof textObj === 'string') {
    return textObj;
  }
  
  // Handle object with type, key, and parameters
  switch (textObj.type) {
    case 'string':
      return textObj.key;
      
    case 'intlKey':
      // Use the replace logic for intl key with dynamic values
      const dynamicValues = textObj.params || [];
      return replace(textObj.key, dynamicValues);
      
    case 'escapedIntlKey':
      // Use the safeReplace logic for escaped intl key with dynamic values
      const escapedDynamicValues = textObj.params || [];
      return safeReplace(textObj.key, escapedDynamicValues);
      
    default:
      return textObj.key || '';
  }
}

/**
 * Parse text attribute from string format
 * @param {string} textString - JSON string representation of text object
 * @returns {string} - Rendered text
 */
export function parseAndRenderText(textString) {
  if (!textString) {
    return '';
  }
  
  try {
    const textObj = JSON.parse(textString);
    return renderText(textObj);
  } catch (e) {
    // If parsing fails, assume it's a simple string
    return textString;
  }
} 