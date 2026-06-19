<script>
	import ExternalLink from '@lucide/svelte/icons/external-link';

	const projects = [
		{
			name: 'Reflecta',
			description:
				'A real-time 2D optics sandbox for experimenting with light rays, mirrors, and lenses.',
			library: {
				name: 'polyly',
				url: 'https://github.com/KineticTactic/polyly'
			},
			technologies: ['TypeScript', 'WebGL', 'Simulation'],
			github: 'https://github.com/KineticTactic/Reflecta'
		},
		{
			name: 'revr',
			description: 'A lightweight and ergonomic framework for building HTTP servers in C.',
			technologies: ['C', 'Networks', 'Backend'],
			github: 'https://github.com/KineticTactic/revr' // update if different
		},
		{
			name: 'orbits',
			description: 'An interactive N-body gravity simulator for exploring orbital mechanics.',
			technologies: ['C++', 'raylib', 'Emscripten'],
			github: 'https://github.com/KineticTactic/orbits'
		}
	];
</script>

<section id="projects">
	<h2>some cool projects :)</h2>

	<div class="grid">
		{#each projects as project}
			<div class="name">{project.name}:</div>
			<div class="info">
				<div class="desc">
					{project.description}
					{#if project.library}
						Built my own rendering library
						<a href={project.library.url}>{project.library.name}</a>
						for this.
					{/if}
				</div>
				<div class="tech">{project.technologies.join(', ')}</div>
				<a class="github" href={project.github}>view on github<ExternalLink size={20} /></a>
			</div>
		{/each}
	</div>
</section>

<style>
	section {
		margin-top: 6rem;
	}

	.grid {
		display: grid;
		grid-template-columns: min-content 1fr;
		gap: 2rem 1rem;
	}

	.name {
		font-family: var(--serif), serif;
		font-size: 1.5rem;
		color: var(--text-highlight);
		text-align: right;
	}

	.desc {
		font-size: 1.2rem;
		margin-top: 0.3rem;
		margin-bottom: 0.5rem;
	}

	.desc a {
		text-decoration: none;
		color: var(--text-highlight);
	}

	.tech {
		font-family: var(--pixel), sans-serif;
		font-size: 1.4rem;
		display: inline;
		margin-right: 1rem;
	}

	.github {
		color: var(--text-highlight);
		text-decoration: none;
		font-size: 1.2rem;

		display: inline-flex;
		gap: 0.5rem;
		align-items: center;
	}
</style>
