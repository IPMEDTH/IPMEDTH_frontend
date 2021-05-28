let apiDomain = 'https://api.ipmedth.meulen.dev/'

class UrlService {
    static Devices() { return apiDomain + 'api/locations/'; }
    static DeviceImages(filename) { return apiDomain + 'img/devices/' + filename; }
    static DeviceMenu(id) { return apiDomain + 'api/locations/' + id; }
    static HelpMenu(id) { return apiDomain + 'api/helpers/' + id; }
}

export default UrlService;
