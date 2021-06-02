let apiDomain = 'https://api.ipmedth.meulen.dev/'

class UrlService {
    static Devices() { return apiDomain + 'api/locations'; }
    static DeviceImages(filename) { return apiDomain + 'img/devices/' + filename; }
    static Materials() { return apiDomain + 'api/materials'}
    static Material(term) { return apiDomain + 'api/getmaterials/' + term; }
}

export default UrlService;
