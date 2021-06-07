let apiDomain = 'https://api.ipmedth.meulen.dev/'
// let apiLocal = 'http://localhost:8000/'

class UrlService {
    static getCookie() { return apiDomain + 'sanctum/csrf-cookie' }
    static Devices() { return apiDomain + 'api/locations/'; }
    static DeviceImages(filename) { return apiDomain + 'img/devices/' + filename; }
    static Materials() { return apiDomain + 'api/materials'}
    static Material(term) { return apiDomain + 'api/getmaterials/' + term; }
    static PostMaterial() { return apiDomain + 'api/postmaterial' }
}

export default UrlService;
