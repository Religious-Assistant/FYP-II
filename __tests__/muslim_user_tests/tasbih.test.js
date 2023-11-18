const request = require("supertest");
const app = require("../../app");
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJub29yRmF0aW1hIiwiaWF0IjoxNjYxNzAzNDE3LCJleHAiOjE2NjIzMDgyMTd9.vPk1KN8vfaPxQy34LytJfxL8a9Z9uDDOgG1W8TYFVTk";

describe("Muslim Tasbih Test", () => {
    test("It validates update Tasbih", async () => {
        const data = {
          username: "noorFatima",
          count:100
        };
        const res = await request(app)
          .patch("/api/update-tasbih")
          .send(data)
          .set("Authorization", token);
        expect(res.body.success).toBe(true);
      });

      test("It validates update Tasbih works correctly when username is invalid", async () => {
        const data = {
          username: "ali",
          count:100
        };
        const res = await request(app)
          .patch("/api/update-tasbih")
          .send(data)
          .set("Authorization", token);
        expect(res.body.success).toBe(false);
      });

      test("It validates get Tasbih Count", async () => {
        const data = {
          username: "noorFatima",
        };
        const res = await request(app)
          .post("/api/get-tasbih-count")
          .send(data)
          .set("Authorization", token);
        expect(res.body.success).toBe(true);
      });

      test("It validates get Tasbih Count works correctly when username is invalid", async () => {
        const data = {
          username: "noor",
        };
        const res = await request(app)
          .post("/api/get-tasbih-count")
          .send(data)
          .set("Authorization", token);
        expect(res.body.success).toBe(false);
      });
})