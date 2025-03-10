<script lang="ts">

	import Box from '$src/components/Box.svelte';
	import { Button } from '$src/components/ui/button';
	
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<Box heading="Journal Entry: Session Report">
	<Button href='/journal/entry/add'>New Journal Entry</Button>
</Box>
