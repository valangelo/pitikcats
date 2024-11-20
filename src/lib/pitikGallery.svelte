<script lang="ts">
  import { onMount } from "svelte";
  import ExifReader from "exifreader";
  import { paths } from "$lib/index";
  // import { initialData } from "$lib/imagegallerydata";
  import { writable } from "svelte/store";
  import LazyImage from "./LazyImage.svelte";
  import catGif from "../assets/images/design/cat.gif";
import { formatDate } from "$lib/formatDate";
  // Create a writable store to hold the loaded images
  let galleryStore = writable<Image[]>([]);
  let images: Image[] = [];
  let loadedImages: Image[] = [];
  let currentLoadingIndex = 0;
  let isLoading = true;
  let currentLoadingImage: Image | null = null;

  onMount(async () => {
    try {
      const response = await fetch("http://localhost:5000/pitikcats"); // Fetching data from the backend
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);

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
      console.error("Error fetching image gallery data:", error);
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
        imgElement.onerror = (e) =>
          reject(new Error(`Failed to load image: ${imgSrc}`));
      });

      // Only fetch EXIF data if date_taken is not already set
      if (!image.date_taken) {
        const response = await fetch(imgSrc);
        const arrayBuffer = await response.arrayBuffer();
        const tags: any = ExifReader.load(arrayBuffer);
        image.date_taken = tags.DateTimeOriginal?.description;
      }

      if (image.rotateAngle === undefined) {
        const min = -12;
        const max = 12;
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);

        image.offset = Math.random() * (maxFloored - minCeiled) + minCeiled;
        image.rotateAngle = Math.floor(
          Math.random() * (maxFloored - minCeiled) + minCeiled,
        );
      }

      return { ...image, loaded: true, rotateAngle: image.rotateAngle };
    } catch (error) {
      console.error("Error processing image:", image.filename, error);
      return null;
    }
  }

  



  interface Image {
    _id?: { $oid: string };
    caption: string | null;
    // description?: string | null;
    alt?: string | null;
    filename: string | null;
    tags?: string[];
    date_taken?: string | null;
    location?: string | null;
    loaded?: boolean;
    rotateAngle?: number;
    offset?: number;
  }


  
  //#region HTML
</script>
<dialog>asdaaaaaaaaaaasdasd</dialog>

<div class="grid">
  {#each loadedImages as image}
    <a href={`/${image._id}`} class="image-link">
      <div class="grid-item" data-id={image._id}>
        <figure
          class="card"
          id="card"
          data-id={image.filename}
          style="--rotate-angle: {image.rotateAngle}deg;"
        >
          <div class="image-container">
            <LazyImage
              filename={`${image.filename}` || catGif}
              alt={image.alt || "Image"}
              
            />
          </div>
          <figcaption>
            <a href="/" class="caption">{image.caption}</a>
            <!-- {#if image.description}
              <p class="description">{image.description}</p>
            {/if} -->
            <p class="date-taken">{formatDate(image?.date_taken||"")}</p>
            <!-- <p class="date-taken">{image.date_taken}</p> -->
            {#if image.location}
              <p class="location">Location: {image.location}</p>
            {/if}
            <!-- {#if image._id}
              <p class="id" hidden>{image._id}</p>
            {/if} -->
          </figcaption>
        </figure>
      </div>
    </a>
  {/each}

  {#if isLoading && currentLoadingImage}
    <div class="grid-item">
      <figure
        class="card loading-card"
        style="--rotate-angle: {currentLoadingImage.rotateAngle || 0}deg;
      --offset: {currentLoadingImage.offset}"
      >
        <div class="image-container">
          <img src={catGif} alt="Developing" class="developing-image" />
        </div>
        <!-- {images?._id} -->
        <figcaption>
          <p class="caption">Developing...</p>
        </figcaption>
      </figure>
    </div>
  {/if}
</div>

<style lang="scss">
  //#region STYLES



$card-height: 30rem;
$card-width: 30rem;
$card-padding:10px;





  @import "../assets/styles/doodle";
  @import url("https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap");
  a {
    text-decoration: none;
  }
  .grid {
    //   @include doodle-styles;
    & {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
  .card {
    --rotate-angle: 0deg;
    transform: scale(0.8) rotate(var(--rotate-angle));
    display: flex;
    flex-direction: column;
    background-color: #fff;
    box-shadow: 0 0.2rem 0.1rem rgba(0, 0, 0, 0.5);
    // max-width: 200px;
    // height: 5000px;
    z-index: 1;
    // transition: all 300ms;

    & figcaption {
      a {
        color: #333;
        font-family: "Recursive", monospace;
        transition:
          font-variation-settings 300ms ease-in-out,
          font-weight 300ms ease-in-out;
        font-variation-settings: "slnt" 0;
        font-weight: 900;
        font-style: italic;
      }
    }

    &:hover {
      z-index: 100;
      transform: scale(1) rotate(0);
      box-shadow: 1rem 1rem 0.5rem rgba(0, 0, 0, 0.5);
      filter: none;
      & a {
        font-variation-settings: "slnt" -15;
        font-style:normal;
      }
    }
  }
  // img {
    // background-color: red;
    // aspect-ratio: 1/1;
    // min-width: 100px;
    // margin: 10px;
    // max-width: 100%;
    // height: 100%;
    // box-sizing: border-box;
    // object-fit: cover;
  // }
  // .description {
  //   text-decoration: none !important;
  //   color: red;
  //   max-height: 4rem;
  //   display: -webkit-box;
  //   // -webkit-line-clamp: 3;
  //   -webkit-box-orient: vertical;
  //   max-width: 46ch;
  //   text-overflow: ellipsis;
  //   overflow: hidden;
  // }
  .card,
  .loading-card {
    --rotate-angle: 0deg;
    transform: scale(0.8) rotate(var(--rotate-angle));
    display: flex;
    flex-direction: column;
    background-color: rgb(250, 250, 250);
    box-shadow: 0 0.2rem 0.1rem rgba(0, 0, 0, 0.5);
    width: $card-width;
    height: $card-height;
    transition: all 200ms;
    padding: $card-padding;
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
    height: 80%;
    overflow: hidden;//Fail safe? not needed
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
    font-family: "Caveat", cursive;
    overflow: hidden;
  }

  .caption {
    font-weight: bold;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .date-taken,
  .location {
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
