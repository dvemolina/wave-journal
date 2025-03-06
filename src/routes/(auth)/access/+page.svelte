<script lang="ts">
	import { page } from '$app/stores';
	import GoogleBtn from '$src/components/GoogleBtn.svelte';

	let redirectMessage: string = $derived($page.url.searchParams.get('redirectMessage') ?? '');
</script>

<div class="flex h-full flex-col items-center justify-center gap-4">
	<h1 class="title text-center">{redirectMessage}</h1>
	<GoogleBtn>Access With Google Account</GoogleBtn>
</div>
