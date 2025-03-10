<script lang="ts">
	import Map from '$src/features/Map/components/Map.svelte';
	import type { LatLngExpression } from 'leaflet';

	let { data } = $props();

	const initialView: LatLngExpression = [30.0, -9.0]; // Morocco
</script>

<div class="h-full w-full">
	<Map view={initialView} zoom={8} breaks={data.breaks}></Map>
</div>
