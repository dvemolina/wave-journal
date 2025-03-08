<script lang="ts">
	import ToolBar from '../components/ToolBar.svelte';
	import { page } from '$app/state';
	let { children } = $props();
	import '../app.css';
	import '../oldApp.css';

	let isMapPage = $derived(/\/map($|\/)/.test(page.url.pathname));
</script>

<div class="layout">
	<main
		class="content flex h-full w-full flex-col {isMapPage
			? ''
			: 'max-w-5xl items-center justify-self-center px-4 py-4 md:px-8 md:py-11'} "
	>
		{@render children()}
	</main>
	<nav class="toolbar">
		<ToolBar />
	</nav>
</div>

<style>
	.layout {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 2.75rem;
		height: 100dvh;
		width: 100%;
	}

	.content {
		grid-row: 1 / 2;
		width: 100%;
		height: 100%;
	}

	.toolbar {
		grid-row: 2 / 3;
		position: sticky;
		bottom: 0;
		left: 0;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}
</style>
