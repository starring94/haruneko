// Auto-Generated export from HakuNeko Legacy
// See: https://gist.github.com/ronny1982/0c8d5d4f0bd9c1f1b21dbf9a2ffbfec9

//import { Tags } from '../../Tags';
import icon from './MangaKisa.webp';
import { DecoratableMangaScraper } from '../../providers/MangaPlugin';

export default class extends DecoratableMangaScraper {

    public constructor() {
        super('mangakisa', `MangaKisa`, 'https://mangakisa.com' /*, Tags.Language.English, Tags ... */);
    }

    public override get Icon() {
        return icon;
    }
}

// Original Source
/*
class MangaKisa extends Connector {
    constructor() {
        super();
        super.id = 'mangakisa';
        super.label = 'MangaKisa';
        this.tags = [ 'manga', 'webtoon', 'english' ];
        this.url = 'https://mangakisa.com';

        this.path = '/all-manga';
        this.queryMangas = 'div.notmain div.lisbox a.an:not([href="/switch"]):not([href="/zion"])';
        this.queryMangasURL = 'div.infoboxc div.infodesbox h1';
        this.queryChapter = 'div.infoepboxmain div.infoepbox a.infovan';
        this.queryPages = 'div.vertical_div div.div_beforeImage source';
    }

    async _getMangaFromURI(uri) {
        let request = new Request(uri, this.requestOptions);
        let data = await this.fetchDOM(request, this.queryMangasURL);
        let id = uri.pathname + uri.search;
        let title = data[0].textContent.trim();
        return new Manga(this, id, title);
    }

    async _getMangas() {
        let request = new Request(new URL(this.path, this.url), this.requestOptions);
        let data = await this.fetchDOM(request, this.queryMangas);
        return data.map(element => {
            return {
                id: this.getRootRelativeOrAbsoluteLink(element, this.url),
                title: element.text.trim()
            };
        });
    }

    async _getChapters(manga) {
        let request = new Request(new URL(manga.id, this.url), this.requestOptions);
        let data = await this.fetchDOM(request, this.queryChapter);
        return data.map(element => {
            return {
                id: this.getRootRelativeOrAbsoluteLink(element, this.url),
                title: element.computedName.trim()
            };
        });
    }

    async _getPages(chapter) {
        let request = new Request(new URL(chapter.id, this.url), this.requestOptions);
        let data = await this.fetchDOM(request, this.queryPages);
        return data.map(element => this.getAbsolutePath(element, request.url));
    }
}
*/