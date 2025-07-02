/**
 * SimpleEventHandler - A lightweight utility for managing DOM event listeners
 */

const EventHandler = (function() {
  // Store references to all event handlers using arrays
  const listeners = [];
  
  // Track silenced/paused events
  const silencedEvents = [];
  
  // Track all groups that have been used
  const groups = new Set();
  
  /**
   * Bind an event listener to an element
   * @param {Element|Window|Document} element - The DOM element to attach the listener to
   * @param {string} eventType - The event type (e.g., 'click', 'keydown')
   * @param {Function} callback - The event handler function
   * @param {Object} [options] - Additional options
   * @param {boolean|object} [options.capture] - Capture or options object for addEventListener
   * @param {string} [options.group] - Optional group name for this event
   */
  const bind = (element, eventType, callback, options = {}) => {
    
    if (typeof options === 'object' && options.group) {
        groups.add(options.group);
    }
    
    // Add the actual event listener
    element.addEventListener(eventType, callback, options);
    
    // Store reference to the listener
    listeners.push({
      element,
      eventType,
      callback,
      options,
      group: options.group,
      active: true
    });
  };

  /**
   * Unbind listeners for a specific element and event type
   * @param {Element|Window|Document} element - The DOM element
   * @param {string} [eventType] - Optional event type to remove
   * @param {string} [group] - Optional group name to filter by
   * @returns {number} Number of listeners removed
   */
  const unbind = (element, eventType, group) => {
    if (!element && !group) return 0;
    
    let count = 0;
    
    // Create a new array with listeners we want to keep
    const remainingListeners = [];
    
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      
      if ((element && listener.element === element && (!eventType || listener.eventType === eventType)) ||
          (group && listener.group === group)) {
        // Remove the event listener
        listener.element.removeEventListener(
          listener.eventType, 
          listener.callback, 
          listener.options
        );
        count++;
      } else {
        remainingListeners.push(listener);
      }
    }
    
    // Replace the listeners array with our filtered one
    listeners.length = 0;
    for (let i = 0; i < remainingListeners.length; i++) {
      listeners.push(remainingListeners[i]);
    }
    
    return count;
  };

  /**
   * Temporarily disable events without removing them
   * @param {Element} [element] - Optional DOM element
   * @param {string} [eventType] - Optional event type to silence
   * @param {string} [group] - Optional group name to silence
   */
  const silent = (element, eventType, group) => {
    // If all arguments are null/undefined, silence all groups
    const silenceAllGroups = !element && !eventType && !group;
    
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      
      const shouldSilence = 
        listener.active && 
        (
          silenceAllGroups ||
          (element && listener.element === element && (!eventType || listener.eventType === eventType)) ||
          (group && listener.group === group)
        );
      
      if (shouldSilence) {
        // Create a silenced entry
        silencedEvents.push({
          listenerIndex: i,
          element: listener.element,
          eventType: listener.eventType,
          callback: listener.callback,
          options: listener.options,
          group: listener.group
        });
        
        // Remove the actual event listener
        listener.element.removeEventListener(
          listener.eventType, 
          listener.callback, 
          listener.options
        );
        
        // Mark as inactive
        listener.active = false;
      }
    }
  };
  
  /**
   * Resume previously silenced events
   * @param {Element} [element] - Optional DOM element
   * @param {string} [eventType] - Optional event type to revoke
   * @param {string} [group] - Optional group name to revoke
   */
  const revoke = (element, eventType, group) => {
    // If all arguments are null/undefined, revoke all silenced events
    const revokeAll = !element && !eventType && !group;
    
    // Keep track of events that weren't revoked
    const stillSilenced = [];
    
    for (let i = 0; i < silencedEvents.length; i++) {
      const silenced = silencedEvents[i];
      
      const shouldRevoke = 
        revokeAll ||
        (element && silenced.element === element && (!eventType || silenced.eventType === eventType)) ||
        (group && silenced.group === group);
      
      if (shouldRevoke) {
        // Re-add the event listener
        silenced.element.addEventListener(
          silenced.eventType, 
          silenced.callback, 
          silenced.options
        );
        
        // Mark as active again
        listeners[silenced.listenerIndex].active = true;
      } else {
        stillSilenced.push(silenced);
      }
    }
    
    // Update silenced events list
    silencedEvents.length = 0;
    for (let i = 0; i < stillSilenced.length; i++) {
      silencedEvents.push(stillSilenced[i]);
    }
  };

  /**
   * Get all active listeners
   * @param {Element} [element] - Optional element to filter by
   * @param {string} [eventType] - Optional event type to filter by
   * @param {string} [group] - Optional group name to filter by
   * @returns {Array} Array of listener objects
   */
  const getListeners = (element, eventType, group) => {
    if (!element && !eventType && !group) {
      return [...listeners];
    }
    
    return listeners.filter(listener => 
      (!element || listener.element === element) && 
      (!eventType || listener.eventType === eventType) &&
      (!group || listener.group === group)
    );
  };

  /**
   * Get all available groups
   * @returns {Array} Array of group names
   */
  const getGroups = () => {
    return [...groups];
  };

  /**
   * Clear all event listeners managed by this module
   * @param {string} [group] - Optional group name to clear
   */
  const unbindAll = (group) => {
    if (group) {
      // Unbind only the specified group
      unbind(null, null, group);
      return;
    }
    
    // Unbind everything
    for (let i = 0; i < listeners.length; i++) {
      const { element, eventType, callback, options } = listeners[i];
      element.removeEventListener(eventType, callback, options);
    }
    
    listeners.length = 0;
    silencedEvents.length = 0;
  };

  /**
   * Silence all groups
   */
  const silentAll = () => {
    silent();
  };

  /**
   * Revoke all silenced events
   */
  const revokeAll = () => {
    revoke();
  };

  return {
    bind,
    unbind,
    silent,
    silentAll,
    revoke,
    revokeAll,
    getListeners,
    getGroups,
    unbindAll
  };
})();

// For ES modules
export default EventHandler; 