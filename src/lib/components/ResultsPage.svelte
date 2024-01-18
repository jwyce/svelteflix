<script lang="ts">
	import type { MovieListResult } from '$lib/types';
	import { media } from '$lib/api';
	import { createEventDispatcher, onMount } from 'svelte';

	export let movies: MovieListResult[];
	export let next: string | null;

	const dispatch = createEventDispatcher<{ scroll_end: void }>();

	let viewport: HTMLDivElement;
	let results: HTMLDivElement;
	let item_width: number;
	let item_height: number;
	let num_columns = 4;

	let a = 0;
	let b = movies.length;
	let padding_top = 0;
	let padding_bottom = 0;

	function handle_resize() {
		const first = results.firstChild! as HTMLAnchorElement;

		item_width = first.offsetWidth;
		item_height = first.offsetHeight;

		num_columns = 4;

		handle_scroll();
	}

	function handle_scroll() {
		const { scrollHeight, scrollTop, clientHeight } = viewport;

		const remaining = scrollHeight - (scrollTop + clientHeight);
		if (remaining < 400) {
			dispatch('scroll_end');
		}

		a = Math.floor(scrollTop / item_height) * num_columns;
		b = Math.ceil((scrollTop + clientHeight) / item_height) * num_columns;

		padding_top = Math.floor(a / num_columns) * item_height;
		padding_bottom = Math.floor((movies.length - b) / num_columns) * item_height;
	}

	onMount(handle_resize);
</script>

<svelte:window on:resize={handle_resize} />

<div bind:this={viewport} class="viewport" on:scroll={handle_scroll}>
	<div
		bind:this={results}
		class="results"
		style:padding-top="{padding_top}px"
		style:padding-bottom="{padding_bottom}px"
	>
		{#each movies.slice(a, b) as movie}
			<a href="/movies/{movie.id}">
				<img alt={movie.title} src={media(movie.poster_path, 500)} />
			</a>
		{/each}
	</div>

	{#if next}
		<a href={next}>next page</a>
	{/if}
</div>

<style>
	.viewport {
		height: 0;
		flex: 1;
		overflow-y: auto;
	}

	.results {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		width: 100%;
	}

	a {
		width: 100%;
		aspect-ratio: 2/3;
		padding: 0.5rem;
	}

	img {
		width: 100%;
	}

	.viewport::-webkit-scrollbar {
		display: none;
	}
</style>
