const request = require("supertest");
const app = require("../../app");
const avatar = require("../../controllers/utils/constants");
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJuZWhhS3VtYXJpIiwiaWF0IjoxNjYxNzIxNjk5LCJleHAiOjE2NjIzMjY0OTl9.ScBZFzLcj2nOxYWWFkl-iCREX2ppKR1BONDlwMK-oaQ";

describe("Hindu User Recite Gita Test", () => {
  test("It validates get recitation stats", async () => {
    const data = {
      username: "nehaKumari",
    };
    const res = await request(app)
      .post("/api/get-gita-recitation-stats")
      .send(data)
      .set("Authorization", token);
    expect(res.body.success).toBe(true);
  });

  test("It validates mark-chapter-as-read", async () => {
    const data = {
      username: "nehaKumari",
      chapterNumber: 1,
      chapterName: "Arjuna's Dilemma",
    };
    const res = await request(app)
      .patch("/api/mark-chapter-as-read")
      .send(data)
      .set("Authorization", token);
    expect(res.body.success).toBe(true);
  });

  test("It validates check chapter is read", async () => {
    const data = {
      username: "nehaKumari",
      chapterName: "Arjuna's Dilemma",
    };
    const res = await request(app)
      .post("/api/check-chapter-is-read")
      .send(data)
      .set("Authorization", token);
    expect(res.body.success).toBe(true);
  });

  test("It validates update last read chapter", async () => {
    const data = {
      username: "nehaKumari",
      chapterNumber: 1,
      verseNumber: 1,
    };
    const res = await request(app)
      .patch("/api/update-last-read-chapter")
      .send(data)
      .set("Authorization", token);
    expect(res.body.success).toBe(true);
  });

  test("It validates get last read chapter", async () => {
    const data = {
      username: "nehaKumari",
    };
    const res = await request(app)
      .post("/api/get-last-read-chapter")
      .send(data)
      .set("Authorization", token);
    expect(res.body.success).toBe(true);
  });

  test("It validates mark-chapter-as-unread", async () => {
    const data = {
      username: "nehaKumari",
      chapterNumber: 1,
      chapterName: "Arjuna's Dilemma",
    };
    const res = await request(app)
      .patch("/api/mark-chapter-as-unread")
      .send(data)
      .set("Authorization", token);
    expect(res.body.success).toBe(true);
  });

  test("It validates mark-summary-as-read", async () => {
    const data = {
      username: "nehaKumari",
      summaryNumber: 1,
      summaryName: "Arjuna's Dilemma",
    };
    const res = await request(app)
      .patch("/api/mark-summary-as-read")
      .send(data)
      .set("Authorization", token);
    expect(res.body.success).toBe(true);
  });

  test("It validates mark-summary-as-unread", async () => {
    const data = {
      username: "nehaKumari",
      summaryNumber: 1,
      summaryName: "Arjuna's Dilemma",
    };
    const res = await request(app)
      .patch("/api/mark-summary-as-unread")
      .send(data)
      .set("Authorization", token);
    expect(res.body.success).toBe(true);
  });

  test("It validates update last read summary", async () => {
    const data = {
      username: "nehaKumari",
      summaryNumber: 2,
    };
    const res = await request(app)
      .patch("/api/update-last-read-summary")
      .send(data)
      .set("Authorization", token);
    expect(res.body.success).toBe(true);
  });

  test("It validates check summary is read", async () => {
    const data = {
      username: "nehaKumari",
      summaryName: "Arjuna's Dilemma",
    };
    const res = await request(app)
      .post("/api/check-summary-is-read")
      .send(data)
      .set("Authorization", token);
     expect(res.body.success).toBe(true);
  });

  test("It validates get last read summary", async () => {
    const data = {
      username: "nehaKumari",
    };
    const res = await request(app)
      .post("/api/get-last-read-summary")
      .send(data)
      .set("Authorization", token);
    expect(res.body.success).toBe(true);
  });
});
