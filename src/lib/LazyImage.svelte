<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { paths } from "$lib/index";

  export let filename: string;
  export let alt: string;
  // export let rotationAngle;
  // export let flipImage;

// /src/assets/styles/
  let loaded = false;
  let imgElement: HTMLImageElement;

  
  
  // onMount(async () => {
    
  //   // const imageModule = await import(`${src}`);
  //   // if (imgElement) {
  //   //   imgElement.src = imageModule.default;
  //   //   console.log(imgElement);
  //   // }
  // });

  function onLoad() {
    loaded = true;
  }
</script>


<style>
  img {
  background-color: hsla(0, 0%, 0%, 0.400);
    width: 100%;
    height: 100%;
    opacity: 0.5;
    object-fit:cover;
    filter: grayscale(20%) sepia(100%);
    transition: opacity 1s ease, filter 5s ease;
  }
  img.loaded {
    opacity: 1;
    filter: grayscale(0%) sepia(0%);
  }
</style>

<img
  src={`${paths.gallery}${filename}`}
  alt={alt}
  class:loaded={loaded}
  on:load={onLoad}
  />
  <!-- style="transform: rotate({rotationAngle}deg) scaleX({flipImage ? '-1' : '1'})" -->

