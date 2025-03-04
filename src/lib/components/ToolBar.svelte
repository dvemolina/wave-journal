<script lang="ts">

     const items = [
          {icon: '/svg/map.svg', label:'Map', path:'/map'},
          {icon: '/svg/paper-fold.svg', label:'Journal', path:'/'},
          {icon: '/svg/wave-circle.svg', label:'Forecast', path:'/'},
          {icon: '/svg/profile.svg', label:'Profile', path:'/'},
     ] 
</script>

<div class="fixed bottom-0 left-0 flex flex-row p-2 justify-evenly items-center shadow-md w-full border-t-2 border-t-neutral-900 ">
     
     {#each items as  { icon, label, path }}
     <a href={path}>
          <img src={icon} alt={label} class="size-6 hover:cursor-pointer">
     </a>
     {/each}

</div>