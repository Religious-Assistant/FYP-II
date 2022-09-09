const request = require("supertest");
const app = require("../../app");
const avatar = require("../../controllers/utils/constants");
let token =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJuZWhhS3VtYXJpIiwiaWF0IjoxNjYxNzIxNjk5LCJleHAiOjE2NjIzMjY0OTl9.ScBZFzLcj2nOxYWWFkl-iCREX2ppKR1BONDlwMK-oaQ";

describe("Hindu User Notifications Test", () => {
  //success is false, beacuse no any notifications exists
  test("It validates get user notifications", async () => {
    const user = {
      username: "nehaKumari",
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
      username: "neha",
    };
    const res = await request(app)
      .post("/api/get-user-notifications")
      .send(user)
      .set("Authorization", token);
    expect(res.body.success).toBe(false);
  });
});
