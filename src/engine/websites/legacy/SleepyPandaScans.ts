// Auto-Generated export from HakuNeko Legacy
// See: https://gist.github.com/ronny1982/0c8d5d4f0bd9c1f1b21dbf9a2ffbfec9

//import { Tags } from '../../Tags';
import icon from './SleepyPandaScans.webp';
import { DecoratableMangaScraper } from '../../providers/MangaPlugin';

export default class extends DecoratableMangaScraper {

    public constructor() {
        super('sleepypandascans', `Sleepy Panda Scans`, 'https://sleepypandascans.co' /*, Tags.Language.English, Tags ... */);
    }

    public override get Icon() {
        return icon;
    }
}

// Original Source
/*
class SleepyPandaScans extends Connector {

    /**
     *
     *
    constructor() {
        super();
        super.id = 'sleepypandascans';
        super.label = 'Sleepy Panda Scans';
        this.tags = [ 'webtoon', 'english' ];
        this.url = 'https://sleepypandascans.co';
    }

    /**
     *
     *
    _getMangaList( callback ) {
        let request = new Request( this.url + '/Series', this.requestOptions );
        this.fetchDOM( request, 'div.container div.row div.card.card-cascade' )
            .then( data => {
                let mangaList = data.map( element => {
                    let title = element.querySelector( 'div.card-body h6.card-title' );
                    let anchor = element.querySelector( 'div.view a' );
                    return {
                        id: this.getRootRelativeOrAbsoluteLink( anchor, request.url ),
                        title: title.innerText.trim()
                    };
                } );
                callback( null, mangaList );
            } )
            .catch( error => {
                console.error( error, this );
                callback( error, undefined );
            } );
    }

    /**
     *
     *
    _getChapterList( manga, callback ) {
        let request = new Request( this.url + manga.id, this.requestOptions );
        this.fetchDOM( request, 'div.container div.row div.list-group a.list-group-item' )
            .then( data => {
                let chapterList = data.map( element => {
                    return {
                        id: this.getRootRelativeOrAbsoluteLink( element, request.url ),
                        title: element.childNodes[0].textContent.replace( manga.title, '' ).trim(),
                        language: ''
                    };
                } );
                callback( null, chapterList );
            } )
            .catch( error => {
                console.error( error, manga );
                callback( error, undefined );
            } );
    }

    /**
     *
     *
    _getPageList( manga, chapter, callback ) {
        let request = new Request( this.url + chapter.id, this.requestOptions );
        this.fetchDOM( request, 'div.container div.row div.view source' )
            .then( data => {
                let pageList = data.map( element => this.getAbsolutePath( element, request.url ) );
                callback( null, pageList );
            } )
            .catch( error => {
                console.error( error, chapter );
                callback( error, undefined );
            } );
    }
}
*/