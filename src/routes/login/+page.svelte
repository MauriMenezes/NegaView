<!-- src/routes/(auth)/login/+page.svelte -->
<script lang="ts">
  import { goto } from "$app/navigation";
  import { authStore } from "$lib/stores/auth";
  import { authService } from "$lib/services/auth.services";
  import Input from "$lib/components/ui/Input.svelte";

  let email = $state("");
  let password = $state("");
  let error = $state("");
  let loading = $state(false);

  async function handleSubmit() {
    error = "";
    loading = true;

    try {
      const { token, user } = await authService.login({ email, password });

      localStorage.setItem("token", token);
      authStore.login(email, password);

      goto("/dashboard");
    } catch (err) {
      error = err instanceof Error ? err.message : "Erro ao fazer login";
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Login - Dashboard</title>
</svelte:head>

<div
  class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
>
  <div class="max-w-md w-full space-y-8">
    <div>
      <h2
        class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white"
      >
        Dashboard Administrativo
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        Faça login para acessar o sistema
      </p>
    </div>

    <form
      class="mt-8 space-y-6"
      onsubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div class="space-y-4">
        <Input
          label="Email"
          type="email"
          bind:value={email}
          placeholder="seu@email.com"
          required
        />

        <Input
          label="Senha"
          type="password"
          bind:value={password}
          placeholder="••••••••"
          required
        />
      </div>

      {#if error}
        <div class="rounded-md bg-red-50 dark:bg-red-900/20 p-4">
          <p class="text-sm text-red-800 dark:text-red-200">{error}</p>
        </div>
      {/if}

      <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
        <p class="text-sm text-blue-800 dark:text-blue-200">
          <strong>Credenciais de teste:</strong><br />
          Admin: admin@example.com / admin123<br />
          Usuário: user@example.com / user123
        </p>
      </div>

      <button
        type="submit"
        class="w-full bg-amber-900 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-400 disabled:cursor-not-allowed"
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  </div>
</div>
