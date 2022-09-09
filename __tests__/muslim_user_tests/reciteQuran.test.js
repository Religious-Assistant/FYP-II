const request = require("supertest");
const app = require("../../app");
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJub29yRmF0aW1hIiwiaWF0IjoxNjYxNzAzNDE3LCJleHAiOjE2NjIzMDgyMTd9.vPk1KN8vfaPxQy34LytJfxL8a9Z9uDDOgG1W8TYFVTk";

describe("Muslim Recite Quran Test", () => {
  test("It validates get recitation stats", async () => {
    const data = {
      username: "noorFatima",
    };
    const res = await request(app)
      .post("/api/get-recitation-stats")
      .send(data)
      .set("Authorization", token);
    expect(res.body.success).toBe(true);
  });

  test("It validates mark-surah-as-read", async () => {
    const data = {
      username: "noorFatima",
      surahNumber: 1,
      surahName: "Al-Fatihah",
    };
    const res = await request(app)
      .patch("/api/mark-surah-as-read")
      .send(data)
      .set("Authorization", token);
    console.log(res.body);
    expect(res.body.success).toBe(true);
  });

  test("It validates mark-surah-as-read works correctly when username is incorrect", async () => {
    const data = {
      username: "noor",
      surahNumber: 1,
      surahName: "Al-Fatihah",
    };
    const res = await request(app)
      .patch("/api/mark-surah-as-read")
      .send(data)
      .set("Authorization", token);
    console.log(res.body);
    expect(res.body.success).toBe(false);
  });

  test("It validates check surah is read", async () => {
    const data = {
      username: "noorFatima",
      surahName: "Al-Fatihah",
    };
    const res = await request(app)
      .post("/api/check-surah-is-read")
      .send(data)
      .set("Authorization", token);
    expect(res.body.success).toBe(true);
  });

  test("It validates check parah is read", async () => {
    const data = {
      username: "noorFatima",
      parahName: "Alif laam meem",
    };
    const res = await request(app)
      .post("/api/check-parah-is-read")
      .send(data)
      .set("Authorization", token);
    expect(res.body.success).toBe(true);
  });

  test("It validates mark-parah-as-read", async () => {
    const data = {
      username: "noorFatima",
      parahNumber: 1,
      parahName: "Alif laam meem",
    };
    const res = await request(app)
      .patch("/api/mark-parah-as-read")
      .send(data)
      .set("Authorization", token);
    console.log(res.body);
    expect(res.body.success).toBe(true);
  });

  test("It validates mark-parah-as-unread", async () => {
    const data = {
      username: "noorFatima",
      parahNumber: 1,
      parahName: "Alif laam meem",
    };
    const res = await request(app)
      .patch("/api/mark-parah-as-unread")
      .send(data)
      .set("Authorization", token);
    expect(res.body.success).toBe(true);
  });

  test("It validates mark-surah-as-unread", async () => {
    const data = {
      username: "noorFatima",
      surahNumber: 1,
      surahName: "Al-Fatihah",
    };
    const res = await request(app)
      .patch("/api/mark-surah-as-unread")
      .send(data)
      .set("Authorization", token);
    console.log(res.body);
    expect(res.body.success).toBe(true);
  });

  test("It validates update last read surah", async () => {
    const data = {
      username: "noorFatima",
      surahNumber: 2,
      surahName: "Al-Baqarah",
    };
    const res = await request(app)
      .patch("/api/update-last-read-surah")
      .send(data)
      .set("Authorization", token);
    console.log(res.body);
    expect(res.body.success).toBe(true);
  });

  test("It validates update last read parah", async () => {
    const data = {
      username: "noorFatima",
      parahNumber: 2,
      parahName: "Sayaqulu",
    };
    const res = await request(app)
      .patch("/api/update-last-read-parah")
      .send(data)
      .set("Authorization", token);
    expect(res.body.success).toBe(true);
  });

  test("It validates get last read Surah", async () => {
    const data = {
      username: "noorFatima",
    };
    const res = await request(app)
      .post("/api/get-last-read-surah")
      .send(data)
      .set("Authorization", token);
    expect(res.body.success).toBe(true);
  });

  test("It validates get last read Parah", async () => {
    const data = {
      username: "noorFatima",
    };
    const res = await request(app)
      .post("/api/get-last-read-parah")
      .send(data)
      .set("Authorization", token);
    expect(res.body.success).toBe(true);
  });
});
