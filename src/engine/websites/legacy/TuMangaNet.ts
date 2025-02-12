// Auto-Generated export from HakuNeko Legacy
// See: https://gist.github.com/ronny1982/0c8d5d4f0bd9c1f1b21dbf9a2ffbfec9

//import { Tags } from '../../Tags';
import icon from './TuMangaNet.webp';
import { DecoratableMangaScraper } from '../../providers/MangaPlugin';

export default class extends DecoratableMangaScraper {

    public constructor() {
        super('tumanganet', `Tu Manga Online`, 'https://tumanga.net' /*, Tags.Language.English, Tags ... */);
    }

    public override get Icon() {
        return icon;
    }
}

// Original Source
/*
class TuMangaNet extends WordPressMadara {

    constructor() {
        super();
        super.id = 'tumanganet';
        super.label = 'Tu Manga Online';
        this.tags = [ 'manga', 'webtoon', 'spanish' ];
        this.url = 'https://tumanga.net';
    }

    // NOTE: Initialize website without parameters, otherwise the request will time out
    async _initializeConnector() {
        let uri = new URL(this.url);
        let request = new Request(uri, this.requestOptions);
        return Engine.Request.fetchUI(request, '');
    }
}
*/