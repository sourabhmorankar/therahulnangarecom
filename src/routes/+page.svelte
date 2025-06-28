<script lang="ts">
	import type { PageData } from './$types';
	import { unispace } from '$lib/stores/unispace';
	import { LAYOUT } from '$lib/layout';
	import type { Experience } from '$lib/types';

	import Grid from '$lib/components/grid/Grid.svelte';
	import HeroCard from '$lib/components/cards/HeroCard.svelte';
	import ExperienceCard from '$lib/components/cards/ExperienceCard.svelte';

	export let data: PageData;

	// Helper to find specific experience.
	// We explicitly type `exp` to fix the "implicitly has an 'any' type" error.
	function findExperience(company: string): Experience | undefined {
		// The `data.experiences` type will now be correctly inferred from the server load function.
		return data.experiences.find((exp: Experience) => exp.company.toLowerCase().includes(company));
	}

	// Define constants here, not in the template
	const nice = findExperience('nice');
	const varian = findExperience('varian');
	const fis = findExperience('fis');
	const tata = findExperience('tata');
</script>

<Grid>
	<div
		class="grid-container"
		style="--unispace: {$unispace}px; left: 50%; top: 50%; position: absolute;"
	>
		<!-- Hero Card -->
		{#if data.settings}
			<div
				class="card-wrapper"
				style="
                    left: {LAYOUT.HERO.x * $unispace}px;
                    top: {LAYOUT.HERO.y * $unispace}px;
                    width: {LAYOUT.HERO.w * $unispace}px;
                    height: {LAYOUT.HERO.h * $unispace}px;
                "
			>
				<HeroCard settings={data.settings} />
			</div>
		{/if}

		<!-- Experience Cards -->
		{#if nice}
			<div
				class="card-wrapper"
				style="
                    left: {LAYOUT.NICE_CXONE.x * $unispace}px;
                    top: {LAYOUT.NICE_CXONE.y * $unispace}px;
                    width: {LAYOUT.NICE_CXONE.w * $unispace}px;
                    height: {LAYOUT.NICE_CXONE.h * $unispace}px;
                "
			>
				<ExperienceCard experience={nice} />
			</div>
		{/if}

		{#if varian}
			<div
				class="card-wrapper"
				style="
                    left: {LAYOUT.VARIAN.x * $unispace}px;
                    top: {LAYOUT.VARIAN.y * $unispace}px;
                    width: {LAYOUT.VARIAN.w * $unispace}px;
                    height: {LAYOUT.VARIAN.h * $unispace}px;
                "
			>
				<ExperienceCard experience={varian} />
			</div>
		{/if}

		{#if fis}
			<div
				class="card-wrapper"
				style="
                    left: {LAYOUT.FIS.x * $unispace}px;
                    top: {LAYOUT.FIS.y * $unispace}px;
                    width: {LAYOUT.FIS.w * $unispace}px;
                    height: {LAYOUT.FIS.h * $unispace}px;
                "
			>
				<ExperienceCard experience={fis} />
			</div>
		{/if}

		{#if tata}
			<div
				class="card-wrapper"
				style="
                    left: {LAYOUT.TATA.x * $unispace}px;
                    top: {LAYOUT.TATA.y * $unispace}px;
                    width: {LAYOUT.TATA.w * $unispace}px;
                    height: {LAYOUT.TATA.h * $unispace}px;
                "
			>
				<ExperienceCard experience={tata} />
			</div>
		{/if}
	</div>
</Grid>

<style>
	.grid-container {
		/* This is the 0,0 origin of our grid */
		position: absolute;
		left: 50%;
		top: 50%;
	}
	.card-wrapper {
		position: absolute;
		transform: translate(-50%, -50%); /* Centers the card on its x,y coords */
		padding: 10px; /* Provides spacing between cards */
		box-sizing: border-box;
		transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
	}
	/* Make the card component fill its wrapper */
	:global(.card-wrapper > *) {
		width: 100%;
		height: 100%;
	}
</style>