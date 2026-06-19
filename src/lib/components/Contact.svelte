<script>
	import GitHub from '$lib/assets/github.svelte';
	import LinkedIn from '$lib/assets/linkedin.svelte';
	import Discord from '$lib/assets/discord.svelte';
	import Instagram from '$lib/assets/instagram.svelte';
	import X from '$lib/assets/x.svelte';
</script>

<section>
	<h2>reach out to me :p</h2>

	<div class="container">
		<div class="icons">
			<a href="https://github.com/KineticTactic"><GitHub /></a>
			<a href="https://www.linkedin.com/in/rudrajeet-pal/"><LinkedIn /></a>
			<a href="https://discord.gg/9P9afNdt"><Discord /></a>
			<a href="https://www.instagram.com/tactickinetic/"><Instagram /></a>
			<a href="https://x.com/TacticKinetic"><X /></a>
		</div>

		<div class="mail">
			or mail me at <a href="mailto:rudrajeetpal64@gmail.com">rudrajeetpal64@gmail.com</a>
		</div>
	</div>
</section>

<style>
	section {
		margin-top: 6rem;
	}

	.container {
		display: flex;
		align-items: center;
		gap: 2rem;
		flex-wrap: wrap;
	}

	.icons {
		display: inline-flex;
		flex-direction: row;
		gap: 1.2rem;
		font-size: 2rem;
	}

	.icons a {
		text-decoration: none;
		color: var(--text);
		width: 1em;
		height: 1em;
	}

	.icons a:hover {
		color: var(--text-highlight);
	}

	.mail {
		display: inline-block;
		font-size: 1.2rem;
	}

	.mail a {
		text-decoration: none;
		color: var(--text-highlight);
	}

</style>
