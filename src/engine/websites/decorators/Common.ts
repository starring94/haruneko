import { Fetch, FetchCSS, FetchRequest } from '../../FetchProvider';
import { type MangaScraper, type DecoratableMangaScraper, type MangaPlugin, Manga, Chapter, Page } from '../../providers/MangaPlugin';
import type { Priority } from '../../taskpool/TaskPool';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */ //=> A mixin class must have a constructor with a single rest parameter of type 'any[]'
export type Constructor = new (...args: any[]) => DecoratableMangaScraper;

type InfoExtractor<E extends HTMLElement> = (element: E) => { id: string, title: string };

/**
 * The pre-defined default info extractor that will parse the media id and media title from a given {@link HTMLAnchorElement}.
 * The media title will be extracted from the `text` porperty of the element.
 */
const DefaultInfoExtractor = AnchorInfoExtractor();

/**
 * Creates an info extractor that will parse the media id and media title from an {@link HTMLAnchorElement}.
 * @param useTitleAttribute If set to `true`, the media title will be extracted from the `title` attribute of the element, otherwise the `text` porperty of the element will be used as media title.
 */
export function AnchorInfoExtractor(useTitleAttribute = false): InfoExtractor<HTMLElement> {
    return function(element: HTMLAnchorElement) {
        return {
            id: element.pathname,
            title: useTitleAttribute ? element.title.trim() : element.text.trim()
        };
    };
}

type ImageExtractor<E extends HTMLElement> = (element: E) => string;

function DefaultImageExtractor<E extends HTMLImageElement>(element: E): string {
    return element.dataset.src || element.getAttribute('src') || ''; // TODO: Throw if none found?
}

/***************************************************
 ******** Manga from URL Extraction Methods ********
 ***************************************************/

/**
 * An extension method for extracting a single manga from the given {@link url} using the given CSS {@link query}.
 * The `pathname` of the given {@link url} will be used as identifier for the extracted manga.
 * When the CSS {@link query} matches a `meta` element, the manga title will be extracted from its `content` attribute, otherwise the `textContent` of the element will be used as manga title.
 * @param this A reference to the {@link MangaScraper} instance which will be used as context for this method
 * @param provider A reference to the {@link MangaPlugin} which shall be assigned as parent for the extracted manga
 * @param url The url from which the manga shall be extracted
 * @param query A CSS query to locate the element from which the manga title shall be extracted
 */
export async function FetchMangaCSS(this: MangaScraper, provider: MangaPlugin, url: string, query: string): Promise<Manga> {
    const uri = new URL(url);
    const request = new FetchRequest(uri.href);
    const data = (await FetchCSS<HTMLElement>(request, query)).shift();
    const title = data instanceof HTMLMetaElement ? data.content : data.textContent.trim();
    return new Manga(this, provider, uri.pathname, title);
}

/**
 * A class decorator that adds the ability to extract a manga using the given CSS {@link query} from any url that matches the given {@link pattern}.
 * The `pathname` of the url will be used as identifier for the extracted manga.
 * When the CSS {@link query} matches a `meta` element, the manga title will be extracted from its `content` attribute, otherwise the `textContent` of the element will be used as manga title.
 * @param pattern An expression to check if a manga can be extracted from an url or not
 * @param query A CSS query to locate the element from which the manga title shall be extracted
 */
export function MangaCSS(pattern: RegExp, query: string) {
    return function DecorateClass<T extends Constructor>(ctor: T): T {
        return class extends ctor {
            public ValidateMangaURL(this: MangaScraper, url: string): boolean {
                return pattern.test(url);
            }
            public async FetchManga(this: MangaScraper, provider: MangaPlugin, url: string): Promise<Manga> {
                return FetchMangaCSS.call(this, provider, url, query);
            }
        };
    };
}

/***********************************************
 ******** Manga List Extraction Methods ********
 ***********************************************/

