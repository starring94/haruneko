// Auto-Generated export from HakuNeko Legacy
// See: https://gist.github.com/ronny1982/0c8d5d4f0bd9c1f1b21dbf9a2ffbfec9

//import { Tags } from '../../Tags';
import icon from './MangaKakalot.webp';
import { DecoratableMangaScraper } from '../../providers/MangaPlugin';

export default class extends DecoratableMangaScraper {

    public constructor() {
        super('mangakakalot', `MangaKakalot`, 'https://mangakakalot.com' /*, Tags.Language.English, Tags ... */);
    }

    public override get Icon() {
        return icon;
    }
}

// Original Source
/*
class MangaKakalot extends MangaNel {

    constructor() {
        super();
        super.id = 'mangakakalot';
        super.label = 'MangaKakalot';
        this.tags = [ 'manga', 'webtoon', 'english' ];
        this.url = 'https://mangakakalot.com';

        this.path = '/manga_list?type=new&category=all&alpha=all&state=all&group=all&page=';
        this.queryMangaTitle = 'div.manga-info-top ul.manga-info-text h1';
        this.queryMangasPageCount = 'div.group_page a.page_last:last-of-type';
        this.queryMangas = 'div.truyen-list h3 a';
        // NOTE: a corresponding entry for chapter/page queries must be defined in the base class (required for cross-domain-support)
    }

    canHandleURI(uri) {
        // Verification: https://regex101.com/r/6hWLdv/2/tests
        return /^mangakakalot\.com$/.test(uri.hostname);
    }
}
*/