const request = require("supertest");
const app = require("../app");
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJub29yRmF0aW1hIiwiaWF0IjoxNjYxNzAzNDE3LCJleHAiOjE2NjIzMDgyMTd9.vPk1KN8vfaPxQy34LytJfxL8a9Z9uDDOgG1W8TYFVTk";

describe("User Routes Testing", () => {

  //Must pass as all details are given, This will be passed for just one time and will fail when you run again because user already exists
  test("It validates user registration", async () => {
    const user = {
      username: "noorFatima",
      password: "noorFatima1234_",
      mobile: "03353378882",
      religion: 1,
      location: { longitude: 68.8228, latitude: 27.7244 },
    };

    const res = await request(app).post("/api/register-user").send(user);
    expect(res.body.success).toBe(true);
  });

  //Must pass as all details are given, This will be passed for just one time and will fail when you run again because user already exists
  test("It validates user registration", async () => {
    const user = {
      username: "nehaKumari",
      password: "nehaKumari",
      mobile: "03353378955",
      religion: 2,
      location: { longitude: 68.8228, latitude: 27.7244 },
    };

    const res = await request(app).post("/api/register-user").send(user);
    expect(res.body.success).toBe(true);
  });

  //Password is required but not provided, success will be false
  test("It validates new user registration", async () => {
    const user = {
      username: "kiran",
      mobile: "03001112223",
      religion: 1,
    };
    let res = await request(app).post("/api/register-user").send(user);
    expect(res.body.success).toBe(false);
  });

  //Duplicate Users not allowed
  test("It validates user duplication", async () => {
    const user = {
      username: "noorFatima",
      password: "noorFatima1234_",
      mobile: "03353378882",
      religion: 1,
      location: { longitude: 68.8228, latitude: 27.7244 },
    };
    let res = await request(app).post("/api/register-user").send(user);
    expect(res.body.success).toBe(false);
  });

  //Must pass as all details are given
  test("It validates Login user", async () => {
    const user = {
      username: "noorFatima",
      password: "noorFatima12",
    };
    const res = await request(app).post("/api/login-user").send(user);
    expect(res.body.success).toBe(true);
  });

  //Must pass as all details are given
  test("It validates Login user", async () => {
    const user = {
      username: "nehaKumari",
      password: "nehaKumari",
    };
    const res = await request(app).post("/api/login-user").send(user);
    expect(res.body.success).toBe(true);
  });

  //Success is false because password is incorrect
  test("It validates user is not LoggedIn", async () => {
    const user = {
      username: "noorFatima",
      password: "noor12",
    };
    const res = await request(app).post("/api/login-user").send(user);
    expect(res.body.success).toBe(false);
  });

  //Must pass as all details are given correctly provided
  test("It validates updates auto-silent-mode", async () => {
    const user = {
      username: "noorFatima",
      password: "false",
    };
    const res = await request(app)
      .patch("/api/update-auto-silent-setting")
      .send(user)
      .set("Authorization", token);
    expect(res.body.success).toBe(true);
  });

  //Username is invalid and success will be false
  test("It validates auto-silent-mode is not updated", async () => {
    const user = {
      username: "noor123",
      password: "false",
    };
    const res = await request(app)
      .patch("/api/update-auto-silent-setting")
      .send(user)
      .set("Authorization", token);
    expect(res.body.success).toBe(false);
  });

  //must pass and location will be updated
  test("It validates that user's location is updated", async () => {
    const user = {
      username: "noorFatima",
      longitude: 26.7344,
      latitude: 67.7795,
    };
    const res = await request(app)
      .patch("/api/update-location")
      .send(user)
      .set("Authorization", token);
    expect(res.body.success).toBe(true);
  });

  //location will not be updated, because longitude is missing, success will be false
  test("It validates, location is not updated", async () => {
    const user = {
      username: "noorFatima",
      latitude: 67.7795,
    };
    const res = await request(app)
      .patch("/api/update-location")
      .send(user)
      .set("Authorization", token);
    expect(res.body.success).toBe(false);
  });

  //Profile Image is not given, the success will be failed
  test("It validates that user's profile is not updated", async () => {
    const user = {
      username: "noorFatima",
    };
    const res = await request(app)
      .patch("/api/update-profile-image")
      .send(user)
      .set("Authorization", token);
    expect(res.body.success).toBe(false);
  });

  //must pass and password will be updated
  test("It validates that user's password is updated", async () => {
    const user = {
      username: "noorFatima",
      newPassword: "noorFatima12",
    };
    const res = await request(app)
      .patch("/api/update-password")
      .send(user)
      .set("Authorization", token);
    expect(res.body.success).toBe(true);
  });

  //username is wrong and success will be false
  test("It validates that user's password is not updated", async () => {
    const user = {
      username: "noor90",
      newPassword: "noorFatima12",
    };
    const res = await request(app)
      .patch("/api/update-password")
      .send(user)
      .set("Authorization", token);
    expect(res.body.success).toBe(false);
  });

  //must pass and password will be updated
  test("It validates that forget password works correctly, when correct data is provided", async () => {
    const user = {
      username: "noorFatima",
      newPassword: "noorFatima12",
    };
    const res = await request(app)
      .patch("/api/forgot-password")
      .send(user)
      .set("Authorization", token);
    expect(res.body.success).toBe(true);
  });

  //username is wrong and success will be false
  test("It validates that forget password works correctly, when incorrect data is provided", async () => {
    const user = {
      username: "noor90",
      newPassword: "noorFatima12",
    };
    const res = await request(app)
      .patch("/api/forgot-password")
      .send(user)
      .set("Authorization", token);
    expect(res.body.success).toBe(false);
  });

  //must pass and get updated user's data
  test("It validates that user's updated data is fetched", async () => {
    const user = {
      username: "noorFatima",
    };
    const res = await request(app)
      .post("/api/get-updated-user-data")
      .send(user)
      .set("Authorization", token);
    expect(res.body.success).toBe(true);
  });

  //user's updated data is not fetched as username is incorrect
  test("It validates that user's updated data is not fetched", async () => {
    const user = {
      username: "noorFatima67",
    };
    const res = await request(app)
      .post("/api/get-updated-user-data")
      .send(user)
      .set("Authorization", token);
    expect(res.body.success).toBe(false);
  });

});
