import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://leetcode-clone-indol.vercel.app/");
  await expect(page).toHaveTitle("LeetCode Clone");
});

test("auth available", async ({ page }) => {
  await page.goto("https://leetcode-clone-indol.vercel.app/");
  await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(
    page.getByRole("button", { name: "Create an Account" }),
  ).toBeVisible();
});
