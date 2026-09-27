<script lang="ts">
	let { children } = $props();
</script>

<main>
	{@render children()}
</main>

<style>
	main {
		max-width: 75ch;
		margin: 0 auto;
		padding: 0 2rem;
		padding-top: 6.9rem;
	}
</style>
