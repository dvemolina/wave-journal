<script lang="ts">
	import Box from '$src/components/Box.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<Box heading="Personal Details">
<div class="box-content">
	<div class="flex w-full flex-row gap-4">
		<img
		src={data.userData ? data.userData.profileImage : 'favicon.png'}
		alt="Profile"
		class="max-w-25 overflow-hidden rounded-full border border-neutral-200 object-cover object-center shadow-md md:self-auto"
		/>
		<div class="flex flex-col">
			<h1 class="title">{data.userData?.name} {data.userData?.surname?.charAt(0)}</h1>
			<p>@{data.userData?.username}</p>
		</div>
	</div>
</Box>


