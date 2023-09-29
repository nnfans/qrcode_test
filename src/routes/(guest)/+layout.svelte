<script async>
  import { guest } from '$lib/utils/auth';

  const waitGuest = guest();
</script>

{#await waitGuest then}
  <slot />
{/await}
