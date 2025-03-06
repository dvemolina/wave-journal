<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section>
	<div class="wrap">
		<div class="box-heading">
			<div class="flex flex-row">
				<!--Add Icon Here-->				
				<h1 class="title">Profile Details</h1>
			</div>
		</div>
		<div class="box-content">
			<div class="flex flex-col items-center gap-4 md:flex-row">
				<img
					src={data.userData ? data.userData.profileImage : 'favicon.png'}
					alt="Profile"
					class="max-w-25 self-center overflow-hidden rounded-full border border-neutral-200 object-cover object-center shadow-md md:self-auto"
				/>
				<div class="flex flex-col">
					<h1 class="title">{data.userData?.name} {data.userData?.surname?.charAt(0)}</h1>
					<p>@{data.userData?.username}</p>
				</div>
			</div>
		</div>
	</div>
</section>
