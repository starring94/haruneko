<script lang="ts">
    import { InlineLoading, ImageLoader, Loading } from "carbon-components-svelte";
    import { fly } from 'svelte/transition';
    import type { IMediaItem } from '../../../../engine/providers/MediaPlugin';
    import { Priority } from '../../../../engine/taskpool/DeferredTask';
    import { createEventDispatcher, onDestroy } from "svelte";

    const dispatch = createEventDispatcher();

    export let page: IMediaItem;
    export let title: string;

    let dataload : Promise<string>;
    dataload = page.Fetch(Priority.High, new AbortController().signal)
        .then((data) => {return URL.createObjectURL(data)});

    onDestroy(() => {
        dataload.then((src) => {URL.revokeObjectURL(src)})
    });

</script>

<div class="thumbnail" on:click={() => { dispatch("view", page); }}>
    {#await dataload}
        <div class="center"><Loading withOverlay={false} /></div>
    {:then data}
        <ImageLoader class="imgload" alt={title} src={data} fadeIn>
            <svelte:fragment slot="loading"><InlineLoading /></svelte:fragment>
            <svelte:fragment slot="error"><InlineLoading status="error"/></svelte:fragment>
        </ImageLoader>
    {:catch}
        <InlineLoading status="error"/>
    {/await}
</div> 

<style>
    .thumbnail {
        display: inline-block;
        border: 2px solid var(--cds-ui-04);
        background-color: var(--cds-ui-01);
        border-radius: 1em;
        margin: 0.5em;
        width: 16em;
        height: 16em;
        cursor: pointer;
        box-shadow: 1em 1em 2em var(--cds-ui-01);
    }

    .thumbnail :global(.imgload) {
        width:100%;
        height:100%;
        object-fit: contain;
    }
</style>
