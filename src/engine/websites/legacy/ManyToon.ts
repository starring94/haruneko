// Auto-Generated export from HakuNeko Legacy
// See: https://gist.github.com/ronny1982/0c8d5d4f0bd9c1f1b21dbf9a2ffbfec9

//import { Tags } from '../../Tags';
import icon from './ManyToon.webp';
import { DecoratableMangaScraper } from '../../providers/MangaPlugin';

export default class extends DecoratableMangaScraper {

    public constructor() {
        super('manytoon', `ManyToon`, 'https://manytoon.me' /*, Tags.Language.English, Tags ... */);
    }

    public override get Icon() {
        return icon;
    }
}

// Original Source
/*
class ManyToon extends WordPressMadara {

    constructor() {
        super();
        super.id = 'manytoon';
        super.label = 'ManyToon';
        this.tags = [ 'webtoon', 'hentai', 'english' ];
        this.url = 'https://manytoon.me'; // Miror?: https://manytoon.com
    }
}
*/