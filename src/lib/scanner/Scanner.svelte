<script>
  import { onDestroy, onMount } from 'svelte';
  import { Button } from 'flowbite-svelte';
  import { CogOutline } from 'flowbite-svelte-icons';

  import CameraSelector from './CameraSelector.svelte';
  import { getStream, stopStream } from './stream';
  import read from './read';

  let readFrames = 0;
  let videoFrames = 0;
  let startTime = 0;

  let cameraId;
  let hideSelector = true;

  let isProcess = false;

  /** @type {MediaStream} */
  let stream = null;

  /** @type {HTMLCanvasElement} */
  let canvas;

  /** @type {CanvasRenderingContext2D} */
  let ctx;

  /** @type {HTMLVideoElement} */
  let video;

  /** @type {import('@sec-ant/zxing-wasm').ZXingReadOutput[]} */
  let result = [];

  function getFps() {
    const readFps = Math.round((readFrames / (Date.now() - startTime)) * 1000);
    const videoFps = Math.round((videoFrames / (Date.now() - startTime)) * 1000);

    return { read: readFps, video: videoFps };
  }

  const setCamera = async (id) => {
    stream = await getStream(id);
    video.srcObject = stream;
  };

  $: {
    if (hideSelector && typeof navigator !== 'undefined' && cameraId) {
      setCamera(cameraId);
    }
  }

  function processFrame() {
    try {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      if (!isProcess) {
        isProcess = true;
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        read(imageData, { formats: ['QRCode'], tryHarder: true }).then((data) => {
          result = data;

          ctx.beginPath();

          result.forEach((item) => {
            const { x } = item.position.topLeft;
            const { y } = item.position.topLeft;

            const w = item.position.topRight.x - x;
            const h = item.position.bottomRight.y - y;
            ctx.rect(x, y, w, h);
          });

          ctx.strokeStyle = 'red';
          ctx.lineWidth = 4;

          ctx.stroke();

          isProcess = false;
          readFrames += 1;
        });
      }

      videoFrames += 1;
      ctx.fillStyle = 'white';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 4;
      ctx.font = 'bold 32px Courier';
      ctx.strokeText(`Video: ${getFps().video}`, 10, 10 + 32);
      ctx.fillText(`Video: ${getFps().video}`, 10, 10 + 32);
      ctx.strokeText(`Read:  ${getFps().read}`, 10, 10 + 32 + 10 + 32);
      ctx.fillText(`Read:  ${getFps().read}`, 10, 10 + 32 + 10 + 32);
    } catch (err) {}
    requestAnimationFrame(processFrame);
  }

  onMount(() => {
    video = document.createElement('video');
    video.setAttribute('id', 'video');
    video.setAttribute('width', canvas.width);
    video.setAttribute('height', canvas.height);
    video.setAttribute('autoplay', '');

    video.onloadedmetadata = () => {
      video.play();
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx = canvas.getContext('2d', { willReadFrequently: true });

      readFrames = 0;
      videoFrames = 0;
      startTime = Date.now();
    };

    processFrame();

    setInterval(() => {
      const fps = getFps();
      readFrames = fps.read / 2;
      videoFrames = fps.video / 2;
      startTime = Date.now() - 500;
    }, 1000);
  });

  onDestroy(() => {
    stopStream(stream);
  });

  const selectCamera = async () => {
    hideSelector = false;
  };
</script>

<main>
  <div class="preview-container">
    <canvas bind:this={canvas} />
    <Button
      color="primary"
      pill={true}
      on:click={selectCamera}
      class="absolute bottom-2 right-2 !p-3"
    >
      <CogOutline class="w-6 h-6" /></Button
    >
  </div>
  {#each result as item}
    <pre>{item.text}: {item.format}: {item.position.topLeft.x}{item.position.topLeft.y}</pre>
  {/each}
</main>

<CameraSelector bind:hidden={hideSelector} bind:selected={cameraId} />

<style lang="postcss">
  .preview-container {
    @apply bg-gray-950 mx-auto relative;
    @apply dark:bg-white;
    width: 100vw;
    height: 100vw;
    max-width: 400px;
    max-height: 400px;
  }

  .preview-container canvas {
    height: 100%;
    width: 100%;
  }
</style>
