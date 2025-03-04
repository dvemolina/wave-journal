<script lang="ts">
	import ToolBar from '$lib/components/ToolBar.svelte';
	import '../app.css';
	let { children } = $props();
</script>

{@render children()}
<ToolBar />
