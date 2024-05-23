// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;
// src/routes/documents/+page.ts

import type { PageLoad } from './$types';
import axios from 'axios';

export const load: PageLoad = async () => {
	const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337/api';

	try {
		const response = await axios.get(`${API_URL}/documents`);

		if (response.status !== 200) {
			throw new Error('Failed to fetch documents');
		}

		console.log({
			documents: response.data.data.attributes
		});

		return {
			documents: response.data.data
		};
	} catch (error) {
		return {
			status: 500,
			error: new Error('Could not load documents')
		};
	}
};
