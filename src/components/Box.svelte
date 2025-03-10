<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		heading?: string;
		children: Snippet;
		width?: "fit" | "full";
	}

	let { heading, children, width = "full" }: Props = $props();
</script>

{#if heading}
	<div class="bg-card border-border flex { width === 'fit' ? 'w-fit' : 'w-full'} flex-col gap-3 rounded-lg border px-5 py-3 mb-3">
		<p class="title text-foreground">{heading}</p>
	</div>
{/if}
<div class="bg-card border-border flex w-full flex-col gap-3 rounded-lg border p-7">
	{@render children()}
</div>
