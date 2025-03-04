<script lang="ts">
	import Map from "$lib/components/Map.svelte";
	import type { LatLngExpression } from "leaflet";

    const initialView: LatLngExpression = [51.514244, 7.468429]; // Dortmund, Germany
</script>

<Map view={initialView} zoom={14}></Map>