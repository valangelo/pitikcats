<script lang="ts">
    import "$lib/reset.scss";
    // import "../assets/styles/main.scss"; 
    import PitikcatsGallery from '$lib/pitikGallery.svelte';
    import {paths,designImages} from '$lib/index';
</script>

<svelte:head>
    <title>
        PitikCats
    </title>
    <link rel="icon" href={designImages.logo} />
</svelte:head>
  <main>
    <div class="header">
      <img src={designImages.logo}    alt="Pitik Elliot logo" />

      <div>
        <h1>PitikCats</h1>
        <p>
          I'm just a wannabe (as of now) Web Developer with Imposter Syndrome and
          doing street photography for fun :)
        </p>
      </div>
      <div class="views">
        <h2>Views</h2>
        100
      </div>
    </div>

    <PitikcatsGallery />
    <!--  -->
  </main>

  <style lang="scss">
    main{ 
      top:0;
      left:0;
      margin:0;
      padding:0;  
      background-image: url(../assets/images/design/seamless_paper_texture.png);
      // background-color: red;
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
      font-size: xx-large;
      margin-top: 1.5rem;
    }

    h2 {
      font-size: large;
      margin-top: 1.5rem;
    }

    p {
      margin: 1.5rem;
      line-height: 1.5;
    }
  </style>

<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5NG98395"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
