const request = require("supertest");
const app = require("../../app");
const avatar = require("../../controllers/utils/constants");
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJub29yRmF0aW1hIiwiaWF0IjoxNjYxNzAzNDE3LCJleHAiOjE2NjIzMDgyMTd9.vPk1KN8vfaPxQy34LytJfxL8a9Z9uDDOgG1W8TYFVTk";

describe("Muslim User Notifications Test", () => {
  //success is false, beacuse no any notifications exists
  test("It validates get user notifications", async () => {
    const user = {
      username: "noorFatima",
    };
    const res = await request(app)
      .post("/api/get-user-notifications")
      .send(user)
      .set("Authorization", token);
    expect(res.body.success).toBe(false);
  });

  //success is false, beacuse username is wrong
  test("It validates get user notifications, when username is incorrect", async () => {
    const user = {
      username: "noorFatima89",
    };
    const res = await request(app)
      .post("/api/get-user-notifications")
      .send(user)
      .set("Authorization", token);
    expect(res.body.success).toBe(false);
  });
});
