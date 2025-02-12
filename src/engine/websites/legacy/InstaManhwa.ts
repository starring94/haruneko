// Auto-Generated export from HakuNeko Legacy
// See: https://gist.github.com/ronny1982/0c8d5d4f0bd9c1f1b21dbf9a2ffbfec9

//import { Tags } from '../../Tags';
import icon from './InstaManhwa.webp';
import { DecoratableMangaScraper } from '../../providers/MangaPlugin';

export default class extends DecoratableMangaScraper {

    public constructor() {
        super('instamanhwa', `InstaManhwa`, 'https://www.instamanhwa.com' /*, Tags.Language.English, Tags ... */);
    }

    public override get Icon() {
        return icon;
    }
}

// Original Source
/*
class InstaManhwa extends WordPressMadara {

    constructor() {
        super();
        super.id = 'instamanhwa';
        super.label = 'InstaManhwa';
        this.tags = [ 'webtoon', 'hentai', 'english' ];
        this.url = 'https://www.instamanhwa.com';

        this.queryTitleForURI = 'div.profile-manga div.post-title h1';
    }

    async _getMangas() {
        let mangaList = [];
        for (let page = 1, run = true; run; page++) {
            let mangas = await this._getMangasFromPage(page);
            mangas.length > 0 ? mangaList.push(...mangas) : run = false;
        }
        return mangaList;
    }

    async _getMangasFromPage(page) {
        const uri = new URL('/latest?page=' + page, this.url);
        const request = new Request(uri, this.requestOptions);
        const data = await this.fetchDOM(request, this.queryMangas);
        return data.map(element => {
            return {
                id: this.getRootRelativeOrAbsoluteLink(element, this.url),
                title: element.text.trim()
            };
        });
    }

    async _getChapters(manga) {
        const script = `
            new Promise((resolve, reject) => {
                const timer = setInterval(() => {
                    try {
                        const list = document.querySelector('div#manga-chapters-holder ul')
                        if(list) {
                            clearInterval(timer);
                            const chapters = [...list.querySelectorAll('${this.queryChapters}')].map(element => {
                                return {
                                    id: element.pathname,
                                    title: element.text.trim()
                                }
                            });
                            resolve(chapters);
                        }
                    } catch(error) {
                        reject(error);
                    }
                }, 500);
            });
        `;
        const uri = new URL(manga.id, this.url);
        const request = new Request(uri, this.requestOptions);
        return Engine.Request.fetchUI(request, script);
    }
}
*/