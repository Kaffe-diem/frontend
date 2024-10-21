import { describe, expect, test } from "vitest";
import { pb, OrderService } from "$lib/pocketbase/pb.service";
import type { OrdersResponse } from "$lib/pocketbase/pb.d";
import type { Writable } from "svelte/store";


describe("Pocketbase", () => {
  test("should be authenticated", () => {
    expect(pb.authStore.model).toBeDefined();
    expect(pb.authStore.model?.email).toBe(process.env.PUBLIC_PB_ADMIN_EMAIL);
    expect(pb.authStore.model?.username).toBe(process.env.PUBLIC_PB_ADMIN_USERNAME);
  });

  test("should be able to list orders", () => {
    expect(pb.collection("orders").getFullList()).resolves.toBeDefined();
  });

  test("should be able to list drinks", () => {
    expect(pb.collection("drinks").getFullList()).resolves.toBeDefined();
  });

  test("should be able to add an order", () => {
    expect(OrderService.createOrder()).resolves.toBeDefined();
  });

  describe("integration, order", () => {
    let orders: Writable<OrdersResponse[]>;

    let keptOrderId: string | null;
    test("should populate orders when listening for orders", async () => {
      orders = await OrderService.listenForOrders();
      expect(orders).toBeDefined();
    });

    test("should be able to add an order", async () => {
      const order = await OrderService.createOrder();
      keptOrderId = order.id;
      expect(order).toBeDefined();
    });

    test("should be able to update an order", async () => {
      throw new Error("NOT IMPLEMENTED");
    });

    test("should be able to delete an order", async () => {
      const res = await pb.collection("orders").delete(keptOrderId as string);
      await expect(res).toBeDefined()
      keptOrderId = null;
    });
  });
});
