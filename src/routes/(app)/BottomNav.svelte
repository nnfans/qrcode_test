<script>
  import { BottomNav, BottomNavItem } from 'flowbite-svelte';
  import { BarsOutline, CameraFotoOutline, HomeSolid } from 'flowbite-svelte-icons';
</script>

<BottomNav
  position="relative"
  classInner="grid-cols-3"
  outerClass="relative w-full z-10 border-gray-200 dark:bg-gray-700 dark:border-gray-600 bottom-0 left-0 h-16 bg-white border-t"
>
  <BottomNavItem btnName="Home" href="/">
    <HomeSolid
      class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500"
    />
  </BottomNavItem>
  <BottomNavItem btnName="Scanner" href="/scanner">
    <CameraFotoOutline
      class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500"
    />
  </BottomNavItem>
  <BottomNavItem btnName="Result" href="/setting">
    <BarsOutline
      class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500"
    />
  </BottomNavItem>
</BottomNav>
