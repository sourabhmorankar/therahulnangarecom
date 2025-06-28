<script lang="ts">
	import type { SiteSettings } from '$lib/types';

	export let settings: SiteSettings;
</script>

<div class="card">
	<h1 class="name">{settings.name}</h1>
	<h2 class="title">{settings.title}</h2>
	<div class="links">
		{#if settings.resumePDF?.asset?.url}
			<a href={settings.resumePDF.asset.url} class="button" target="_blank" rel="noopener noreferrer"
				>Download Resume</a
			>
		{/if}
		<!-- We will add more links here later -->
	</div>
</div>

<style>
	.card {
		background: linear-gradient(45deg, #1e3a8a, #3b82f6);
		color: white;
		border-radius: 16px;
		padding: 32px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		gap: 12px;
	}
	.name {
		font-size: 2.5rem;
		font-weight: 800;
		margin: 0;
		letter-spacing: -0.5px;
	}
	.title {
		font-size: 1.25rem;
		font-weight: 400;
		margin: 0;
		opacity: 0.9;
	}
	.links {
		margin-top: 24px;
	}
	.button {
		background-color: rgba(255, 255, 255, 0.1);
		color: white;
		text-decoration: none;
		padding: 12px 24px;
		border-radius: 999px;
		font-weight: 600;
		transition: background-color 0.2s ease;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}
	.button:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}
</style>