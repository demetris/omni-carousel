/**
 * Inserts an element into an array of elements with pre-assigned indexes
 *
 * Modifies the provided array directly by inserting the element at the appropriate position.
 * Maintains sort order based on the elements’ original indexes.
 *
 * @param array - Array of elements (typically DOM elements) to modify
 * @param element - The element to insert
 * @param getOriginalIndex - Function that retrieves the original index for elements in the array
 */
export const insertInOrder = <T>(
  array: T[],
  element: T,
  getOriginalIndex: (item: T) => number
): void => {
  const elementOriginalIndex = getOriginalIndex(element);

  //
  // Use findIndex to get the insertion point
  //
  const insertionPoint = array.findIndex(item =>
    getOriginalIndex(item) > elementOriginalIndex
  );

  //
  // If no element with higher index is found, append to end
  //
  const insertAt = insertionPoint === -1 ? array.length : insertionPoint;

  array.splice(insertAt, 0, element);
};

/**
 * Removes an element at a specific index from an array
 *
 * Modifies the provided array directly by removing the element at the specified index.
 * Does nothing if the index is out of bounds.
 *
 * @param array - The array to modify
 * @param index - The index of the element to remove
 */
export const removeAtIndex = <T>(array: T[], index: number): void => {
  if (index < 0 || index >= array.length) {
    //
    // Do nothing if index is out of bounds
    //
    return;
  }

  array.splice(index, 1);
};
