enum Collection {
  users = 'users',
  tasks = 'tasks',
}

export const COLLECTION = {
  [Collection.users]: 'users',
  [Collection.tasks]: 'tasks',
} as const;

export type CollectionsType = (typeof COLLECTION)[keyof typeof COLLECTION];
