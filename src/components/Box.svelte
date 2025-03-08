<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		heading?: string;
		children: Snippet;
	}

	let { heading, children }: Props = $props();
</script>

{#if heading}
	<div class="bg-background border-border flex w-full flex-col gap-3 rounded-lg border px-5 py-3">
		<p class="title text-foreground">{heading}</p>
	</div>
{/if}
<div class="bg-background border-border mt-2 flex w-full flex-col gap-3 rounded-lg border p-7">
	{@render children()}
</div>
