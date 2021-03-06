let apiDomain = 'https://api.ipmedth.meulen.dev/'
// let apiDomain = 'http://localhost/'
// let apiDomain = 'http://localhost:8000/'

let apiStorage = apiDomain + "storage/public/"   // online
// let apiStorage = apiDomain + "storage/"           // local

class UrlService {
    static getCookie() { return apiDomain + 'sanctum/csrf-cookie' }
    static login() { return apiDomain + 'login' }
    static register() { return apiDomain + 'register' }
    static logout() { return apiDomain + 'logout' }
    static getUser() { return apiDomain + 'api/user' }
    static getUsers() { return apiDomain + 'api/users' }
    static setUserAdmin(id) { return apiDomain + 'api/users/' + id; }
    static Devices() { return apiDomain + 'api/locations'; }
    static DeviceImages(filename) { return apiDomain + 'img/devices/' + filename; }
    static DeviceMenu(id) { return apiDomain + 'api/locations/' + id; }
    static HelpMenu(id) { return apiDomain + 'api/locations/' + id; }
    static HelperMenu() { return apiDomain + 'api/helpers' }
    static Materials() { return apiDomain + 'api/materials'}
    static ReservationMenu(userid) { return apiDomain + 'api/reservations/user/' + userid; }
    static GetReservationMenu(deviceid, date) { return apiDomain + 'api/reservations/' + deviceid + '/' + date; }
    static Material(term) { return apiDomain + 'api/materials/search/' + term; }
    static MaterialImage(filename) { return apiStorage + filename; }
    static PostMaterial() { return apiDomain + 'api/materials' }
    static DeleteMaterial(id) { return apiDomain + 'api/materials/' + id }
    static History() { return apiDomain + 'api/history'}
    static getHistory(term) { return apiDomain + 'api/history/search/' + term}
    static Reservations() { return apiDomain + 'api/reservations' }
    static DeleteReservations(id) { return apiDomain + 'api/reservations/' + id; }
    static verifyEmail() { return apiDomain + 'email/verification-notification' }
    static forgotPassword() { return apiDomain + 'forgot-password' }
    static resetPassword() { return apiDomain + 'reset-password' }
    static createToken() { return apiDomain + 'api/tokens' }
    static delToken(tokenId) { return apiDomain + 'api/tokens/' + tokenId }
}

export default UrlService;
