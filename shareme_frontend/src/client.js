import sanityClient, { SanityClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = SanityClient({
    // obtained from query sanity manage
    projectId: {process.env.REACT_APP_SANITY_PROJECT_ID},
    dataset: 'production',
    apiVersion: '2021-11-16',
    useCdn: true,
    token: {process.env.REACT_APP_SANITY_TOKEN},
})
//FIND IN SANITY DOCUMENTATION
const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);