<script lang="ts">
	import { page } from '$app/state';
	import { error } from '@sveltejs/kit';
	import type { Component } from 'svelte';

	type BlogPost = {
		default: Component;
		metadata: {
			title: string;
			description?: string;
			date: string;
			tags?: string[];
		};
	};

	const posts = import.meta.glob<BlogPost>('/src/content/blog/*.md', {
		eager: true
	});

	const slug = page.params.slug;

	const post = posts[`/src/content/blog/${slug}.md`];

	if (!post) {
		error(404, `Post "${slug}" not found`);
	}

	const Post = post.default;
</script>

<svelte:head>
	<title>{post.metadata.title}</title>

	{#if post.metadata.description}
		<meta name="description" content={post.metadata.description} />
	{/if}
</svelte:head>

<article>
	<header>
		<p>{post.metadata.date}</p>
	</header>

	<Post />
</article>

<style>
	:root {
		--code-bg: #16161e;
		--border: #2a2a35;
	}
	article {
		font-size: 1.2rem;
		line-height: 1.69rem;
	}
	article :global(h1) {
		font-size: 2.5rem;
	}
	article :global(h2) {
		font-size: 1.8rem;
		margin-top: 3rem;
	}
	article :global(pre) {
		border-radius: 10px;
		padding: 0.7rem 1.5rem;
	}
	article :global(code),
	article :global(pre code),
	article :global(pre code span) {
		font-family: 'Inconsolata', serif !important;
	}

	article :global(em) {
		color: var(--text-highlight);
		background: linear-gradient(90deg, #d6a15c, #c97b3a);

		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		color: transparent;
	}
	article :global(strong) {
		color: var(--text-highlight);
		font-weight: 800;
		background: linear-gradient(90deg, #ffffd3, #e8d6a0);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		color: transparent;
	}

	article :global(a) {
		text-decoration: none;
		color: var(--text-highlight);
	}

	article :global(hr) {
		margin: 3rem 0;
		border: 0;
		border-top: 1px solid rgba(255, 255, 211, 0.12);
	}

	/* Unordered lists */
	article :global(ul) {
		margin: 1.5rem 0;
		padding-left: 1.5rem;
		list-style: none;
	}

	article :global(ul > li) {
		position: relative;
		margin: 0.25rem 0;
		padding-left: 0.75rem;
		color: var(--text);
		line-height: 1.7;
	}

	article :global(ul > li::before) {
		content: '';
		position: absolute;
		left: -0.75rem;
		top: 0.72em;

		width: 8px;
		height: 8px;

		border-radius: 50%;
		background: #c98a52;
	}

	article :global(img) {
		width: 100%;
	}
</style>
