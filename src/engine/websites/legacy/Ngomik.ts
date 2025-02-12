// Auto-Generated export from HakuNeko Legacy
// See: https://gist.github.com/ronny1982/0c8d5d4f0bd9c1f1b21dbf9a2ffbfec9

//import { Tags } from '../../Tags';
import icon from './Ngomik.webp';
import { DecoratableMangaScraper } from '../../providers/MangaPlugin';

export default class extends DecoratableMangaScraper {

    public constructor() {
        super('ngomik', `Ngomik`, 'https://ngomik.net' /*, Tags.Language.English, Tags ... */);
    }

    public override get Icon() {
        return icon;
    }
}

// Original Source
/*
class Ngomik extends WordPressMangastream {

    constructor() {
        super();
        super.id = 'ngomik';
        super.label = 'Ngomik';
        this.tags = [ 'manga', 'indonesian' ];
        this.url = 'https://ngomik.net';
        this.path = '/all-komik/';
    }

    async _initializeConnector() {
        // NOTE: Multiple domains may be protected by CloudFlare and needs to be unlocked ...
        const domains = [ this.url, 'https://cdn.ngomik.in', 'https://cdn2.ngomik.in' ];
        for(let domain of domains) {
            let uri = new URL(domain);
            let request = new Request(uri.href, this.requestOptions);
            await Engine.Request.fetchUI(request, '', 60000, true);
        }
    }

    async _getMangas() {
        let mangaList = [];
        let categories = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        categories = [ '.', '0-9', ...categories ];
        for(let category of categories) {
            for (let page = 1, run = true; run; page++) {
                const mangas = await this._getMangasFromPage(category, page);
                mangas.length > 0 ? mangaList.push(...mangas) : run = false;
            }
        }
        return mangaList;
    }

    async _getMangasFromPage(category, page) {
        const uri = new URL(`${this.path}page/${page}/`, this.url);
        uri.searchParams.set('show', category);
        const request = new Request(uri, this.requestOptions);
        const data = await this.fetchDOM(request, 'div.page div.listo div.bsx > a');
        return data.map(element => {
            return {
                id: this.getRootRelativeOrAbsoluteLink(element, this.url),
                title: element.title.trim()
            };
        });
    }
}
*/