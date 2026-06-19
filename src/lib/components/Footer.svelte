<script>
	import { ArrowRight, MoveLeft, MoveRight } from '@lucide/svelte';
</script>

<footer>
	<div class="webring">
		<a href="https://ring.seggs.lol/redirect?from=kinetictactic&dir=prev"><MoveLeft size={24} /></a>
		<a class="threadlocked" href="https://ring.seggs.lol"
			>thread<span class="highlight">locked</span></a
		>
		<a href="https://ring.seggs.lol/redirect?from=kinetictactic&dir=next"><MoveRight size={24} /></a
		>
	</div>

	<div class="copyright">© {new Date().getFullYear()} Rudrajeet Pal</div>
	<div class="built">
		Built with love and SvelteKit. <a href="https://github.com/KineticTactic/kinetictactic.github.io">view source</a
		>
	</div>
</footer>

<style>
	footer {
		margin-top: 8rem;
		margin-bottom: 2rem;
	}

	.webring {
		display: flex;
		align-items: center;
		gap: 1rem;
		justify-content: center;
		margin-bottom: 2rem;
	}

	.threadlocked, .threadlocked span {
		font-family: var(--serif), serif;
		font-size: 1.2rem;
	}

	footer a,
	a span {
		color: var(--text);
		text-decoration: none;
	}

	footer a:hover,
	.highlight {
		color: var(--text-highlight);
	}

	.webring a:first-child,
	.webring a:last-child {
		width: 24px;
		height: 24px;
	}

	.copyright {
		text-align: center;
	}

	.built {
		text-align: center;
	}

	.built a {
		color: var(--text-highlight);
	}
</style>
