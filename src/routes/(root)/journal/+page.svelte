<script lang="ts">
	import { Input } from '$src/components/ui/input';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>


<h1 class="title">Journal Entry: Session Report</h1>
<form class="flex flex-col md:flex-row">
	<Input/>
	<Input />
	<Input/>
	<Input/>
</form>