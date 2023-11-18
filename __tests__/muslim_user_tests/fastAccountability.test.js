const request = require("supertest");
const app = require("../../app");
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJub29yRmF0aW1hIiwiaWF0IjoxNjYxNzAzNDE3LCJleHAiOjE2NjIzMDgyMTd9.vPk1KN8vfaPxQy34LytJfxL8a9Z9uDDOgG1W8TYFVTk";

describe("Muslim User Fast Accountability Test", () => {
  //must pass and get fast Accountability
  test("It validates that user's fast accountability is fetched", async () => {
    const user = {
      username: "noorFatima",
      date: "10-11-2021",
    };
    const res = await request(app)
      .post("/api/get-fast-accountability")
      .send(user)
      .set("Authorization", token);
    expect(res.body.success).toBe(true);
  });

  //must pass and get fast Accountability, data is not given
  // test("It validates that user's fast accountability is fetched", async () => {
  //     const user = {
  //     };
  //     const res = await request(app)
  //       .post("/api/get-fast-accountability")
  //       .send(user)
  //       .set("Authorization", token);
  //     expect(res.body.success).toBe(false);
  //   });

  //must pass and update fast Accountability
  test("It validates that update fast accountability works correctly", async () => {
    const user = {
      hasFast: true,
      username: "noorFatima",
      date: "12-11-2021",
    };
    const res = await request(app)
      .patch("/api/update-fast-accountability")
      .send(user)
      .set("Authorization", token);
    expect(res.body.success).toBe(true);
  });

  //success should be false because username is wrong
  //   test("It validates that update fast accountability works correctly on wrong data", async () => {
  //     const user = {
  //       username: "noorFatima780",
  //       date: "12-11-2021"
  //     };
  //     const res = await request(app)
  //       .patch("/api/update-fast-accountability")
  //       .send(user)
  //       .set("Authorization", token);
  //     expect(res.body.success).toBe(false);
  //   });
});
