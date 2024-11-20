<script lang="ts">
  import { onMount } from "svelte";
  import ExifReader from "exifreader";
  import { paths } from "$lib/index";
  import { initialData } from "$lib/imagegallerydata";
  import { writable } from 'svelte/store';
  // import LazyImage from './LazyImage.svelte';
  import '../styles/_typography.scss';
  import catGif from '../assets/images/design/cat.gif';
  import { disableScrollHandling } from "$app/navigation";

  // Create a writable store to hold the loaded images
  let galleryStore = writable<Image[]>(initialData);
  let images: Image[] = [];
  let loadedImages: Image[] = [];
  let currentLoadingIndex = 0;
  let isLoading = true;
  let currentLoadingImage: Image | null = null;

  onMount(async () => {
  try {
    const response = await fetch('http://localhost:5000/pitikcats'); // Fetching data from the backend
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Subscribe to the gallery store and load images
    const unsubscribe = galleryStore.subscribe(async (data) => {
      images = data as Image[];
      loadedImages = [];
      currentLoadingIndex = 0;
      isLoading = true;
      await loadNextImage();
    });

    galleryStore.set(data); // Set the fetched data to the store

    // Your existing image loading logic remains here...
  } catch (error) {
    console.error('Error fetching image gallery data:', error);
  }
});

  async function loadNextImage() {
    if (currentLoadingIndex < images.length) {
      currentLoadingImage = images[currentLoadingIndex];
      const loadedImage = await loadImage(currentLoadingImage);

      if (loadedImage) {
        loadedImages = [...loadedImages, loadedImage];
        // const test = await import(`/assets/images/gallery/${images.filename}`);
        // console.log(test);
      }
      currentLoadingIndex++;
      await loadNextImage();
    } else {
      isLoading = false;
      currentLoadingImage = null;
    }
  }

  async function loadImage(image: Image): Promise<Image | null> {
    const imgSrc = `${paths.gallery}${image.filename}`;
    
    try {
      const imgElement = new Image();
      imgElement.src = imgSrc;
      await new Promise((resolve, reject) => {
        imgElement.onload = resolve;
        imgElement.onerror = (e) => reject(new Error(`Failed to load image: ${imgSrc}`));
      });

      // Only fetch EXIF data if date_taken is not already set
      if (!image.date_taken) {
        const response = await fetch(imgSrc);
        const arrayBuffer = await response.arrayBuffer();
        const tags: any = ExifReader.load(arrayBuffer);
        image.date_taken = tags.DateTimeOriginal?.description;
      }
      
      if (image.rotateAngle === undefined) {
        image.rotateAngle = Math.random() * 20 - 10;
      }

      return { ...image, loaded: true, rotateAngle: image.rotateAngle };
    } catch (error) {
      console.error("Error processing image:", image.filename, error);
      return null;
    }
  }

  interface Image {
    _id?: { $oid: string } ;
    caption: string | null;
    description?: string | null;
    alt?: string | null;
    filename: string | null;
    tags?: string[];
    date_taken?: string | null;
    location?: string | null;
    loaded?: boolean;
    rotateAngle?: number;
  }
</script>

<dialog>
  asdaaaaaaaaaaasdasd
</dialog>

