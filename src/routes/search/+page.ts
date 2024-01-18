import type { PageLoad } from '../$types';
import * as api from '$lib/api';
import type { MovieList } from '$lib/types';

export const load: PageLoad = async ({ url, fetch }) => {
	const query = url.searchParams.get('query');

	if (!query) {
		return {
			query,
			movies: []
		};
	}

	const data = (await api.get(fetch, 'search/movie', { query })) as MovieList;

	return {
		query,
		movies: data.results
	};
};
