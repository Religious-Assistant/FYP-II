const request = require("supertest");
const app = require("../../app");
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJub29yRmF0aW1hIiwiaWF0IjoxNjYxNzAzNDE3LCJleHAiOjE2NjIzMDgyMTd9.vPk1KN8vfaPxQy34LytJfxL8a9Z9uDDOgG1W8TYFVTk";

describe("Muslim User Namaz Accountability Test", () => {
 
    test("It validates that user's Namaz accountability is fetched", async () => {
    const user = {
      username: "noorFatima",
      date: "10-11-2021",
    };
    const res = await request(app)
      .post("/api/get-namaz-accountability")
      .send(user)
      .set("Authorization", token);
    expect(res.body.success).toBe(true);
  });


});
