<script lang="ts">
	import appleTouchIcon from '$lib/assets/apple-touch-icon.png';
	import favicon32 from '$lib/assets/favicon-32x32.png';
	import favicon16 from '$lib/assets/favicon-16x16.png';
	import manifest from '$lib/assets/site.webmanifest';

	import '../global.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Rudrajeet Pal | KineticTactic</title>

	<meta
		name="description"
		content="Maths and Computing student at IIT Guwahati building simulations, developer tools, and web platforms."
	/>

	<meta
		name="keywords"
		content="Rudrajeet Pal,KineticTactic,IIT Guwahati,Software developer,Graphics Programming,Web Development,Portfolio"
	/>

	<meta name="author" content="Rudrajeet Pal" />

	<meta property="og:title" content="Rudrajeet Pal | KineticTactic" />
	<meta
		property="og:description"
		content="Building simulations, developer tools, and web platforms."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://kinetictactic.github.io/og.png" />
	<meta property="og:url" content="https://kinetictacticgithub.io" />

	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Person",
			"name": "Rudrajeet Pal",
			"url": "https://kinetictactic.github.io",
			"sameAs": ["https://github.com/KineticTactic", "https://linkedin.com/in/rudrajeet-pal"]
		}
	</script>

	<link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
	<link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
	<link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
	<link rel="manifest" href={manifest} />
</svelte:head>

{@render children()}