/**
 * An extension method for extracting multiple mangas from the given relative {@link path} using the given CSS {@link query}.
 * @param this A reference to the {@link MangaScraper} instance which will be used as context for this method
 * @param provider A reference to the {@link MangaPlugin} which shall be assigned as parent for the extracted mangas
 * @param path The path relative to {@link this} scraper's base url from which the mangas shall be extracted
 * @param query A CSS query to locate the elements from which the manga identifier and title shall be extracted
 * @param extract A function to extract the manga identifier and title from a single element (found with {@link query})
 */
export async function FetchMangasSinglePageCSS<E extends HTMLElement>(this: MangaScraper, provider: MangaPlugin, path: string, query: string, extract = DefaultInfoExtractor as InfoExtractor<E>): Promise<Manga[]> {
    const uri = new URL(path, this.URI);
    const request = new FetchRequest(uri.href);
    const data = await FetchCSS<E>(request, query);
    return data.map(element => {
        const { id, title } = extract(element);
        return new Manga(this, provider, id, title);
    });
}

/**
 * A class decorator that adds the ability to extract multiple mangas from the given relative {@link path} using the given CSS {@link query}.
 * @param path The path relative to the scraper's base url from which the mangas shall be extracted
 * @param query A CSS query to locate the elements from which the manga identifier and title shall be extracted
 * @param extract A function to extract the manga identifier and title from a single element (found with {@link query})
 */
export function MangasSinglePageCSS<E extends HTMLElement>(path: string, query: string, extract = DefaultInfoExtractor as InfoExtractor<E>) {
    return function DecorateClass<T extends Constructor>(ctor: T): T {
        return class extends ctor {
            public async FetchMangas(this: MangaScraper, provider: MangaPlugin): Promise<Manga[]> {
                return FetchMangasSinglePageCSS.call(this, provider, path, query, extract as InfoExtractor<HTMLElement>);
            }
        };
    };
}

/**
 * An extension method for extracting multiple mangas from a range of given relative {@link path} patterns using the given CSS {@link query}.
 * The range of all {@link path} patterns begins with {@link start} and is incremented until no more new mangas can be extracted.
 * @param this A reference to the {@link MangaScraper} instance which will be used as context for this method
 * @param provider A reference to the {@link MangaPlugin} which shall be assigned as parent for the extracted mangas
 * @param path The path pattern relative to {@link this} scraper's base url from which the mangas shall be extracted containing the placeholder `{page}` which is replaced by an incrementing number
 * @param query A CSS query to locate the elements from which the manga identifier and title shall be extracted
 * @param start The start for the sequence of incremental numbers which are applied to the {@link path} pattern
 * @param throttle A delay [ms] for each request (only required for rate-limited websites)
 * @param extract A function to extract the manga identifier and title from a single element (found with {@link query})
 */
export async function FetchMangasMultiPageCSS<E extends HTMLElement>(this: MangaScraper, provider: MangaPlugin, path: string, query: string, start = 1, throttle = 0, extract = DefaultInfoExtractor as InfoExtractor<E>): Promise<Manga[]> {
    const mangaList = [];
    let reducer = Promise.resolve();
    for(let page = start, run = true; run; page++) {
        await reducer;
        reducer = throttle > 0 ? new Promise(resolve => setTimeout(resolve, throttle)) : Promise.resolve();
        const mangas = await FetchMangasSinglePageCSS.call(this, provider, path.replace('{page}', `${page}`), query, extract as InfoExtractor<HTMLElement>);
        mangas.length > 0 ? mangaList.push(...mangas) : run = false;
        // TODO: Broadcast event that mangalist for provider has been updated?
    }
    return mangaList;
}

