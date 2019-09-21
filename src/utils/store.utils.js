/**
 * map initial state for as store to store state
 * @param {object} store
 * @param {object} initialState
 */
export function mapInitialStateToStoreState(store, initialState = {}) {
  Object.keys(initialState).forEach(key => {
    store[key] = initialState[key];
  });
}
