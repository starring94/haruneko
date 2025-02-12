// Auto-Generated export from HakuNeko Legacy
// See: https://gist.github.com/ronny1982/0c8d5d4f0bd9c1f1b21dbf9a2ffbfec9

//import { Tags } from '../../Tags';
import icon from './ComicRyu.webp';
import { DecoratableMangaScraper } from '../../providers/MangaPlugin';

export default class extends DecoratableMangaScraper {

    public constructor() {
        super('comicryu', `COMICリュウ`, 'https://www.comic-ryu.jp' /*, Tags.Language.English, Tags ... */);
    }

    public override get Icon() {
        return icon;
    }
}

// Original Source
/*
class ComicRyu extends Connector {

    constructor() {
        super();
        super.id = 'comicryu';
        super.label = 'COMICリュウ';
        this.tags = [ 'manga', 'japanese' ];
        this.url = 'https://www.comic-ryu.jp';
    }

    async _getMangaFromURI(uri) {
        let request = new Request(uri, this.requestOptions);
        let data = await this.fetchDOM(request, 'div#detail div.titlepage h2 source');
        let id = uri.pathname + uri.search;
        let title = data[0].getAttribute('alt').trim();
        return new Manga(this, id, title);
    }

    async _getMangas() {
        let request = new Request(new URL('/lineup/', this.url), this.requestOptions);
        let data = await this.fetchDOM(request, 'div#main div.lineuparea div.linkbox');
        return data.map(element => {
            return {
                id: this.getRootRelativeOrAbsoluteLink(element.querySelector('a'), request.url),
                title: element.querySelector('p.title').textContent.trim()
            };
        });
    }

    async _getChapters(manga) {
        let request = new Request(new URL(manga.id, this.url), this.requestOptions);
        let data = await this.fetchDOM(request, 'div#read ul.readlist li p.readbtn a');
        return data.map(element => {
            return {
                id: this.getRootRelativeOrAbsoluteLink(element, request.url),
                title: element.text.trim(),
                language: ''
            };
        });
    }

    async _getPages(chapter) {
        let script = `
            new Promise(resolve => {
                resolve(photoArray.map(photo => new URL(photoDir + photo[0], window.location).href));
            });
        `;
        let request = new Request(new URL(chapter.id, this.url), this.requestOptions);
        return Engine.Request.fetchUI(request, script);
    }
}
*/