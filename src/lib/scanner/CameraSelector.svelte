<script>
  import { Drawer } from 'flowbite-svelte';
  import { onMount } from 'svelte';

  import { sineIn } from 'svelte/easing';
  import List from './List.svelte';

  export let hidden = false;
  export let selected;

  /** @type {InputDeviceInfo[]} */
  let frontCameras = [];
  /** @type {InputDeviceInfo[]} */
  let backCameras = [];
  /** @type {InputDeviceInfo[]} */
  let otherCameras = [];

  const transitionParamsBottom = {
    y: 320,
    duration: 200,
    easing: sineIn,
  };

  const getMediaDevices = async () => {
    return window.navigator.mediaDevices.enumerateDevices();
  };

  onMount(async () => {
    const mediaDevices = await getMediaDevices();
    /** @type {InputDeviceInfo[]} */
    const cameras = mediaDevices.filter((media) => media.kind === 'videoinput');
    const cameraWithCapabilities = cameras.map((camera) => ({
      camera,
      capability: camera.getCapabilities(),
    }));

    frontCameras = cameraWithCapabilities
      .filter(({ capability }) => capability.facingMode.includes('user'))
      .map(({ camera }) => camera);

    backCameras = cameraWithCapabilities
      .filter(({ capability }) => capability.facingMode.includes('environment'))
      .map(({ camera }) => camera);

    otherCameras = cameraWithCapabilities
      .filter(
        ({ capability }) =>
          !capability.facingMode.includes('environment') && !capability.facingMode.includes('user')
      )
      .map(({ camera }) => camera);
  });
</script>

<Drawer
  placement="bottom"
  width="w-full"
  transitionType="fly"
  bind:hidden
  transitionParams={transitionParamsBottom}
>
  <div class="flex flex-col gap-3">
    {#if frontCameras.length > 0}
      <List bind:group={selected} items={frontCameras} title="Front Camera" />
    {/if}

    {#if backCameras.length > 0}
      <List bind:group={selected} items={backCameras} title="Back Camera" />
    {/if}

    {#if otherCameras.length > 0}
      <List bind:group={selected} items={otherCameras} title="Other Camera" />
    {/if}
  </div>
</Drawer>
