<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { paths } from "$lib/index";

  export let src:string;
  // export let filename: string;
  export let alt: string;

// /src/assets/styles/
  let loaded = false;
  let imgElement: HTMLImageElement;

  
  
  onMount(async () => {
    
    // const imageModule = await import(`${src}`);
    // if (imgElement) {
    //   imgElement.src = imageModule.default;
    //   console.log(imgElement);
    // }
  });

  function onLoad() {
    loaded = true;
  }
</script>


<style>
  img {
    width: 100%;
    height: 100%;
    margin: 10px;
    opacity: 0.5;
    object-fit: cover;
    filter: grayscale(20%) sepia(100%);
    transition: opacity 1s ease, filter 5s ease;
  }
  img.loaded {
    opacity: 1;
    filter: grayscale(0%) sepia(0%);
  }
</style>
<!-- src={`${paths.gallery}${filename}`} -->

<img
  src={`${src}`}
  alt={alt}
  class:loaded={loaded}
  on:load={onLoad}
  

/>

