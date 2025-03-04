<script lang="ts">
  import { onMount } from 'svelte';
  
  let map = $state();
  let L = $state();

  onMount(async () => {
    // Dynamically import Leaflet only on the client
    const leaflet = await import('leaflet');
    await import('leaflet/dist/leaflet.css');
    L = leaflet.default;

    // Hardcode a few spots for testing (Morocco-focused)
    const spots = [
      { id: 1, name: "Anchor Point", lat: 30.509, lon: -9.684 },
      { id: 2, name: "Devil’s Rock", lat: 30.536, lon: -9.697 },
    ];

    // Initialize map centered on Morocco
    map = L.map('map').setView([30.0, -9.0], 8);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Add markers for hardcoded spots
    spots.forEach(spot => {
      L.marker([spot.lat, spot.lon])
        .bindPopup(`<b>${spot.name}</b>`)
        .addTo(map);
    });
  });
</script>

<div id="map" style="height: 500px; width: 100%;"></div>
