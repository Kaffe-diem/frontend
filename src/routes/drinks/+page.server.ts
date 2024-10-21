import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const pb = locals.pb;  // TypeScript now knows `pb` is a PocketBase instance

  // Fetch drinks from the PocketBase collection
  const drinks = await pb.collection('drinks').getFullList( { sort: '-created' });

  return {
    drinks: drinks
  };
};