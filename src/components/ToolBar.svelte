<script lang="ts">
	const items = [
		{ icon: '/svg/home.svg', label: 'Home', path: '/' },
		{ icon: '/svg/wave-circle.svg', label: 'Forecast', path: '/forecast' },
		{ icon: '/svg/paper-fold.svg', label: 'Journal', path: '/journal' },
		{ icon: '/svg/map.svg', label: 'Map', path: '/map' },
		{ icon: '/svg/profile.svg', label: 'Profile', path: '/profile' }
	];
</script>

<div
	class="navbar z-99 flex h-11 w-full flex-row items-center justify-evenly border-t border-t-border bg-background/50 shadow-md"
>
	{#each items as { icon, label, path }}
		<a href={path} class="w-full flex flex-row justify-center items-center">
			<img src={icon} alt={label} class="size-6 hover:cursor-pointer invert-0 dark:invert" />
		</a>
	{/each}
</div>

<style>
	.navbar {
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
	}
</style>