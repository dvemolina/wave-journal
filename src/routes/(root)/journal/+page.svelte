<script lang="ts">
	import { Input } from '$src/components/ui/input';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>


<form>
	<Input/>
</form>