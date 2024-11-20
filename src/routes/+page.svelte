<script lang="ts">
  import "$lib/reset.scss";
  import PitikcatsGallery from '$lib/pitikGallery.svelte';
  import { paths, designImages } from '$lib/index';
  import "../assets/styles/_typography.scss";

  export let data;
</script>

<svelte:head>
    <title>PitikCats</title>
    <link rel="icon" href={designImages.logo} />
</svelte:head>

<main>
  <div class="header">
    <img src={designImages.logo} alt="Pitik Elliot logo" />
    <div>
      <h1>PitikCats</h1>
      <p>I'm just a wannabe (as of now) Web Developer with Imposter Syndrome and doing street photography for fun :)</p>
    </div>
    <div class="views">
      <h2>Views</h2>
      100
    </div>
  </div>

  {#if data?.error}
    <p class="error-message">{data.error}</p>
  {:else}
    <PitikcatsGallery />
  {/if}
</main>

<style lang="scss">
  main {
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    background-image: url(../assets/images/design/seamless_paper_texture.png);
  }

  .error-message {
    font-family: 'Caveat';
    font-size: xx-large;
    font-weight: bold;
    text-align: center;
    margin: 1rem;
  }

  @import "../assets/styles/doodle";

  @media (min-width: 768px) {
    .header {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }

  .header {
    @include doodle-styles;
    font-family: "Caveat";
    font-size: larger;
    background-image: url(../assets/images/design/kelan-Paper-texture-filter.svg);
    --header-width: 50vw;
    max-width: var(--header-width);
    padding: 0;
    margin: 2rem auto;

    img {
      width: 100%;
      max-height: 200px;
    }
  }

  h1 {
    font-size: xxx-large;
    margin-top: 1.5rem;
  }

  h2 {
    font-size: xx-large;
    margin-top: 1.5rem;
  }

  p {
    font-size: x-large;
    margin: 1.5rem;
    line-height: 1.5;
  }
</style>
