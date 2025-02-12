// Auto-Generated export from HakuNeko Legacy
// See: https://gist.github.com/ronny1982/0c8d5d4f0bd9c1f1b21dbf9a2ffbfec9

//import { Tags } from '../../Tags';
import icon from './EinherjarScans.webp';
import { DecoratableMangaScraper } from '../../providers/MangaPlugin';

export default class extends DecoratableMangaScraper {

    public constructor() {
        super('einherjarscans', `Einherjar Scans`, 'https://einherjarscans.space' /*, Tags.Language.English, Tags ... */);
    }

    public override get Icon() {
        return icon;
    }
}

// Original Source
/*
class EinherjarScans extends WordPressMadara {

    constructor() {
        super();
        super.id = 'einherjarscans';
        super.label = 'Einherjar Scans';
        this.tags = [ 'manga', 'english' ];
        this.url = 'https://einherjarscans.space';
    }
}
*/