<script lang="ts">
	import type { Experience } from '$lib/types';
	import { urlFor } from '$lib/sanityClient';

	export let experience: Experience;

	function formatDate(dateString?: string): string {
		if (!dateString) return 'Present';
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
	}
</script>

<div class="card">
	<div class="header">
		{#if experience.companyLogo}
			<img
				class="logo"
				src={urlFor(experience.companyLogo).width(100).format('webp').url()}
				alt="{experience.company} Logo"
			/>
		{/if}
		<div class="title-group">
			<h3 class="role">{experience.role}</h3>
			<p class="company">{experience.company}</p>
		</div>
	</div>
	<p class="date-range">
		{formatDate(experience.startDate)} – {formatDate(experience.endDate)}
	</p>
	<ul class="summary">
		{#each experience.summary as point}
			<li>{point}</li>
		{/each}
	</ul>
</div>

<style>
	.card {
		background-color: white;
		border-radius: 12px;
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
		padding: 24px;
		display: flex;
		flex-direction: column;
		gap: 16px;
		border: 1px solid #e5e7eb;
		color: #374151;
	}
	.header {
		display: flex;
		align-items: center;
		gap: 16px;
	}
	.logo {
		width: 50px;
		height: 50px;
		border-radius: 8px;
		object-fit: contain;
		flex-shrink: 0;
	}
	.title-group {
		display: flex;
		flex-direction: column;
	}
	.role {
		font-size: 1.125rem;
		font-weight: 600;
		color: #111827;
		margin: 0;
	}
	.company {
		font-size: 1rem;
		color: #4b5563;
		margin: 0;
	}
	.date-range {
		font-size: 0.875rem;
		font-weight: 500;
		color: #6b7280;
		margin: 0;
	}
	.summary {
		list-style-position: outside;
		padding-left: 20px;
		margin: 0;
		font-size: 0.95rem;
		line-height: 1.6;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	li::marker {
		color: #9ca3af;
	}
</style>