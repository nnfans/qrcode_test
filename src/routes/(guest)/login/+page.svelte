<script>
  import { login } from '$lib/utils/auth';
  import { Card, Button, Label, Input } from 'flowbite-svelte';

  let email = '';
  let password = '';

  const handleLogin = () => {
    login(email, password);
  };
</script>

<div class="card-container">
  <Card class="w-full max-w-md">
    <form on:submit|preventDefault={handleLogin} class="flex flex-col space-y-6" action="/">
      <Label class="space-y-2">
        <span>Email</span>
        <Input
          bind:value={email}
          type="email"
          name="email"
          placeholder="name@company.com"
          required
        />
      </Label>
      <Label class="space-y-2">
        <span>Your password</span>
        <Input bind:value={password} type="password" name="password" placeholder="•••••" required />
      </Label>
      <Button type="submit" class="w-full">Login</Button>
    </form>
  </Card>
</div>

<style lang="postcss">
  .card-container {
    @apply flex w-full h-full justify-center items-center;
  }
</style>