/**
 * A class decorator that adds the ability to extract multiple mangas from a range of given relative {@link path} patterns using the given CSS {@link query}.
 * The range of all {@link path} patterns begins with {@link start} and is incremented until no more new mangas can be extracted.
 * @param path The path pattern relative to the scraper's base url from which the mangas shall be extracted containing the placeholder `{page}` which is replaced by an incrementing number
 * @param query A CSS query to locate the elements from which the manga identifier and title shall be extracted
 * @param start The start for the sequence of incremental numbers which are applied to the {@link path} pattern
 * @param throttle A delay [ms] for each request (only required for rate-limited websites)
 * @param extract A function to extract the manga identifier and title from a single element (found with {@link query})
 */
export function MangasMultiPageCSS<E extends HTMLElement>(path: string, query: string, start = 1, throttle = 0, extract = DefaultInfoExtractor as InfoExtractor<E>) {
    return function DecorateClass<T extends Constructor>(ctor: T): T {
        return class extends ctor {
            public async FetchMangas(this: MangaScraper, provider: MangaPlugin): Promise<Manga[]> {
                return FetchMangasMultiPageCSS.call(this, provider, path, query, start, throttle, extract as InfoExtractor<HTMLElement>);
            }
        };
    };
}

/*************************************************
 ******** Chapter List Extraction Methods ********
 *************************************************/

/**
 * An extension method for extracting all chapters for the given {@link manga} using the given CSS {@link query}.
 * The chapters are extracted from the composed url based on the `Identifier` of the {@link manga} and the `URI` of the website.
 * @param this A reference to the {@link MangaScraper} instance which will be used as context for this method
 * @param manga A reference to the {@link Manga} which shall be assigned as parent for the extracted chapters
 * @param query A CSS query to locate the elements from which the chapter identifier and title shall be extracted
 * @param extract A function to extract the chapter identifier and title from a single element (found with {@link query})
 */
export async function FetchChaptersSinglePageCSS<E extends HTMLElement>(this: MangaScraper, manga: Manga, query: string, extract = DefaultInfoExtractor as InfoExtractor<E>): Promise<Chapter[]> {
    const uri = new URL(manga.Identifier, this.URI);
    const request = new FetchRequest(uri.href);
    const data = await FetchCSS<E>(request, query);
    return data.map(element => {
        const { id, title } = extract(element);
        return new Chapter(this, manga, id, title.replace(manga.Title, '').trim() || manga.Title);
    });
}

/**
 * A class decorator that adds the ability to extract all chapters for a given manga from this website using the given CSS {@link query}.
 * The chapters are extracted from the composed url based on the `Identifier` of the manga and the `URI` of the website.
 * @param query A CSS query to locate the elements from which the chapter identifier and title shall be extracted
 * @param extract A function to extract the chapter identifier and title from a single element (found with {@link query})
 */
export function ChaptersSinglePageCSS<E extends HTMLElement>(query: string, extract = DefaultInfoExtractor as InfoExtractor<E>) {
    return function DecorateClass<T extends Constructor>(ctor: T): T {
        return class extends ctor {
            public async FetchChapters(this: MangaScraper, manga: Manga): Promise<Chapter[]> {
                return FetchChaptersSinglePageCSS.call(this, manga, query, extract as InfoExtractor<HTMLElement>);
            }
        };
    };
}

/**********************************************
 ******** Page List Extraction Methods ********
 **********************************************/

/**
 * An extension method for extracting all pages for the given {@link chapter} using the given CSS {@link query}.
 * The pages are extracted from the composed url based on the `Identifier` of the {@link chapter} and the `URI` of the website.
 * @param this A reference to the {@link MangaScraper} instance which will be used as context for this method
 * @param chapter A reference to the {@link Chapter} which shall be assigned as parent for the extracted pages
 * @param query A CSS query to locate the elements from which the page information shall be extracted
 * @param extract A function to extract the page information from a single element (found with {@link query})
 */
