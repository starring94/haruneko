<script lang="ts">
    import ChevronLeft24 from "carbon-icons-svelte/lib/ChevronLeft.svelte";
    import ChevronRight24 from "carbon-icons-svelte/lib/ChevronRight.svelte";
    import ZoomIn24 from "carbon-icons-svelte/lib/ZoomIn.svelte";
    import ZoomOut24 from "carbon-icons-svelte/lib/ZoomOut.svelte";
    import RowInsert24 from "carbon-icons-svelte/lib/RowExpand.svelte";
    import RowDelete24 from "carbon-icons-svelte/lib/RowCollapse.svelte";
    import Misuse24 from "carbon-icons-svelte/lib/Misuse.svelte";

    export let title: string;
    export let toggleThumbnailViewer: () => void;
    function increaseImagePadding() {}
    function decreaseImagePadding() {}
    function zoomIn() {}
    function zoomOut() {}
</script>

<div id="Buttons" tabindex="0">
    <span class="title">{title}</span>
    <span on:click={() => console.log(`createEventDispatcher("requestItemDown", item)`)}>
        <ChevronLeft24 size={24} title="Item Down (ArrowLeft)" />
    </span>
    <span on:click={() => console.log(`createEventDispatcher("requestItemUp", item)`)}>
        <ChevronRight24 size={24} title="Item Up (ArrowRight)" />
    </span>
    &nbsp;
    <span on:click={decreaseImagePadding}>
        <RowDelete24 size={24} title="Decrease spacing between images (CTRL ➖)" />
    </span>
    <span on:click={increaseImagePadding}>
        <RowInsert24 size={24} title="Increase spacing between images (CTRL ➕)" />
    </span>
    &nbsp;
    <span on:click={zoomIn}>
        <ZoomIn24 size={24} title="Zoom In (➕)" />
    </span>
    <span on:click={zoomOut}>
        <ZoomOut24 size={24} title="Zoom Out (➖)" />
    </span>
    &nbsp
    <span on:click={toggleThumbnailViewer}>
        <Misuse24 size={24} title="Close (ESC)" />
    </span>
</div>

<style>
    #Buttons {
        display: flex;
        align-content: center;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        right: 0;
        padding-left: 1em;
        padding-right: 2em;
        opacity: 0.05;
        transition: opacity 0.25s;
        background-color: var(--cds-ui-04);
        border-bottom-left-radius: 1em;
        box-shadow: 0em 0em 1em var(--cds-ui-01);
        outline: none; /* disable focus border */
        z-index: 10000;
    }
    #Buttons:hover {
        opacity: 1;
        cursor: pointer;
    }
    #Buttons:hover > .title {
        display: inline;
    }

    .title {
        display: none;
        font-weight: bold;
        font-size: 1.25em;
        color: var(--cds-text-01);
    }
</style>