<div class="grid">
  {#each loadedImages as image}
    <div class="grid-item">
      <figure class="card" id="card" data-id={image.filename} style="--rotate-angle: {image.rotateAngle}deg;">
        {image._id}
        <div class="image-container">
          <!-- <LazyImage
            filename={`${image.filename}` || catGif}
            alt={image.alt || 'Image'}
          /> -->
        </div>
        <figcaption>
          <!-- <a href="/" class="caption">{image.caption}</a> -->
          <!-- {#if image.description}
            <p class="description">{image.description}</p>
          {/if} -->
          <p class="date-taken">{image.date_taken}</p>
          <!-- {#if image.location}
            <p class="location">Location: {image.location}</p>
          {/if} -->
        </figcaption>
      </figure>
    </div>
  {/each}
  
  {#if isLoading && currentLoadingImage}
    <div class="grid-item">
      <figure class="card loading-card" style="--rotate-angle: {currentLoadingImage.rotateAngle || 0}deg;">
        <div class="image-container">
          <img src={catGif} alt="Developing" class="developing-image" />
        </div>
        <figcaption>
          <p class="caption">Developing...</p>
          <!-- {#if currentLoadingImage.description}
            <p class="description">{currentLoadingImage.description}</p>
          {/if} -->
          <!-- <p class="date-taken">{currentLoadingImage.date_taken || 'Date unknown'}</p>
          {#if currentLoadingImage.location}
            <p class="location">Location: {currentLoadingImage.location}</p>
          {/if} -->
        </figcaption>
      </figure>
    </div>
  {/if}
</div> 

<style lang="scss">
  //#region styles
  // @import "../assets/styles/doodle";
  .grid {
    & {
      // @include doodle-styles;
      --column: 5;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
  .card {
    // font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif
    --offet: 110px;
    --rotate-angle: 0deg;
    transform: translateX(var(--offset)) scale(0.8) rotate(var(--rotate-angle));
    display: flex;
    flex-direction: column;
    background-color: #fff;
    box-shadow: 0 0.2rem 0.1rem rgba(0, 0, 0, 0.5);
    max-width: 200px;
    height: auto;
    z-index: 1;
    
    // transition: all 300ms;

    // & figcaption {
      // a {
      //   text-decoration: none;
      //   color: #333;
      //   font-family: "Caveat";
      //   transition:
      //     font-variation-settings 300ms ease-in-out,
      //     font-weight 300ms ease-in-out;
      //   font-variation-settings: "slnt" 0;
      //   font-weight: 400;
      // }
    // }

    &:hover {
      z-index: 100;
      transform: scale(1) rotate(0);
      box-shadow: 1rem 1rem 0.5rem rgba(0, 0, 0, 0.5);
      filter: none;
      // & a {
        // font-variation-settings: "slnt" -15;
        // font-weight: 700;
      // }
    }
  }
  img {
    // background-color: red; 
    aspect-ratio: 1/1;
    min-width: 100px;
    padding: 10px;
    max-width: 100%;
    height: 100%;
    box-sizing: border-box;
    object-fit: cover;
  }
  // .description {
  //   max-height: 4rem;
  //   display: -webkit-box;
  //   // -webkit-line-clamp: 3;
  //   -webkit-box-orient: vertical;
  //   max-width: 46ch;
  //   text-overflow: ellipsis;
  //   overflow: hidden;
  // }
  .card, .loading-card {
    position: relative;
    --rotate-angle: 0deg;
    transform: scale(0.8) rotate(var(--rotate-angle));
    display: flex;
    flex-direction: column;
    background-color: #fff;
    box-shadow: 0 0.2rem 0.1rem rgba(0, 0, 0, 0.5);
    width: 250px;
    height: 350px;
    transition: all 200ms;
    padding: 10px;
    box-sizing: border-box;
    z-index: 1;
    &:hover {
      transform: scale(1) rotate(0);
      z-index: 100;
      box-shadow: 1rem 1rem 0.5rem rgba(0, 0, 0, 0.5);
    }
  }

  .image-container {
    position: relative;
    width: 100%;
    height: 70%;
    background-color: #f0f0f0;
    overflow: hidden;
  }

  // .placeholder-image {
  //   filter: blur(10px);
  //   opacity: 0.5;
  // }

  .developing-image {
    filter: grayscale(100%) sepia(20%);
  }

  figcaption {
    padding: 10px 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    // font-family: "Caveat", cursive;
    font-size: 0.9rem;
    color: #333;
    overflow: hidden;
  }

  .caption {
    font-weight: bold;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  // .date-taken, .location {
  //   font-size: 0.7rem;
  //   color: #666;
  //   white-space: nowrap;
  //   overflow: hidden;
  //   text-overflow: ellipsis;
  // }

</style>
