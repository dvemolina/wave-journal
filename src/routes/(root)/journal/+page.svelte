<script lang="ts">
	import Box from '$src/components/Box.svelte';
	import { Input } from '$src/components/ui/input';
	import { Textarea } from '$src/components/ui/textarea';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<Box heading="Journal Entry: Session Report">
	<form class="formgroup flex flex-col gap-2">
		<div class="formgroup flex flex-col gap-2 sm:flex-row">
			<Input />
			<Input />
		</div>
		<Textarea></Textarea>
	</form>
</Box>
