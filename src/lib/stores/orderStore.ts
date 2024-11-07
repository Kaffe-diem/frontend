import { PUBLIC_PB_HOST } from "$env/static/public";
import { writable } from "svelte/store";
import pocketbase from "pocketbase";
import { Order, State } from "$lib/types";

// ref: https://github.com/pocketbase/js-sdk?tab=readme-ov-file#nodejs-via-npm
import eventsource from "eventsource";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).EventSource = eventsource;

const pb = new pocketbase(PUBLIC_PB_HOST);

export const orders = writable<Order[]>([]);

const mapToOrder = (data: unknown): Order => {
  return new Order({
    id: data.id,
    state: data.state,
    collectionId: data.collectionId,
    collectionName: data.collectionName,
    created: data.created,
    customer: data.customer,
    drinks: data.drinks,
    payment_fulfilled: data.payment_fulfilled,
    updated: data.updated
  });
};

const init = async () => {
  const initialOrders = await pb.collection("orders").getFullList();
  orders.set(initialOrders.map(mapToOrder));

  pb.collection("orders").subscribe("*", (e) => {
    orders.update((state) => {
      console.log({
        message: "received event on orders subscription",
        event: e,
        currentState: state
      });

      const orderIndex = state.findIndex((order) => order.id === e.record.id);

      const order = mapToOrder(e.record);

      switch (e.action) {
        case "create":
          state.push(order);
          break;
        case "update":
          state[orderIndex] = order;
          break;
        case "delete":
          state.splice(orderIndex, 1);
          break;
      }

      return state;
    });
  });
};

init();
