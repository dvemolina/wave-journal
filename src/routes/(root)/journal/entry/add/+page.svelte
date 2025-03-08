<script lang="ts">
	import Box from '$src/components/Box.svelte';
	import JournalEntryForm from '$src/features/Journal/components/JournalEntryForm.svelte';

	let { data } = $props();
</script>

<Box heading="Journal Entry: Session Report">
	<JournalEntryForm {data} spots={data.spots} />
</Box>
