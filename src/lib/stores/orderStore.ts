import createPbStore from "$stores/pbStore";
import pb, { Collections, OrdersStateOptions, type RecordIdString } from "$lib/pocketbase";

const today = new Date().toISOString().split("T")[0];

const baseOptions = {
  expand: "drinks,drinks.drink",
  filter: `created >= "${today}"`
};

export default {
  subscribe: createPbStore(Collections.Orders, baseOptions),

  create: async (drinkIds: RecordIdString[]) => {
    const getOrderDrinkIds = async (): Promise<RecordIdString[]> => {
      return await Promise.all(
        drinkIds.map(async (drinkId) => {
          const response = await pb.collection(Collections.OrderDrink).create({ drink: drinkId });
          return response.id;
        })
      );
    };

    await pb.collection(Collections.Orders).create({
      customer: pb.authStore.model?.id,
      drinks: await getOrderDrinkIds(),
      state: OrdersStateOptions.received,
      payment_fulfilled: false
    });
  },

  updateState: (id: RecordIdString, state: OrdersStateOptions) => {
    pb.collection(Collections.Orders).update(id, { state });
  }
};
export const userOrders = {
  subscribe: createPbStore(Collections.Orders, {
    ...baseOptions,
    filter: `customer = '${pb.authStore.model?.id}'`
  })
};
