<!-- src/lib/components/ui/Input.svelte -->
<script lang="ts">
  let {
    label,
    type = "text",
    value = $bindable(""),
    placeholder = "",
    error,
    disabled = false,
    required = false,
  }: {
    label?: string;
    type?: string;
    value?: string;
    placeholder?: string;
    error?: string;
    disabled?: boolean;
    required?: boolean;
  } = $props();

  const id = `input-${Math.random().toString(36).substr(2, 9)}`;
</script>

<div class="w-full">
  {#if label}
    <label
      for={id}
      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
    >
      {label}
      {#if required}
        <span class="text-red-500">*</span>
      {/if}
    </label>
  {/if}

  <input
    {id}
    {type}
    bind:value
    {placeholder}
    {disabled}
    {required}
    class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed
      {error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
      dark:bg-gray-800 dark:text-white"
  />

  {#if error}
    <p class="mt-1 text-sm text-red-500">{error}</p>
  {/if}
</div>
