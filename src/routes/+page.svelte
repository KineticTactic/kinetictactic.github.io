<script>
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<main>
	<Hero />
	<About />
	<Projects />
	<Contact />
	<Footer />
</main>

<style>
	main {
		max-width: 75ch;
		margin: 0 auto;
		padding: 0 2rem;
		padding-top: 6.9rem;
	}
</style>
