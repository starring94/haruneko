<script>
    import Search16 from 'carbon-icons-svelte/lib/Search.svelte';
    import Plug16 from 'carbon-icons-svelte/lib/Plug.svelte';
    import Language16 from 'carbon-icons-svelte/lib/Language.svelte';
    import Renew16 from 'carbon-icons-svelte/lib/Renew.svelte';
    import { fade } from 'svelte/transition';
</script>

<div id="howto" in:fade>
    <h2>QuickStart</h2>
    <h4>Find a site to get the content you want to view</h4>
    <div class="border">
        <p>
            <strong>HakuNeko</strong> is not hosting anything. Find a website on
            the internet that provides the content you want. Then :
        </p>
        <ol>
            <li>
                <Plug16 class="home-icons" /> Select your connector (the website).
                Use the filters
            </li>
            <li>
                <Renew16 class="home-icons" /> Click on the refresh button (can take
                minutes)
            </li>
            <li><Search16 class="home-icons" /> Find a manga</li>
            <li>
                <Language16 class="home-icons" /> Filter chapters by language (optional)
            </li>
            <li><Search16 class="home-icons" /> Select a chapter</li>
        </ol>
        <p>
            The connector you are looking for is not in the list ?<br />
            👉 Create a website request on the github (issue)<br />
            Use the copy/paste feature if you already have the manga link<br />
            👉 See the documentation for details
        </p>
    </div>
    <h4>Ready to go 🚀</h4>
    <div class="border">
        <p>Download, view, bookmark your favorite mangas 📚</p>
    </div>
</div>

<style>
    #howto {
        padding: 0.5em;
    }
    .border {
        border: 2px solid var(--cds-ui-04);
        border-radius: 1em;
        background-color: var(--cds-ui-01);
        padding: 1em;
    }

    ol {
        display: block;
        list-style-type: decimal;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 40px;
    }

    li {
        margin-top: 5px;
    }

    :global(svg.home-icons) {
        margin-left: 5px;
        margin-right: 5px;
    }
</style>
