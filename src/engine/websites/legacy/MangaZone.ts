// Auto-Generated export from HakuNeko Legacy
// See: https://gist.github.com/ronny1982/0c8d5d4f0bd9c1f1b21dbf9a2ffbfec9

//import { Tags } from '../../Tags';
import icon from './MangaZone.webp';
import { DecoratableMangaScraper } from '../../providers/MangaPlugin';

export default class extends DecoratableMangaScraper {

    public constructor() {
        super('mangazone', `MangaZone`, 'https://mangazone.cc' /*, Tags.Language.English, Tags ... */);
    }

    public override get Icon() {
        return icon;
    }
}

// Original Source
/*
class MangaZone extends WordPressMadara {

    constructor() {
        super();
        super.id = 'mangazone';
        super.label = 'MangaZone';
        this.tags = [ 'manga', 'webtoon', 'english' ];
        this.url = 'https://mangazone.cc';

        this.queryMangas = 'div.c-tabs-item div.tab-summary div.post-title h3 a';
    }

    async _getMangas() {
        let mangaList = [];
        for(let page = 1; page; page++) {
            let mangas = await this._getMangasFromPage(page);
            if(mangas.length === 0) {
                break;
            }
            if(mangaList.length > 0 && mangaList.slice(-1)[0].id === mangas.slice(-1)[0].id) {
                break;
            }
            mangaList.push(...mangas);
        }
        return mangaList;
    }

    async _getMangasFromPage(page) {
        let uri = new URL(`/alphabet/${page}/`, this.url);
        let request = new Request(uri, this.requestOptions);
        let data = await this.fetchDOM(request, this.queryMangas);
        return data.map(element => {
            return {
                id: this.getRootRelativeOrAbsoluteLink(element, request.url),
                title: element.text.trim()
            };
        });
    }
}
*/