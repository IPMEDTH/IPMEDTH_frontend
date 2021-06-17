export const CHANGE_ISLOGGEDIN = "CHANGE_ISLOGGEDIN";
export const CHANGE_USER = "CHANGE_USER";
export const CHANGE_LOCATIONS = "CHANGE_LOCATIONS";

export const changeIsLoggedIn = isLoggedIn => ({
    type: CHANGE_ISLOGGEDIN,
    payload: isLoggedIn
});

export const changeUser = user => ({
    type: CHANGE_USER,
    payload: user
});

export const changeLocations = locations => ({
    type: CHANGE_LOCATIONS,
    payload: locations
});