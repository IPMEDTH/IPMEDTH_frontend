// let apiDomain = 'https://api.ipmedth.meulen.dev/'
// let apiDomain = 'http://localhost/'
let apiDomain = 'http://localhost:8000/'

let apiStorage = apiDomain + "storage/"

class UrlService {
    static getCookie() { return apiDomain + 'sanctum/csrf-cookie' }
    static login() { return apiDomain + 'login' }
    static register() { return apiDomain + 'register' }
    static logout() { return apiDomain + 'logout' }
    static getUser() { return apiDomain + 'api/user' }
    static Devices() { return apiDomain + 'api/locations'; }
    static DeviceImages(filename) { return apiDomain + 'img/devices/' + filename; }
    static DeviceMenu(id) { return apiDomain + 'api/locations/' + id; }
    static HelpMenu(id) { return apiDomain + 'api/locations/' + id; }
    static Materials() { return apiDomain + 'api/materials'}
    static ReservationMenu(userid) { return apiDomain + 'api/reservations/user/' + userid; }
    static Material(term) { return apiDomain + 'api/materials/search/' + term; }
    static MaterialImage(filename) { return apiStorage + filename; }
    static PostMaterial() { return apiDomain + 'api/materials' }
    static Reservations() { return apiDomain + 'api/reservations' }
    static DeleteReservations(id) { return apiDomain + 'api/reservations/' + id; }
}

export default UrlService;
