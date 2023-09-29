<script async>
  import { guard } from '$lib/utils/auth';

  import BottomNav from './BottomNav.svelte';

  const waitGuard = guard();
</script>

{#await waitGuard then}
  <div class="root-wrapper">
    <div class="main-wrapper">
      <slot />
    </div>
    <BottomNav />
  </div>
{/await}

<style lang="postcss">
  .root-wrapper {
    @apply flex flex-col h-full;
  }

  .main-wrapper {
    @apply flex-1;
  }
</style>
