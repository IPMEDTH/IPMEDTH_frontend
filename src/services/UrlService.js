// let apiDomain = 'https://api.ipmedth.meulen.dev/'
let apiDomain = 'http://localhost/'

class UrlService {
    static getCookie() { return apiDomain + 'sanctum/csrf-cookie' }
    static login() { return apiDomain + 'login' }
    static register() { return apiDomain + 'register' }
    static Devices() { return apiDomain + 'api/locations'; }
    static DeviceImages(filename) { return apiDomain + 'img/devices/' + filename; }
    static DeviceMenu(id) { return apiDomain + 'api/locations/' + id; }
    static HelpMenu(id) { return apiDomain + 'api/locations/' + id; }
    static Materials() { return apiDomain + 'api/materials'}
    static Material(term) { return apiDomain + 'api/materials/search/' + term; }
    static PostMaterial() { return apiDomain + 'api/materials' }
    static PostReservation() { return apiDomain + 'api/reservations' }
}

export default UrlService;
