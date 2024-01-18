<script lang="ts">
	import type { MovieDetails } from '$lib/types';
	import { media } from '$lib/api';

	export let movie: MovieDetails;

	$: images = movie.images;
	$: backdrop = images.backdrops.find((image) => !image.iso_639_1) || images.backdrops[0];
	$: logo = images.logos.find((image) => image.iso_639_1 === 'en') || images.logos[0];
</script>

<a href="/movies/{movie.id}">
	<img
		class="backdrop"
		alt={movie.title}
		src={media(backdrop.file_path, 1280)}
		style="aspect-ratio: {backdrop.aspect_ratio};"
	/>
	<img
		class="logo"
		alt={movie.title}
		src={media(logo.file_path, 1280)}
		style="aspect-ratio: {logo.aspect_ratio};"
	/>
</a>

<style>
a {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.backdrop {
		width: 100%;
	}

	.logo {
		position: absolute;
		width: 30%;
		height: 100%;
		left: 1rem;
		bottom: 0;
		object-fit: contain;
		object-position: 50% 75%;
		filter: drop-shadow(0 0 3rem black) drop-shadow(0 0 0.5rem black);
	}
</style>
