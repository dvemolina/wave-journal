<script lang="ts">
	import { map } from "leaflet";

     const items = [
          {icon: 'map.svg', label:'Map'},
          {icon: 'paper-fold.svg', label:'Journal'},
          {icon: 'wave-circle.svg', label:'Forecast'},
          {icon: 'profile.svg', label:'Profile'},
     ] 
</script>

<div class="fixed bottom-0 left-0 flex flex-row p-2 justify-evenly items-center shadow-md w-full border-t-2 border-t-neutral-900 ">
     
     {#each items as  { icon, label }}
          <img src={icon} alt={label} class="size-6">
     {/each}

</div>