// Auto-Generated export from HakuNeko Legacy
// See: https://gist.github.com/ronny1982/0c8d5d4f0bd9c1f1b21dbf9a2ffbfec9

//import { Tags } from '../../Tags';
import icon from './NinjaScan.webp';
import { DecoratableMangaScraper } from '../../providers/MangaPlugin';

export default class extends DecoratableMangaScraper {

    public constructor() {
        super('ninjascan', `Ninja Scan`, 'https://ninjascan.xyz' /*, Tags.Language.English, Tags ... */);
    }

    public override get Icon() {
        return icon;
    }
}

// Original Source
/*
class NinjaScan extends WordPressMadara {

    constructor() {
        super();
        super.id = 'ninjascan';
        super.label = 'Ninja Scan';
        this.tags = [ 'webtoon', 'portuguese', 'scanlation' ];
        this.url = 'https://ninjascan.xyz';
    }
}
*/