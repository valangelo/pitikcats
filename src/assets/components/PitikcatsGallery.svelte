<script lang="ts">
  import "../styles/main.scss";
  import { onMount, tick } from "svelte";
  import ExifReader from "exifreader";
// import '../../api/pitikcats';
import pitikCatData from '../data.json';
  let isLoading = true;

  interface Image {
    id: number;
    imgSrc: string;
    caption?: string;
    description?: string;
    alt?: string;
    filename: string;
    tags?: string[];
    date_taken?: string | null;
    location?: string | null;
    rowSpan?: string | null;
    colSpan?: string | null;
    loaded: boolean;
    rotateAngle:Number | null;
  }

  let images: Image[] = [];

  let catcards:any=[];

  onMount(async () => {
    try {
      const response = await fetch("http://localhost:5000/pitikcats");
      // const response = await fetch(pitikCatData);
      if (!response.ok) throw new Error("Failed to fetch images");
      
      // const imageList: Image[] = await response.json();

      const imageList: Image[] =  pitikCatData ;

      for (const image of imageList) {
        await loadImage(image);
      }
      isLoading = false;
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  });

  

  async function loadImage(image: any) {
    const imgSrc = `./src/assets/images/src/${image.filename}`;
    const imgElement = new Image();
    imgElement.src = imgSrc;

    imgElement.onload = async () => {
      try {
        const randomAngle = Math.random() * 20 - 10;
        const response = await fetch(imgSrc);
        const arrayBuffer = await response.arrayBuffer();
        const tags: any = ExifReader.load(arrayBuffer);
        image.date_taken = tags.DateTimeOriginal?.description;
        images = [...images, { ...image, imgSrc, loaded: true, rotateAngle:randomAngle}];        
      } catch (error) {
        console.error("Error processing image:", error);
      }
    };

    imgElement.onerror = () => {
      console.error(`Failed to load image: ${imgSrc}`);
    };
  }

</script>

<div class="grid">
  {#each images as image }
  <!-- {console.log(images.caption)} -->
    <div class="grid-item">
      <figure class="card" style="--rotate-angle: {image.rotateAngle}deg;">
        <img
          src={image.imgSrc || 'fallback-image.jpg'}
          alt={image.alt || 'Image not found'}
          loading={image.id > 4 ? "lazy" : "eager"}
          on:error={() => console.error(`Failed to load image: ${image.imgSrc}`)}
        />
        <figcaption>
          <a href="/" class="caption">{image.caption}</a>
          {#if image.description}
            <p class="description">{image.description}</p>
          {/if}
          <p class="Date Taken:">{image.date_taken}</p>
          {#if image.location}
            <p>Location: {image.location}</p>
          {/if}
        </figcaption>
      </figure>
    </div>
  {/each}
</div>

<style lang="scss">
  @import "../styles/doodle";
  // @import url("https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap");
  .grid {
    @include doodle-styles;
    &{  
      --column: 5;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  }
  .card {
    --rotate-angle: 0deg;
    transform:  scale(0.8) rotate(var(--rotate-angle));
    display: inline-block;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    box-shadow: 0 0.2rem 0.1rem rgba(0, 0, 0, 0.5);
    max-width: 200px;
    height: auto;
    filter: grayscale(100%);
    transition: all 200ms;
    
    & figcaption {
      a {
        text-decoration: none;
        color: #333;
        font-family: "Recursive", monospace;
        transition:
        font-variation-settings 300ms ease-in-out,
        font-weight 300ms ease-in-out;
        font-variation-settings: "slnt" 0;
        font-weight: 400;
      }
    }
    
    &:hover {
      transform: scale(1) rotate(0);
      box-shadow: 1rem 1rem 0.5rem rgba(0, 0, 0, 0.5);
      filter: none;
      & a {
        font-variation-settings: "slnt" -15;
        font-weight: 700;
      }
    }
  }
  img {
    aspect-ratio: 1/1;
    min-width: 100px;
    padding: 10px;
    max-width: 100%;
    height: auto;
    box-sizing: border-box;
    object-fit: cover;
  }
  .description {
    max-height: 4rem;
    display: -webkit-box;
    line-clamp: 3;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    max-width: 46ch;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>
