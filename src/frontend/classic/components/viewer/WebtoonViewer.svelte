<script lang="ts">
    import type { IMediaContainer, IMediaItem } from "../../../../engine/providers/MediaPlugin";
    import WideViewerImage from "./WideViewerImage.svelte";

    export let item: IMediaContainer;

    // TODO: Implement correct filter/extraction of IMediaItem types ...
    let entries: IMediaItem[];
    $: entries = item.Entries.map(entry => entry as IMediaItem);

    export let imagePadding: number;
    let imageWidth = 75;
</script>

{#each entries as content, index}
    <WideViewerImage
        alt="content_{index}"
        page={content}
        style="padding-left: {imagePadding}em; padding-right: {imagePadding}em; width: {imageWidth}%"
    />
{/each}

<style>
</style>
