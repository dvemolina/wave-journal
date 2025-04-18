<script lang="ts">

	import {
		createEventDispatcher,
		onDestroy,
		onMount,
		setContext,
		tick,
		type Snippet
	} from 'svelte';
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';
	

	interface Props {
		children?: Snippet | undefined;
		bounds?: L.LatLngBoundsExpression | undefined;
		view?: L.LatLngExpression | undefined;
		zoom?: number | undefined;
		breaks?: any;
	}

	let { children, bounds = undefined, view = undefined, zoom = undefined, breaks }: Props = $props();

	let map: L.Map | undefined = $state();
	let mapElement: HTMLElement;

	const dispatch = createEventDispatcher();

	onMount(() => {
		if (!bounds && (!view || !zoom)) {
			throw new Error('Must set either bounds, or view and zoom.');
		}

		map = L.map(mapElement)
			// example to expose map events to parent components:
			.on('zoom', (e) => dispatch('zoom', e))
			.on('popupopen', async (e) => {
				await tick();
				e.popup.update();
			});

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '© OpenStreetMap contributors'
		}).addTo(map);

		breaks.countries.forEach((country) => {
			country.regions.forEach((region) => {
				region.breaks.forEach((breakSpot) => {

					L.marker([breakSpot.lat, breakSpot.lon]).bindPopup(`<b>${breakSpot.name}</b>`).addTo(map);
				})
			})
		});
	});

	onDestroy(() => {
		map?.remove();
		map = undefined;
	});

	setContext('map', {
		getMap: () => map
	});

	$effect(() => {
		if (map) {
			if (bounds) {
				map.fitBounds(bounds);
			} else if (view && zoom) {
				map.setView(view, zoom);
			}
		}
	});
</script>

<div class="h-full w-full" bind:this={mapElement}>
	{#if map}
		{@render children?.()}
	{/if}
</div>
