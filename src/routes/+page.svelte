<script lang="ts">
	import Box from '$src/components/Box.svelte';
	import GoogleBtn from '$src/components/GoogleBtn.svelte';

	let { data } = $props();
	const user = data.user;
	const session = data.session;
</script>

{#if !user || !session}
	<div class="mb-8 flex flex-col items-center justify-center gap-2">
		<img src="favicon.png" alt="Wave Journal" class=" self-center" />
		<div class="headings mb-4">
			<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">The Wave Journal</h1>
			<h2 class="subtitle text-center">Create your own Forecast Model</h2>
		</div>
		<GoogleBtn>Access with Google Account</GoogleBtn>
	</div>
	<div class="max-w-3xl px-4">
		<p class="text-justify hyphens-auto">
			Keep track of the surf conditions at your favorite local spots. Wave Journal allows you to
			train your own hyper-local, on-site data surf forecast model. Merge your model and reports
			data with your friend's to increase forecast accuracy even more. Document and add forecasts
			for your local secrets spots without fear of revealing them and only share the data with
			whoever you want in your circle. Review past conditions that you encountered that epic day to
			match with actual forecast. The real know before you go
		</p>
	</div>
{:else if user}
	<Box heading="The Wave Journal">	
		<h2 class="subtitle">Hello {user.username}!</h2>
	</Box>
	
{/if}
