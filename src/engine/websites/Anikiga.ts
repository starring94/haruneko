import { Tags } from '../Tags';
import icon from './Anikiga.webp';
import { DecoratableMangaScraper } from '../providers/MangaPlugin';
import * as Madara from './decorators/WordPressMadara';
import * as Common from './decorators/Common';

@Madara.MangaCSS(/^https?:\/\/anikiga.com\/manga\/[^/]+\/$/, 'div.post-title h1')
@Madara.MangasMultiPageAJAX()
@Madara.ChaptersSinglePageAJAXv1()
@Madara.PagesSinglePageCSS()
@Common.ImageDirect()
export default class extends DecoratableMangaScraper {

    public constructor() {
        super('anikiga', `Anikiga`, 'https://anikiga.com', Tags.Media.Manga, Tags.Language.Turkish);
    }

    public override get Icon() {
        return icon;
    }
}