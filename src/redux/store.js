import { combineReducers, createStore } from "redux";
import { isLoggedIn, user, locations } from "./reducers";

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
        // ignore write errors
    }
};

const persistedState = loadState();
export const store = createStore(
    combineReducers({
        isLoggedIn,
        user,
        locations
    }),
    persistedState
);

store.subscribe(() => {
    saveState(store.getState());
});