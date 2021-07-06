import { combineReducers, createStore } from "redux";
import { user, locations } from "./reducers";

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return {"user":"","locations":[]};
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
        user,
        locations
    }),
    persistedState
);

store.subscribe(() => {
    saveState(store.getState());
});