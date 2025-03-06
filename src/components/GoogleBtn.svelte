<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<a href="/google">
	<button class="button btn">
		<img src="/svg/google.svg" alt="Google" class="size-5" />
		{@render children?.()}
	</button>
</a>

<style>
	.button {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding: 0.9rem 1.7rem;
		border: 0.5px solid var(--border-active);
		font-size: 1rem;
		font-weight: 600;
		transition: all 0.1s ease-in-out;
		border-radius: 12px;
		background-color: rgba(0, 0, 0, 0.629);
		color: white;
	}
	
	.button:hover {
		background-color: rgb(255, 255, 255);
		cursor: pointer;
		color: var(--text);
	}
</style>
