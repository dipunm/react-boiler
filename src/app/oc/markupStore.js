const store = {};

export function storeMarkups(markups) {
    Object.assign(store, markups);
}

export function getMarkup(key) {
    return store[key];
}