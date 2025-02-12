// Auto-Generated export from HakuNeko Legacy
// See: https://gist.github.com/ronny1982/0c8d5d4f0bd9c1f1b21dbf9a2ffbfec9

//import { Tags } from '../../Tags';
import icon from './EightMuses.webp';
import { DecoratableMangaScraper } from '../../providers/MangaPlugin';

export default class extends DecoratableMangaScraper {

    public constructor() {
        super('8muses', `8 MUSES`, 'https://comics.8muses.com' /*, Tags.Language.English, Tags ... */);
    }

    public override get Icon() {
        return icon;
    }
}

// Original Source
/*
class EightMuses extends Connector {

    constructor() {
        super();
        super.id = '8muses';
        super.label = '8 MUSES';
        this.tags = [ 'hentai', 'porn', 'english' ];
        this.url = 'https://comics.8muses.com';
    }

    async _getMangaFromURI(uri) {
        let request = new Request(uri, this.requestOptions);
        let data = await this.fetchDOM(request, 'div#top-menu div.top-menu-breadcrumb ol li:nth-of-type(2) a', 3);
        let id = uri.pathname;
        let title = data[0].text.trim();
        return new Manga(this, id, title);
    }

    async _getMangas() {
        let msg = 'This website does not provide a manga list, please copy and paste the URL containing the images directly from your browser into HakuNeko.';
        throw new Error(msg);
    }

    async _getChapters(manga) {
        let request = new Request(new URL(manga.id, this.url), this.requestOptions);
        let data = await this.fetchDOM(request, 'div#top-menu div.top-menu-breadcrumb ol li a');
        return [ {
            id: manga.id,
            title: data.slice(2).map(element => element.text.trim()).join(' → '),
            language: ''
        } ];
    }

    async _getPages(chapter) {
        let request = new Request(new URL(chapter.id, this.url), this.requestOptions);
        let data = await this.fetchDOM(request, 'div.gallery div.image source.lazyload');
        return data.map(element => this.url + element.dataset['src'].replace('/th/', '/fl/'));
    }
}
*/