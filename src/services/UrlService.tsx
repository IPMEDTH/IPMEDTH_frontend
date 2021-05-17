let apiDomain = 'https://api.ipmedth.meulen.dev/'

class UrlService {
    static Devices() { return apiDomain + 'api/producten/'; }
    static DeviceImages(filename) { return apiDomain + 'img/devices/' + filename; }
}

export default UrlService;
