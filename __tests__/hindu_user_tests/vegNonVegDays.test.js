const request = require("supertest");
const app = require("../../app");
const avatar = require("../../controllers/utils/constants");
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJuZWhhS3VtYXJpIiwiaWF0IjoxNjYxNzIxNjk5LCJleHAiOjE2NjIzMjY0OTl9.ScBZFzLcj2nOxYWWFkl-iCREX2ppKR1BONDlwMK-oaQ";

describe("Hindu User Veg Non Veg Test", () => {
  test("It validates set veg days", async () => {
    const data = {
      username: "nehaKumari",
      vegSubscription: {
        monday: true,
        tuesday: false,
        wednesday: true,
        thursday: false,
        friday: true,
        saturday: false,
        sunday: false,
      },
    };
    const res = await request(app)
      .patch("/api/set-veg-days")
      .send(data)
      .set("Authorization", token);
    expect(res.body.success).toBe(true);
  });

  //   test("It validates set veg days", async () => {
  //     const data = {
  //       username: "heer",
  //       vegSubscription:{ monday:true, tuesday:false, wednesday:true, thursday:false, friday:true, saturday:false, sunday:false }
  //     };
  //     const res = await request(app)
  //       .patch("/api/set-veg-days")
  //       .send(data)
  //       .set("Authorization", token);
  //       console.log(res.body)
  //     expect(res.body.success).toBe(false);
  //   });

  test("It validates get veg days", async () => {
    const data = {
      username: "nehaKumari",
    };
    const res = await request(app)
      .post("/api/get-veg-days")
      .send(data)
      .set("Authorization", token);
    expect(res.body.success).toBe(true);
  });

  test("It validates get veg days, when username is incorrect", async () => {
    const data = {
      username: "heeer",
    };
    const res = await request(app)
      .post("/api/get-veg-days")
      .send(data)
      .set("Authorization", token);
    expect(res.body.success).toBe(false);
  });
});
