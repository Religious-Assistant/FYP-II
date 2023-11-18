const request = require("supertest");
const app = require("../../app");
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJub29yRmF0aW1hIiwiaWF0IjoxNjYxNzAzNDE3LCJleHAiOjE2NjIzMDgyMTd9.vPk1KN8vfaPxQy34LytJfxL8a9Z9uDDOgG1W8TYFVTk";

describe("Muslim User Preferences Test", () => {

    test("It validates update primary mosque works correctly", async () => {
        const data = {
          username: "noorFatima",
          primaryMosque: "Masjid Mustafa"
        };
        const res = await request(app)
          .patch("/api/update-primary-mosque")
          .send(data)
          .set("Authorization", token);
        expect(res.body.success).toBe(true);
      });
    
      test("It validates update primary mosque, when user is incorrect", async () => {
        const data = {
          username: "noorFatima90",
          primaryMosque: "Masjid Mustafa"
        };
        const res = await request(app)
          .patch("/api/update-primary-mosque")
          .send(data)
          .set("Authorization", token);
        expect(res.body.success).toBe(false);
      });

      test("It validates update auto Silent Settings", async () => {
        const data = {
          username: "noorFatima",
          state: true
        };
        const res = await request(app)
          .patch("/api/update-auto-silent-setting")
          .send(data)
          .set("Authorization", token);
        expect(res.body.success).toBe(true);
      });

      test("It validates update auto Silent Settings, when username is incorrect", async () => {
        const data = {
          username: "noorFatima90",
          state: true
        };
        const res = await request(app)
          .patch("/api/update-auto-silent-setting")
          .send(data)
          .set("Authorization", token);
        expect(res.body.success).toBe(false);
      });

      test("It validates update Namaz Notification Settings", async () => {
        const data = {
          username: "noorFatima",
          state: true
        };
        const res = await request(app)
          .patch("/api/update-namaz-notifications-setting")
          .send(data)
          .set("Authorization", token);
        expect(res.body.success).toBe(true);
      });

      test("It validates update Namaz Notification Settings, when username is incorrect", async () => {
        const data = {
          username: "noorFatima90",
          state: true
        };
        const res = await request(app)
          .patch("/api/update-namaz-notifications-setting")
          .send(data)
          .set("Authorization", token);
        expect(res.body.success).toBe(false);
      });


      test("It validates update Accountability Notification Settings", async () => {
        const data = {
          username: "noorFatima",
          state: true
        };
        const res = await request(app)
          .patch("/api/update-accountability-notifications-setting")
          .send(data)
          .set("Authorization", token);
        expect(res.body.success).toBe(true);
      });

      test("It validates update Accountability Notification Settings, when username is incorrect", async () => {
        const data = {
          username: "noorFatima90",
          state: true
        };
        const res = await request(app)
          .patch("/api/update-accountability-notifications-setting")
          .send(data)
          .set("Authorization", token);
        expect(res.body.success).toBe(false);
      });
})