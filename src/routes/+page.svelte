<script lang="ts">
	import Carousel from '$lib/components/Carousel.svelte';
	import { views } from '$lib/views';
	import Hero from './Hero.svelte';

	export let data;
</script>

<div class="column">
	<h1>Top trending movies</h1>

	<Hero movie={data.featured} />
</div>

<Carousel title={views.trending.title} href="movies/trending" movies={data.trending.results} />
<Carousel
	title={views.now_playing.title}
	href="movies/now_playing"
	movies={data.now_playing.results}
/>
<Carousel title={views.upcoming.title} href="movies/upcoming" movies={data.upcoming.results} />
