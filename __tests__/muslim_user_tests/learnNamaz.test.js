const request = require("supertest");
const app = require("../../app");
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJub29yRmF0aW1hIiwiaWF0IjoxNjYxNzAzNDE3LCJleHAiOjE2NjIzMDgyMTd9.vPk1KN8vfaPxQy34LytJfxL8a9Z9uDDOgG1W8TYFVTk";

describe("Muslim User Learn Namaz Test", () => {
  //must pass and get learn namaz progress
  test("It validates get learn Namaz Progress, when username is correct", async () => {
    const user = {
      username: "noorFatima",
    };
    const res = await request(app)
      .post("/api/get-learn-namaz-progress")
      .send(user)
      .set("Authorization", token);
    expect(res.body.success).toBe(true);
  });

  //must pass and get learn namaz progress
  test("It validates get learn Namaz Progress, when username is incorrect", async () => {
    const user = {
      username: "noorFatima90",
    };
    const res = await request(app)
      .post("/api/get-learn-namaz-progress")
      .send(user)
      .set("Authorization", token);
    expect(res.body.success).toBe(false);
  });

  //must pass and update namaz progress
  test("It validates update Namaz progress, when data is correct", async () => {
    const user = {
      username: "noorFatima",
      namaz: {
        namazName: "fajr",
        rakatName: "sunnat",
        rakats: 2,
      },
    };
    const res = await request(app)
      .patch("/api/update-learn-namaz-progress")
      .send(user)
      .set("Authorization", token);
    expect(res.body.success).toBe(true);
  });

  //must pass and does not update namaz progress
  test("It validates namaz progress is not updated, when data is incorrect", async () => {
    const user = {
      username: "noorFatima90",
      namaz: {
        namazName: "fajr1",
        rakatName: "sunnat",
        rakats: 2,
      },
    };
    const res = await request(app)
      .patch("/api/update-learn-namaz-progress")
      .send(user)
      .set("Authorization", token);
    expect(res.body.success).toBe(false);
  });

  //must pass and get particular rakat info
  test("It validates get particular rakat info, when data is correct", async () => {
    const user = {
      username: "noorFatima",
      namazName: "fajr",
      rakatName: "sunnat",
      rakats: 2,
    };
    const res = await request(app)
      .post("/api/get-particular-rakat-info")
      .send(user)
      .set("Authorization", token);
    expect(res.body.success).toBe(true);
  });

  //must pass and does not get particular rakat info
  test("It validates get particular rakat info, when username is incorrect", async () => {
    const user = {
      username: "noorFatima90",
      namazName: "fajr",
      rakatName: "sunnat",
      rakats: 2,
    };
    const res = await request(app)
      .post("/api/get-particular-rakat-info")
      .send(user)
      .set("Authorization", token);
    expect(res.body.success).toBe(true);
  });
});
