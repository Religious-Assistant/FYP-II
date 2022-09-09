const request = require("supertest");
const app = require("../../app");
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJub29yRmF0aW1hIiwiaWF0IjoxNjYxNzAzNDE3LCJleHAiOjE2NjIzMDgyMTd9.vPk1KN8vfaPxQy34LytJfxL8a9Z9uDDOgG1W8TYFVTk";

describe("Muslim Namaz Alarms Test", () => {
  test("It validates update Namaz alarms times", async () => {
    const data = {
      username: "noorFatima",
      fajr: "4:00am",
      zuhr: "2:00pm",
      asr: "5:00pm",
      maghrib: "7:00pm",
      isha: "9:00pm",
    };
    const res = await request(app)
      .patch("/api/update-namaz-alarm-times")
      .send(data)
      .set("Authorization", token);
    expect(res.body.success).toBe(true);
  });

  test("It validates update Namaz alarms times, when data is incorrect", async () => {
    const data = {
      username: "noorFatima999",
      fajr: "4:00am",
      zuhr: "2:00pm",
      asr: "5:00pm",
      maghrib: "7:00pm",
      isha: "9:00pm",
    };
    const res = await request(app)
      .patch("/api/update-namaz-alarm-times")
      .send(data)
      .set("Authorization", token);
    expect(res.body.success).toBe(false);
  });

  test("It validates get Namaz alarms times", async () => {
    const data = {
      username: "noorFatima",
    };
    const res = await request(app)
      .post("/api/get-namaz-alarms-for-user")
      .send(data)
      .set("Authorization", token);
    expect(res.body.success).toBe(true);
  });

  test("It validates get Namaz alarms times, when data is incorrect", async () => {
    const data = {
      username: "noor",
    };
    const res = await request(app)
      .post("/api/get-namaz-alarms-for-user")
      .send(data)
      .set("Authorization", token);
    expect(res.body.success).toBe(false);
  });
});
