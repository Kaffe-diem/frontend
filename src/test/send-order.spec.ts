import { test, expect } from "@playwright/test";

test("test", async ({ page, browserName }) => {
  if (browserName === "webkit") {
    test.skip();
  }

  const [username, password] = process.env.PB_ADMIN_BASIC!.split(":");
  page.on("dialog", async (dialog) => {
    if (dialog.type() === "prompt") {
      if (dialog.message().includes("Enter your username:")) {
        await dialog.accept(username);
      } else if (dialog.message().includes("Enter your password:")) {
        await dialog.accept(password);
      } else {
        await dialog.dismiss();
      }
    }
  });

  // log in
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.getByRole("button", { name: "Logg inn", exact: true }).click({
    button: "right"
  });

  await page.getByRole("link", { name: "Admin" }).click();
  await page.getByRole("link", { name: "Bestillingsdisk" }).click();

  // add mocca
  await page.getByText("Mocca 10,-").click();
  await page.getByRole("button", { name: "+" }).click();
  await expect(page.getByRole("cell", { name: "Mocca" })).toBeVisible();
  await expect(page.locator("tfoot")).toContainText("10,-");

  // add hot chocolate
  await page.getByText("Varm sjokolade").click();
  await page.getByRole("button", { name: "+" }).click();
  await expect(page.getByRole("cell", { name: "Varm sjokolade" })).toBeVisible();
  await expect(page.locator("tfoot")).toContainText("20,-");

  // finish order
  await page.getByRole("button", { name: "Ferdig" }).click();
  await expect(page.getByRole("cell", { name: "Ingenting" })).toBeVisible();

  // logout
  await page.getByText("Tilbake").click();
  await page.getByRole("button", { name: "Logg ut" }).click();
});
