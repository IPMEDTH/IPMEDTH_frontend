let apiDomain = 'https://api.ipmedth.meulen.dev/'
// let apiLocal = 'http://localhost:8000/'

class UrlService {
    static getCookie() { return apiDomain + 'sanctum/csrf-cookie' }
    static login() { return apiDomain + 'login' }
    static register() { return apiDomain + 'register' }
    static Devices() { return apiDomain + 'api/locations'; }
    static DeviceImages(filename) { return apiDomain + 'img/devices/' + filename; }
    static DeviceMenu(id) { return apiDomain + 'api/locations/' + id; }
    static HelpMenu(id) { return apiDomain + 'api/helpers/' + id; }
    static Materials() { return apiDomain + 'api/materials'}
    static Material(term) { return apiDomain + 'api/getmaterials/' + term; }
    static PostMaterial() { return apiDomain + 'api/postmaterial' }
}

export default UrlService;
