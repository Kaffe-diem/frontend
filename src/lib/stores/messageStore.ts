import createPbStore from "$stores/pbStore";
import pb from "$lib/pocketbase";
import { Message, ActiveMessage } from "$lib/types";
import { writable } from "svelte/store";

import eventsource from "eventsource";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).EventSource = eventsource;

const mapToMessage = (data: { id: string; title: string; subtext: string }): Message =>
  new Message({
    id: data.id,
    title: data.title,
    subtext: data.subtext
  });

// FIXME: again, pocketbase typing
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapToActiveMessage = (data: {
  id: string;
  message: any;
  isVisible: boolean;
}): ActiveMessage =>
  new ActiveMessage({
    id: data.id,
    message: mapToMessage(data.message),
    visible: data.isVisible
  });

export const messages = {
  subscribe: createPbStore<Message>("displayMessages", mapToMessage),
  create: async (title: string, subtext: string) => {
    await pb.collection("displayMessages").create({
      title,
      subtext
    });
  },
  update: async (message: Message) => {
    await pb.collection("displayMessages").update(message.id, {
      title: message.title,
      subtext: message.subtext
    });
  },
  delete: async (id: string) => {
    await pb.collection("displayMessages").delete(id);
  }
};

function createActiveMessageStore() {
  // Initialize with dummy non-visible message
  const { subscribe, set, update } = writable<ActiveMessage>(
    new ActiveMessage({
      id: "",
      visible: false,
      message: new Message({
        id: "",
        title: "",
        subtext: ""
      })
    })
  );

  (async () => {
    const initialActiveMessages = await pb.collection("activeMessage").getFullList();
    // Only use the first record. Assumes that PB already has this record.
    const initialActiveMessage = initialActiveMessages[0];
    const initialMessages = await pb.collection("displayMessages").getFullList();
    const initialMessage = initialMessages.filter((m) => m.id == initialActiveMessage.message)[0];

    // @ts-expect-error Typing again
    const initialData = mapToActiveMessage({
      ...initialActiveMessage,
      message: initialMessage
    });

    set(initialData);

    pb.collection("activeMessage").subscribe("*", (event) => {
      update((state) => {
        // @ts-expect-error Typing again
        return mapToActiveMessage({
          ...event.record,
          message: state.message
        });
      });
    });

    pb.collection("displayMessages").subscribe("*", (event) => {
      update((state) => {
        if (event.record.id == state.message.id) {
          // @ts-expect-error Typing again
          state.message = mapToMessage(event.record);
        }
        return state;
      });
    });
  })();

  return subscribe;
}

export const activeMessage = {
  subscribe: createActiveMessageStore(),
  update: async (message: ActiveMessage) => {
    await pb.collection("activeMessage").update(message.id, {
      message: message.message.id,
      isVisible: message.visible
    });
  }
};
