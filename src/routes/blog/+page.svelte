<script lang="ts">
	import BlogItem from '$lib/components/BlogItem.svelte';

	type BlogPost = {
		default: unknown;
		metadata: {
			title: string;
			description?: string;
			date?: string;
			tags?: string[];
		};
	};

	const posts = import.meta.glob<BlogPost>('/src/content/blog/*.md', {
		eager: true
	});

	const blogs = Object.entries(posts)
		.map(([path, post]) => {
			const filename = path.split('/').pop()!;
			const slug = filename.replace(/\.md$/, '');

			return {
				slug,
				title: post.metadata.title,
				subtitle: post.metadata.description ?? '',
				tags: post.metadata.tags ?? [],
				date: post.metadata.date ?? ''
			};
		})
		.sort((a, b) => b.date.localeCompare(a.date));
</script>

<svelte:head>
	<title>Blog</title>
	<meta name="description" content="Articles and notes." />
</svelte:head>

<main>
	<h1>Blog</h1>

	<div class="posts">
		{#each blogs as blog}
			<BlogItem
				title={blog.title}
				subtitle={blog.subtitle}
				tags={blog.tags}
				href={`/blog/${blog.slug}`}
			/>
		{/each}
	</div>
</main>

<style>
	main {
		max-width: 75ch;
		margin: 0 auto;
		padding: 0 2rem;
		padding-top: 6.9rem;
		font-size: 1.1rem;
	}

	h1 {
		font-size: 3rem;
		margin-bottom: 0.5rem;
	}
</style>
