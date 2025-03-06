<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section>
	<div class="wrap">
		<h1 class="title">Profile Details</h1>
		<div class="box">
			<img
				src="favicon.png"
				alt="Profile"
				class="max-w-40 self-center overflow-hidden rounded-full border border-neutral-200 object-cover object-center shadow-md md:self-auto"
			/>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque ducimus alias autem
				recusandae? Magni, culpa vero nobis odio animi ipsum nihil illum consequuntur necessitatibus
				eaque odit aliquid temporibus officia omnis!
			</p>
		</div>
	</div>
</section>
