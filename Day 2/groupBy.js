/**
 * Task 1: groupBy with Bonus (supports property key or callback function)
 * @param {Array} items - Array of objects to group
 * @param {string|Function} keyOrFn - Property name or callback function
 * @returns {Object} - Grouped object
 */
function groupBy(items, keyOrFn) {
  if (!Array.isArray(items)) return {};

  return items.reduce((acc, item) => {
    // Evaluate whether the second argument is a function or a property key
    const key = typeof keyOrFn === 'function' 
      ? keyOrFn(item) 
      : (item != null ? item[keyOrFn] : undefined);

    // Safely convert keys to strings for object property lookup
    const groupKey = key !== undefined ? String(key) : 'undefined';

    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);

    return acc;
  }, {});
}

// Export for module systems if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = groupBy;
}