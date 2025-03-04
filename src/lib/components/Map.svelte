<script lang="ts">

  //TRY PREVIOUS MOROCCO MAP IMPLEMENTATION WITH SSR DISABLED IN LAYOUT.SVELTE 

	import { createEventDispatcher, onDestroy, onMount, setContext, tick, type Snippet } from "svelte";
	import L from "leaflet";
  import 'leaflet/dist/leaflet.css';

  interface Props {
    children?: Snippet | undefined;
    bounds?: L.LatLngBoundsExpression  | undefined;
    view?: L.LatLngExpression | undefined;
    zoom?: number | undefined;
  }

  let { children, bounds = undefined, view = undefined, zoom = undefined}: Props = $props()


  let map: L.Map | undefined = $state()
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

		L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
			attribution: `&copy;<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>,&copy;<a href="https://carto.com/attributions" target="_blank">CARTO</a>`
		}).addTo(map);
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
  }) 

</script> 

<div class="w-full h-full" bind:this={mapElement}>
  {#if map}
    {@render children?.()}
  {/if}
  </div>

