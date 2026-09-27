import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'h0mqb4ir', 
  dataset: 'muafaq_data',
  useCdn: true,
  apiVersion: '2026-09-27',
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);