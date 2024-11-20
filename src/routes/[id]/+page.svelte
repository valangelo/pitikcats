<script lang="ts">
  import { onMount, tick } from "svelte";
  
  import { page } from "$app/stores";
  import ExifReader from "exifreader";
  import { getRotationAngle } from "$lib/rotate";

  import { writable } from "svelte/store";
  import type { PhotoInfo } from "./+page";



  // import { photoInfo, error } from './page.ts'; // Adjust the import path if necessary
  // import type { PhotoInfo } from './page.ts'; // Import the type only

  let exifData: ExifData = {};
  interface ExifData {
    [key: string]: { description: string };
  }
  $: imageId = $page?.params?.id;

  

  onMount(async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/pitikcats/${imageId}`,
      );
      if (!response.ok) throw new Error("Failed to fetch image");

      const data = await response.json();
      const imageUrl = `/src/assets/images/gallery/${data.filename}`;
      const imgResponse = await fetch(imageUrl);
      const imgBlob = await imgResponse.blob();
      const arrayBuffer = await imgBlob.arrayBuffer();
      exifData = ExifReader.load(arrayBuffer);
      console.log(exifData);
      const { rotation, flip } = getRotationAngle(
        exifData?.Orientation?.description,
      );

      const combinedData: PhotoInfo = {
        ...data,
        rotationAngle: rotation,
        flipImage: flip,
        GPSLatitude: exifData?.GPSLatitude?.description,
        GPSLongitude: exifData?.GPSLongitude?.description,
        GPSAltitude: exifData?.GPSAltitude?.description,
        ImageHeight: exifData?.ImageHeight?.description,
        ImageWidth: exifData?.ImageWidth?.description,
        ISOSpeedRatings: exifData?.ISOSpeedRatings?.description,
        ExposureTime: exifData?.ExposureTime?.description,
        FNumber: exifData?.FNumber?.description,
        FocalLength: exifData?.FocalLength?.description,
        WhiteBalance: exifData?.WhiteBalance?.description,
        DateTimeOriginal: exifData?.DateTimeOriginal?.description,
        Make: exifData?.Make?.description,
        Model: exifData?.Model?.description,
        LensModel: exifData?.LensModel?.description,
        Flash: exifData?.Flash?.description,
        MeteringMode: exifData?.MeteringMode?.description,
        SceneCaptureType: exifData?.SceneCaptureType?.description,
        Orientation: exifData?.Orientation?.description,
        Software: exifData?.Software?.description,
        ColorSpace: exifData?.ColorSpace?.description,
        SensingMethod: exifData?.SensingMethod?.description,
        ShutterSpeedValue: exifData?.ShutterSpeedValue?.description,
        ApertureValue: exifData?.ApertureValue?.description,
        FileSize: exifData?.FileSize?.description,
      };
      console.log(exifData?.DateTimeOriginal?.description);
      

      await tick();
      photoInfo.set(combinedData);

      console.log(combinedData);
    } catch (err) {
      error.set(err.message);
      console.error("Error:", err);
    }
  });

  export const photoInfo = writable<PhotoInfo | null>(null);
  export const error = writable<string | null>(null);
</script>

<main>
  {#if $photoInfo}
    <div class="card">
      <div class="image-details">
        <img
        src={`/src/assets/images/gallery/${$photoInfo.filename}`}
        alt={$photoInfo?.alt?.value || $photoInfo?.caption?.value}
        />
        
        <!-- style={`transform: rotate(${rotationAngle}deg) scaleX(${flipImage ? -1 : 1})`} -->
        <p><strong>Caption:</strong> {$photoInfo.caption}</p>
        <p><strong>Description:</strong> {$photoInfo.description}</p>
        <p>
          <strong>Date Taken:</strong>
          {$photoInfo?.DateTimeOriginal
            ? $photoInfo.DateTimeOriginal
            : "Unknown"}
        </p>
        {#if $photoInfo.location}
          <p><strong>Location:</strong> {$photoInfo?.location}</p>
        {/if}
        <p><strong>Camera Information:</strong></p>
        <ul>
          <li><strong>Make:</strong> {$photoInfo.Make}</li>
          <li><strong>Model:</strong> {$photoInfo.Model}</li>
          <li><strong>Lens Model:</strong> {$photoInfo.LensModel}</li>
          <li>
            <strong>Image Dimensions:</strong>
            {$photoInfo.ImageWidth} x {$photoInfo.ImageHeight}
          </li>
        </ul>

        <p><strong>Exposure Settings:</strong></p>
        <ul>
          <li><strong>ISO Speed:</strong> {$photoInfo.ISOSpeedRatings}</li>
          <li><strong>Exposure Time:</strong> {$photoInfo.ExposureTime}</li>
          <li><strong>Aperture:</strong> {$photoInfo.ApertureValue}</li>
          <li><strong>Focal Length:</strong> {$photoInfo.FocalLength}</li>
          <li>
            <strong>Shutter Speed:</strong>
            {$photoInfo.ShutterSpeedValue}
          </li>
          <li><strong>White Balance:</strong> {$photoInfo.WhiteBalance}</li>
        </ul>

        {#if $photoInfo.GPSLatitude && $photoInfo.GPSLongitude}
          <p>
            <strong>GPS Location:</strong>
            {$photoInfo.GPSLatitude}, {$photoInfo.GPSLongitude}
          </p>
        {/if}
      </div>
    </div>
  {:else}
    <p class="test">Loading image...</p>
  {/if}
</main>

<style lang="scss">
  // {#if $photoInfo}
  // .test{
  //   background-color: red;
  // }
  .card {
    max-width: 75dvw;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    // border-radius: 8px;
    // background-color: #000;
  }

  // .image-details {
  //   // text-align: center;
  // }

  .image-details img {
    max-height: 85dvh;
    // height: auto;
  }

  // .image-details p {
  //   // font-size: 1.1em;
  // }

  // .tag {
  //   display: inline-block;
  //   margin-right: 5px;
  //   color: #333;
  //   font-weight: bold;
  // }
  strong {
    font-weight: bolder;
  }

  
  // {/if}
</style>
