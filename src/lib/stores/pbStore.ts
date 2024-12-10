import pb, { Collections, type CollectionResponses } from "$lib/pocketbase";
import { writable } from "svelte/store";

// ref: https://github.com/pocketbase/js-sdk?tab=readme-ov-file#nodejs-via-npm
import eventsource from "eventsource";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).EventSource = eventsource;

export default function createPbStore<T extends Collections>(
  collection: T,
  fetchOptions: Record<string, string> = {},
  subscribeOptions: Record<string, string> = fetchOptions
) {
  const { subscribe, set, update } = writable<CollectionResponses[T][]>([]);

  (async () => {
    const initialData = await pb.collection(collection).getFullList(fetchOptions);
    set(initialData as CollectionResponses[T][]);

    pb.collection(collection).subscribe(
      "*",
      (event: { record: CollectionResponses[T]; action: string }) => {
        update((state) => {
          const itemIndex = state.findIndex((item) => item.id == event.record.id);

          switch (event.action) {
            case "create":
              state.push(event.record);
              break;
            case "update":
              if (itemIndex !== -1) state[itemIndex] = event.record;
              break;
            case "delete":
              if (itemIndex !== -1) state.splice(itemIndex, 1);
              break;
          }

          return state;
        });
      },
      subscribeOptions
    );
  })();

  return subscribe;
}