export async function FetchPagesSinglePageCSS<E extends HTMLElement>(this: MangaScraper, chapter: Chapter, query: string, extract = DefaultImageExtractor as ImageExtractor<E>): Promise<Page[]> {
    const uri = new URL(chapter.Identifier, this.URI);
    const request = new FetchRequest(uri.href);
    const data = await FetchCSS<E>(request, query);
    return data.map(element => {
        const link = new URL(extract(element), request.url);
        return new Page(this, chapter, link, { Referer: uri.href });
    });
}

/**
 * A class decorator that adds the ability to extract all pages for a given chapter using the given CSS {@link query}.
 * The pages are extracted from the composed url based on the `Identifier` of the chapter and the `URI` of the website.
 * @param query A CSS query to locate the elements from which the page information shall be extracted
 * @param extract A function to extract the page information from a single element (found with {@link query})
 */
export function PagesSinglePageCSS<E extends HTMLElement>(query: string, extract = DefaultImageExtractor as ImageExtractor<E>) {
    return function DecorateClass<T extends Constructor>(ctor: T): T {
        return class extends ctor {
            public async FetchPages(this: MangaScraper, chapter: Chapter): Promise<Page[]> {
                return FetchPagesSinglePageCSS.call(this, chapter, query, extract as ImageExtractor<HTMLElement>);
            }
        };
    };
}

/***********************************************
 ******** Image Data Extraction Methods ********
 ***********************************************/

/**
 * An extension method to get the image data for the given {@link page}.
 * @param this A reference to the {@link MangaScraper} instance which will be used as context for this method
 * @param page A reference to the {@link Page} containing the necessary information to acquire the image data
 * @param priority The importance level for ordering the request for the image data within the internal task pool
 * @param signal An abort signal that can be used to cancel the request for the image data
 * @param detectMimeType Force a fingerprint check of the image data to detect its mime-type (instead of relying on the Content-Type header)
 */
export async function FetchImageDirect(this: MangaScraper, page: Page, priority: Priority, signal: AbortSignal, detectMimeType = false): Promise<Blob> {
    return this.imageTaskPool.Add(async () => {
        const request = new FetchRequest(page.Link.href, {
            signal: signal,
            headers: {
                Referer: page.Parameters?.Referer || page.Link.origin
            }
        });
        const response = await Fetch(request);
        return detectMimeType ? GetTypedData(await response.arrayBuffer()) : response.blob();
    }, priority, signal);
}

/**
 * A class decorator that adds the ability to get the image data for a given page.
 * @param detectMimeType Force a fingerprint check of the image data to detect its mime-type (instead of relying on the Content-Type header)
 */
export function ImageDirect(detectMimeType = false) {
    return function DecorateClass<T extends Constructor>(ctor: T): T {
        return class extends ctor {
            public async FetchImage(this: MangaScraper, page: Page, priority: Priority, signal: AbortSignal): Promise<Blob> {
                return FetchImageDirect.call(this, page, priority, signal, detectMimeType);
            }
        };
    };
}

/**
 * A helper function to detect and get the mime typed image data of a buffer.
 */
export async function GetTypedData(buffer: ArrayBuffer): Promise<Blob> {
    const bytes = new Uint8Array(buffer);
    // WEBP [52 49 46 46 . . . . 57 45 42 50]
    if(bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50 ) {
        return new Blob([bytes], { type: 'image/webp' });
    }
    // JPEG [FF D8 FF]
    if(bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF ) {
        return new Blob([bytes], { type: 'image/jpeg' });
    }
    // PNG [. 50 4E 47]
    if(bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47 ) {
        return new Blob([bytes], { type: 'image/png' });
    }
    // GIF [47 49 46]
    if(bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 ) {
        return new Blob([bytes], { type: 'image/gif' });
    }
    // BMP [42 4D]
    if(bytes[0] === 0x42 && bytes[1] === 0x4D ) {
        return new Blob([bytes], { type: 'image/bmp' });
    }
    return new Blob([bytes], { type: 'application/octet-stream' });
}