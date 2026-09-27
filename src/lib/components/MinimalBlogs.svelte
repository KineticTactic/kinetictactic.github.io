<script lang="ts">
	type BlogModule = {
		metadata: {
			title: string;
			description?: string;
			date?: string;
		};
	};

	const posts = import.meta.glob<BlogModule>('/src/content/blog/*.md', {
		eager: true
	});

	const blogs = Object.entries(posts)
		.map(([path, post]) => {
			const filename = path.split('/').pop()!;
			const slug = filename.replace(/\.md$/, '');

			return {
				slug,
				title: post.metadata.title,
				description: post.metadata.description ?? '',
				date: post.metadata.date ?? ''
			};
		})
		.filter((blog) => blog.date)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		.slice(0, 3);

	const formatDate = (date: string) =>
		new Intl.DateTimeFormat('en', {
			month: 'short',
			day: 'numeric',
			year: 'numeric'
		}).format(new Date(`${date}T00:00:00`));
</script>

<section>
	<div class="heading">
		<h2>recent blogs</h2>

		<a href="/blog" class="view-all">
			view all <span>→</span>
		</a>
	</div>

	<div class="blogs">
		{#each blogs as blog}
			<a class="blog" href={`/blog/${blog.slug}`}>
				<div class="blog-content">
					<h3>{blog.title}</h3>

					{#if blog.description}
						<p>{blog.description}</p>
					{/if}
				</div>

				<div class="meta">
					<span>{formatDate(blog.date)}</span>
					<span class="arrow">↗</span>
				</div>
			</a>
		{/each}
	</div>
</section>

<style>
	section {
		margin-top: 6rem;
	}

	.heading {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1.5rem;
	}

	h2 {
		margin: 0;
		color: var(--text-highlight);
		font-size: 2rem;
		font-weight: 600;
	}

	.view-all {
		color: var(--text);
		font-size: 0.9rem;
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.view-all:hover {
		color: #c98a52;
	}

	.view-all span {
		display: inline-block;
		margin-left: 0.2rem;
		transition: transform 0.2s ease;
	}

	.view-all:hover span {
		transform: translateX(3px);
	}

	.blogs {
		display: flex;
		flex-direction: column;
	}

	.blog {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;

		padding: 1.25rem 0;

		color: inherit;
		text-decoration: none;

		border-top: 1px solid rgba(255, 255, 211, 0.08);

		transition:
			padding-left 0.2s ease,
			border-color 0.2s ease;
	}

	.blog:last-child {
		border-bottom: 1px solid rgba(255, 255, 211, 0.08);
	}

	.blog:hover {
		padding-left: 0.4rem;
		border-color: rgba(201, 138, 82, 0.3);
	}

	.blog-content {
		min-width: 0;
	}

	h3 {
		margin: 0;
		color: var(--text-highlight);
		font-size: 1.05rem;
		font-weight: 500;
		line-height: 1.4;
	}

	.blog p {
		max-width: 650px;
		margin: 0.4rem 0 0;
		color: var(--text);
		font-size: 0.95rem;
		line-height: 1.5;
	}

	.meta {
		display: flex;
		align-items: center;
		flex-shrink: 0;
		gap: 0.75rem;

		color: #8f8d82;
		font-size: 0.8rem;
	}

	.arrow {
		color: #c98a52;
		font-size: 1rem;
		transition: transform 0.2s ease;
	}

	.blog:hover .arrow {
		transform: translate(2px, -2px);
	}

	@media (max-width: 600px) {
		.blog {
			align-items: flex-start;
			flex-direction: column;
			gap: 0.5rem;
		}

		.meta {
			width: 100%;
			justify-content: space-between;
		}
	}
</style>
