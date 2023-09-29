<script>
  import { Radio } from 'flowbite-svelte';

  export let group;
  export let items;
  export let title;
</script>

<div>
  <p class="mb-1 font-semibold text-gray-900 dark:text-white">
    {title}
  </p>
  <ul class="">
    {#each items as item}
      <li>
        <Radio class="p-3 w-full" bind:group value={item.deviceId}>{item.label}</Radio>
      </li>
    {/each}
  </ul>
</div>

<style lang="postcss">
  ul {
    @apply w-full bg-white rounded-lg border border-gray-200 divide-y divide-gray-200;
    @apply dark:bg-gray-800 dark:border-gray-600 dark:divide-gray-600;
  }
</style>
