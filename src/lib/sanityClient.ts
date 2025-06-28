import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { env } from '$env/dynamic/private';

const sanityConfig = {
	projectId: env.SANITY_PROJECT_ID,
	dataset: env.SANITY_DATASET || 'production',
	apiVersion: '2024-03-11',
	useCdn: true
};

export const client = createClient(sanityConfig);

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
	return builder.image(source);
}