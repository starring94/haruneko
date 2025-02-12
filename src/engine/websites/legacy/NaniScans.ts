// Auto-Generated export from HakuNeko Legacy
// See: https://gist.github.com/ronny1982/0c8d5d4f0bd9c1f1b21dbf9a2ffbfec9

//import { Tags } from '../../Tags';
import icon from './NaniScans.webp';
import { DecoratableMangaScraper } from '../../providers/MangaPlugin';

export default class extends DecoratableMangaScraper {

    public constructor() {
        super('naniscans', `naniscans`, 'https://naniscans.com' /*, Tags.Language.English, Tags ... */);
    }

    public override get Icon() {
        return icon;
    }
}

// Original Source
/*
class NaniScans extends Connector {

    constructor() {
        super();
        super.id = 'naniscans';
        super.label = 'naniscans';
        this.tags = [ 'manga', 'japanese' ];
        this.url = 'https://naniscans.com';
    }

    async _getMangaFromURI(uri) {
        const request = new Request(uri, this.requestOptions);
        const data = await this.fetchDOM(request, 'meta[property="og:title"]');
        const id = uri.pathname;
        const title = data[0].content.trim();
        return new Manga(this, id, title);
    }

    async _getMangas() {
        const uri = new URL('/titles', this.url);
        const request = new Request(uri, this.requestOptions);
        const data = await this.fetchDOM(request, 'div.card div.content h4 a');
        return data.map(element => {
            return {
                id: this.getRootRelativeOrAbsoluteLink(element, this.url),
                title: element.text.trim()
            };
        });
    }

    async _getChapters(manga) {
        let chapList = [];
        for(let page = 1, run = true; run; page++) {
            let chapters = await this._getChaptersFromPage(manga, page);
            chapters.length ? chapList.push(...chapters) : run = false;
        }
        return chapList;
    }

    async _getChaptersFromPage(manga, page) {
        const uri = new URL(manga.id + `/${page}/`, this.url);
        const request = new Request(uri, this.requestOptions);
        const data = await this.fetchDOM(request, 'div.item div.content p a:last-of-type');
        return data.map(element => {
            return {
                id: this.getRootRelativeOrAbsoluteLink(element, this.url),
                title: element.text.trim(),
                language: ''
            };
        });
    }

    async _getPages(chapter) {
        const uri = new URL(chapter.id.replace('/read', '/json'), this.url);
        const request = new Request(uri, this.requestOptions);
        const data = await this.fetchJSON(request);
        return data.pages.map(page => this.getAbsolutePath(page.address, request.url));
    }
}
*/