<script lang="ts">
  import { onMount } from 'svelte';

  export let src: string;
  export let alt: string;

  let loaded = false;
  let imgElement: HTMLImageElement;

  onMount(() => {
    if (imgElement) {
      imgElement.src = src;
    }
  });

  function onLoad() {
    loaded = true;
  }
</script>

<img
  bind:this={imgElement}
  {alt}
  class:loaded
  on:load={onLoad}
/>

<style>
  img {
    width: 100%;
    height: 100%;
    margin: 10px;
    opacity: .5;
    
    object-fit: cover;
    
  }
  img.loaded {
    opacity: 1;
    transition: opacity 3s;
  }
</style>
