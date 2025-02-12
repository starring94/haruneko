// Auto-Generated export from HakuNeko Legacy
// See: https://gist.github.com/ronny1982/0c8d5d4f0bd9c1f1b21dbf9a2ffbfec9

//import { Tags } from '../../Tags';
import icon from './HikariScan.webp';
import { DecoratableMangaScraper } from '../../providers/MangaPlugin';

export default class extends DecoratableMangaScraper {

    public constructor() {
        super('hikariscan', `Hikari Scan`, 'https://hikariscan.com.br' /*, Tags.Language.English, Tags ... */);
    }

    public override get Icon() {
        return icon;
    }
}

// Original Source
/*
class HikariScan extends WordPressMangastream {

    constructor() {
        super();
        super.id = 'hikariscan';
        super.label = 'Hikari Scan';
        this.tags = [ 'manga', 'portuguese' ];
        this.url = 'https://hikariscan.com.br';
        this.path = '/manga/list-mode/';
    }
}
*/