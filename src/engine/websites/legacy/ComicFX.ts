// Auto-Generated export from HakuNeko Legacy
// See: https://gist.github.com/ronny1982/0c8d5d4f0bd9c1f1b21dbf9a2ffbfec9

//import { Tags } from '../../Tags';
import icon from './ComicFX.webp';
import { DecoratableMangaScraper } from '../../providers/MangaPlugin';

export default class extends DecoratableMangaScraper {

    public constructor() {
        super('comicfx', `Comic FX`, 'https://comicfx.net' /*, Tags.Language.English, Tags ... */);
    }

    public override get Icon() {
        return icon;
    }
}

// Original Source
/*
class ComicFX extends Connector {

    constructor() {
        super();
        super.id = 'comicfx';
        super.label = 'Comic FX';
        this.tags = [ 'manga', 'webtoon', 'english', 'indonesian' ];
        this.url = 'https://comicfx.net';
        this.requestOptions.headers.set('x-referer', this.url);

        this.queryChapters = 'div.chaplist ul li a:not([class])';
        this.queryPages = 'div#all source.img-responsive';
        this.language = 'id';
    }

    async _getMangaFromURI(uri) {
        const request = new Request(uri, this.requestOptions);
        const data = await this.fetchDOM(request, 'div.bigcontent div.infokomik h2');
        return new Manga(this, uri.pathname, data[0].textContent.trim());
    }

    async _getMangas() {
        const uri = new URL('/changeMangaList?type=text', this.url);
        const request = new Request(uri, this.requestOptions);
        request.headers.set('X-Requested-With', 'XMLHttpRequest');
        const data = await this.fetchDOM(request, 'ul.manga-list li a');
        return data.map(element => {
            return {
                id: this.getRootRelativeOrAbsoluteLink(element, this.url),
                title: element.querySelector('h6').textContent.trim()
            };
        });
    }

    async _getChapters(manga) {
        const uri = new URL(manga.id, this.url);
        const request = new Request(uri, this.requestOptions);
        const data = await this.fetchDOM(request, 'ul#listch li a span.chapternum');
        return data.map(element => {
            return {
                id: this.getRootRelativeOrAbsoluteLink(element.closest('a'), this.url),
                title: element.textContent.trim()
            };
        });
    }

    async _getPages(chapter) {
        const uri = new URL(chapter.id, this.url);
        const request = new Request(uri, this.requestOptions);
        const data = await this.fetchDOM(request, 'div#lcanv source.img-responsive');
        return data.map(image => {
            let url = this.getAbsolutePath(image.dataset.src || image, request.url);
            try {
                if(/img\.comicfx\.net\/img\/\d+\//.test(url)) {
                    const encoded = url.split('/').pop().split('.').shift();
                    url = decodeURIComponent(atob(encoded));
                }
            } catch(error) {/**}
            url = url
                // HACK: bypass 'i0.wp.com' image CDN to ensure original images are loaded directly from host
                .replace(/\/i\d+\.wp\.com/, '')
                // HACK: bypass 'cdn.statically.io' image CDN to ensure original images are loaded directly from host
                .replace(/cdn\.statically\.io\/img\//, '')
                .replace(/\/(w=\d+|h=\d+|q=\d+|f=auto)(,(w=\d+|h=\d+|q=\d+|f=auto))*\//, '/');
            return url.includes('img.comicfx.net') ? this.createConnectorURI(url) : url;
        }).filter(url => {
            const adImageFiles = [ '/4WWje.jpg' ];
            return adImageFiles.every(adImageFile => !url.endsWith(adImageFile));
        });
    }
}
*/