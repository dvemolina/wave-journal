<script lang="ts">
	import { goto } from '$app/navigation';
	import Box from '$src/components/Box.svelte';
	
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<Box heading="Journal Entry: Session Report">
	<button onclick={() => goto('/journal/entry/add')}>New Journal Entry</button>
</Box>
