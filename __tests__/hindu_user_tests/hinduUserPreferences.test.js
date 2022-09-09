const request = require("supertest");
const app = require("../../app");
let token =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJuZWhhS3VtYXJpIiwiaWF0IjoxNjYxNzIxNjk5LCJleHAiOjE2NjIzMjY0OTl9.ScBZFzLcj2nOxYWWFkl-iCREX2ppKR1BONDlwMK-oaQ";

describe("Hindu User Preferences Test", () => {

    test("It validates update primary temple works correctly", async () => {
        const data = {
          username: "nehaKumari",
          primaryMosque: "New Temple"
        };
        const res = await request(app)
          .patch("/api/update-primary-temple")
          .send(data)
          .set("Authorization", token);
        expect(res.body.success).toBe(true);
      });
    
      test("It validates update primary temple, when user is incorrect", async () => {
        const data = {
          username: "heer",
          primaryMosque: "new Temple"
        };
        const res = await request(app)
          .patch("/api/update-primary-temple")
          .send(data)
          .set("Authorization", token);
        expect(res.body.success).toBe(false);
      });

      test("It validates update auto Silent Settings for Hindu user", async () => {
        const data = {
          username: "nehaKumari",
          state: true
        };
        const res = await request(app)
          .patch("/api/update-auto-silent-settings-for-hindu-user")
          .send(data)
          .set("Authorization", token);
        expect(res.body.success).toBe(true);
      });

      test("It validates update auto Silent Settings, when username is incorrect (for Hindus)", async () => {
        const data = {
          username: "heer",
          state: true
        };
        const res = await request(app)
          .patch("/api/update-auto-silent-settings-for-hindu-user")
          .send(data)
          .set("Authorization", token);
        expect(res.body.success).toBe(false);
      });


      test("It validates update veg non veg Settings", async () => {
        const data = {
          username: "nehaKumari",
          state: true
        };
        const res = await request(app)
          .patch("/api/update-veg-notifications-setting")
          .send(data)
          .set("Authorization", token);
        expect(res.body.success).toBe(true);
      });

      test("It validates update veg non veg Settings, when username is incorrect", async () => {
        const data = {
          username: "heer",
          state: true
        };
        const res = await request(app)
          .patch("/api/update-veg-notifications-setting")
          .send(data)
          .set("Authorization", token);
        expect(res.body.success).toBe(false);
      });
})