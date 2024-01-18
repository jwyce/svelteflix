import { views } from '$lib/views';
import type { PageLoad } from './$types';
import * as api from '$lib/api';
import type { MovieList } from '$lib/types';

export const load: PageLoad = async ({ params, url, fetch }) => {
	const view = views[params.view];
	const page = url.searchParams.get('page') ?? '1';

	const data = (await api.get(fetch, view.endpoint, { page })) as MovieList;

	return {
		...view,
		view: params.view,
		movies: data.results,
		next_page: data.page < data.total_pages ? data.page + 1 : null,
		infinite: true
	};
};
