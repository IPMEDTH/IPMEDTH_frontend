import { CHANGE_USER, CHANGE_LOCATIONS } from "./actions.js";

export const user = (state = {}, action) => {
    switch (action.type) {
        case CHANGE_USER:
            return action.payload;
        default:
            return state;
    }
};

export const locations = (state = [], action) => {
    switch (action.type) {
        case CHANGE_LOCATIONS:
            return action.payload;
        default:
            return state;
    }
};
