<script lang="ts">

	import Box from '$src/components/Box.svelte';
	import { Button } from '$src/components/ui/button';
	
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>



	<Box heading="Session Reports">
		<Button href='/journal/entry/add'>Create a new session report</Button>
	</Box>
	<Box >
		Previous Reports
	</Box>

