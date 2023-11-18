const request = require("supertest");
const app = require("../../app");

describe("Muslim Quran Info Test", () => {
  test("It validates get parahs", async () => {
    const res = await request(app).get("/api/get-parahs");
    expect(res.body.success).toBe(true);
  });
});
