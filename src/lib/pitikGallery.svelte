<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from 'svelte/store';
  import LazyImage from './LazyImage.svelte'; // Import your LazyImage component

  const loadedImages = writable<Image[]>([]);

  const imageModules = import.meta.glob(
    '/public/assets/images/gallery/*.{avif,gif,heif,jpeg,jpg,png,tiff,webp,svg}',
    {
      query: {
        enhanced: true
      }
    }
  );

  onMount(async () => {
    const images = await Promise.all(
      Object.entries(imageModules).map(async ([path, loader]) => {
        const image = await loader(); // Load the image
        return { path, image }; // Return an object with the path and loaded image
      })
    );

    loadedImages.set(images);
  });
</script>

<div class="grid">
  {#each $loadedImages as { path, image }}
    <div class="grid-item">
      <LazyImage
        src={path} 
        alt={image.alt || 'Image'}
      />
    </div>
  {/each}
</div>
