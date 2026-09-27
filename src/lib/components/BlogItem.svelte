<script lang="ts">
	type Props = {
		title: string;
		subtitle?: string;
		tags?: string[];
		href: string;
	};

	let { title, subtitle, tags = [], href }: Props = $props();
</script>

<a class="blog-item" {href}>
	<div class="content">
		<h2>{title}</h2>

		{#if subtitle}
			<p>{subtitle}</p>
		{/if}

		{#if tags.length > 0}
			<div class="tags">
				{#each tags as tag}
					<span>{tag}</span>
				{/each}
			</div>
		{/if}
	</div>

	<span class="arrow">→</span>
</a>

<style>
	.blog-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;

		padding: 1.25rem 0;

		text-decoration: none;
		color: inherit;

		border-bottom: 1px solid rgba(255, 255, 211, 0.08);

		transition:
			transform 0.2s ease,
			border-color 0.2s ease;
	}

	.blog-item:hover {
		transform: translateX(4px);
		border-color: rgba(201, 138, 82, 0.4);
	}

	.content {
		min-width: 0;
	}

	h2 {
		margin: 0;
		color: var(--text-highlight);
		font-size: 1.4rem;
		font-weight: 600;
	}

	p {
		margin: 0.4rem 0 0;
		color: var(--text);
		line-height: 1.5;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		margin-top: 0.75rem;
	}

	.tags span {
		padding: 0.2rem 0.55rem;

		border: 1px solid rgba(201, 138, 82, 0.25);
		border-radius: 999px;

		color: #d8a36a;
		font-size: 0.75rem;
	}

	.arrow {
		flex-shrink: 0;
		color: #c98a52;
		font-size: 1.25rem;
		transition: transform 0.2s ease;
	}

	.blog-item:hover .arrow {
		transform: translateX(4px);
	}
</style>
