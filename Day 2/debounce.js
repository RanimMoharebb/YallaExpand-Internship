/**
 * Task 2: Debounce function with immediate execution option bonus
 * @param {Function} fn - The function to debounce
 * @param {number} delay - The delay in milliseconds
 * @param {boolean} immediate - Whether to trigger on the leading edge
 * @returns {Function} - The debounced wrapper function
 */
function debounce(fn, delay, immediate = false) {
  let timeout = null;

  return function (...args) {
    const context = this;

    const later = function () {
      timeout = null;
      if (!immediate) {
        fn.apply(context, args);
      }
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, delay);

    if (callNow) {
      fn.apply(context, args);
    }
  };
}

// Export for module systems if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = debounce;
}