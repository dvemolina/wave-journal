<script lang="ts">
	import Map from '../../components/Map.svelte';
	import type { LatLngExpression } from 'leaflet';

	let { data } = $props();

	const initialView: LatLngExpression = [30.0, -9.0]; // Morocco
</script>

<div class="w-full h-full">
	<Map view={initialView} zoom={8} spots={data.spots}></Map>
</div>
