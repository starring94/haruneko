<script lang="ts">
    import 'carbon-components-svelte/css/all.css';
    import './theme/hakuneko.css';
    import './theme/sidenav-hack.css';
    import { Content, Tabs, Tab, TabContent } from 'carbon-components-svelte';
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';
    import Theme from './components/Theme.svelte';
    import MediaSelect from './components/MediaSelect.svelte';
    import MediaItemSelect from './components/MediaItemSelect.svelte';
    import Jobs from './components/Jobs.svelte';
    import Console from './components/Console.svelte';
    import Network from './components/Network.svelte';
    import Viewer from './components/viewer/Viewer.svelte';
    import Tracker from './components/Tracker.svelte';
    import AppBar from './components/AppBar.svelte';
    import UserMessage from './components/UserMessages.svelte';
    import ContentPage from './components/content-pages/ContentRouter.svelte';
    import type { IMediaContainer } from '../../engine/providers/MediaPlugin';
    import { ContentPanelValue, ThemeValue } from './SettingsStore';

    let resolveFinishLoading: (value: void | PromiseLike<void>) => void;
    export const FinishLoading = new Promise<void>(
        (resolve) => (resolveFinishLoading = resolve)
    );

    // UI
    let isSideNavOpen = false;
    let isOpen = false;

    let app: HTMLElement;

    onMount(async () => {
        app = document.getElementById('hakunekoapp')!;
        app.classList.add(uimode);
        // some delay for pre-rendering
        setTimeout(resolveFinishLoading, 2500);
    });

    let selectedMedia: IMediaContainer | undefined;
    let selectedItem: IMediaContainer | undefined;
    let selectedBottomTab = 0;
    let currentContent = 'home';
    let showHome = true;

    $: uimode = $ContentPanelValue ? 'ui-mode-content' : 'ui-mode-download';

    $: if (app) {
        const oldUimode =
            uimode === 'ui-mode-content'
                ? 'ui-mode-download'
                : 'ui-mode-content';
        app.classList.remove(oldUimode);
        app.classList.add(uimode);
    }

    $: currentContent = selectedItem ? 'viewer' : 'home';
    
</script>

<UserMessage />

<Theme theme={$ThemeValue}>
    <AppBar {isSideNavOpen} {isOpen} />
    <Content id="hakunekoapp">
        <MediaSelect on:select={(evt) => (selectedMedia = evt.detail )} />
        <MediaItemSelect
            media={selectedMedia}
            on:view={(evt) => (selectedItem = evt.detail)}
        />
        {#if uimode === 'ui-mode-content'}
            <div id="Content" transition:fade>
                {#if currentContent === 'viewer'}
                    <Viewer item={selectedItem} />
                {:else if currentContent && showHome}
                    <ContentPage />
                {/if}
            </div>
        {/if}
        <div id="Bottom" transition:fade>
            <Tabs type="container" bind:selected={selectedBottomTab}>
                <Tab
                    label="X"
                    style="width:3em;"
                    disabled={selectedBottomTab === 0}
                />
                <Tab label="Jobs" />
                <Tab label="Console" />
                <Tab label="Network" />
                <div
                    id="BottomTabs"
                    slot="content"
                    class:open={selectedBottomTab !== 0}
                >
                    <TabContent tabindex={0} style="padding:0;"
                        ><div class="tabcontent" /></TabContent
                    >
                    <TabContent tabindex={1} style="padding:0;"
                        ><div class="tabcontent"><Jobs /></div></TabContent
                    >
                    <TabContent tabindex={2} style="padding:0;"
                        ><div class="tabcontent"><Console /></div></TabContent
                    >
                    <TabContent tabindex={3} style="padding:0;"
                        ><div class="tabcontent"><Network /></div></TabContent
                    >
                </div>
            </Tabs>
        </div>
    </Content>
</Theme>

<style>
    @font-face {
        font-family: 'BabelStoneFlags';
        src: url('/BabelStoneFlags.woff2') format('woff');
        font-style: normal;
    }
    :global(::-webkit-scrollbar) {
        width: 1em; /* Necessary so scrollbar changes from default*/
    }
    :global(::-webkit-scrollbar-track) {
        background: var(--cds-ui-background); /* Background of scrollbar */
    }
    :global(::-webkit-scrollbar-thumb) {
        background: var(--cds-active-ui); /* Scroll marker */
        border-radius: 2em; /* So marker has rounded edges */
    }
    :global(#app) {
        background: var(--cds-ui-background);
    }
    :global(#hakunekoapp) {
        height: calc(100vh - 3.5em);
        max-height: calc(100vh - 3.5em);
        display: grid;
        padding: 0.5em;
        gap: 0.3em 0.3em;
        grid-template-rows: 1fr fit-content(0.5em);
    }
    :global(.ui-mode-content) {
        grid-template-columns: 19em 19em 1fr;
        grid-template-areas:
            'Media Item Content'
            'Bottom Bottom Content';
    }
    :global(.ui-mode-download) {
        grid-template-columns: minmax(20em, 1fr) minmax(20em, 1fr);
        grid-template-areas:
            'Media Item'
            'Bottom Bottom';
    }

    #Content {
        grid-area: Content;
    }
    #Bottom {
        grid-area: Bottom;
        border-top: 1px groove var(--cds-button-separator);
    }
    #BottomTabs {
        max-height: 0;
        transition: max-height 0.5s;
    }
    #BottomTabs.open {
        max-height: 10em;
    }

    .tabcontent {
        height: 10em;
        padding: 0.2em;
        background-color: var(--cds-field-01);
    }

    :global(#BottomTabs .bx--tab--content) {
        padding: 0;
    }
    :global(#Header) {
        -webkit-app-region: drag;
    }

    :global(.bx--header__global) {
        -webkit-app-region: drag;
    }

    :global(.bx--header__global > *) {
        -webkit-app-region: no-drag;
    }
    :global(.bx--modal-container) {
        -webkit-app-region: no-drag;
    }
</style>
