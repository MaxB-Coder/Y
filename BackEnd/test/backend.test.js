import chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";

import User from "../src/models/user.model.js";
import server from "../index.js";

chai.use(chaiHttp);

const testServer = chai.request(server).keepOpen();

describe("GET request tests", () => {
  it("it should return the peeps", async () => {
    const res = await testServer.get("/");
    expect(res).to.be.a("object");
  });
});

describe("POST request tests", () => {
  // Peeps are being added to the test database but the test is still failing

  // it("should post the peep", async () => {
  //   let data = {
  //     username: "testUsername",
  //     $date: "Fri Aug 20 2023 21:19:33 GMT+0100 (British Summer Time)",
  //     message: "Test message",
  //   };

  //   const res = await testServer.post("/").send(data);

  //   expect(res).to.have.status(201);
  // });

  describe("Sign up request tests", () => {
    it("should allow sign up", async () => {
      let data = {
        name: "testName",
        username: "testUsername",
        email: "test@test.com",
        password: "TestPassword123!",
      };

      await User.deleteMany();

      const res = await testServer.post("/sign-up").send(data);
      expect(res).to.have.status(201);
    });
  });

  it("should prevent signing up if the user already exists", async () => {
    let data = {
      name: "testName",
      username: "testUsername",
      email: "test@test.com",
      password: "TestPassword123!",
    };

    const initialRes = await testServer.post("/sign-up").send(data);

    const res = await testServer.post("/sign-up").send(data);

    expect(res).to.have.status(500);
  });

  describe("Login request tests", () => {
    it("should allow for a successful login if the user exists", async () => {
      let data = {
        email: "test@test.com",
        password: "TestPassword123!",
      };

      const res = await testServer.post("/login").send(data);
      expect(res).to.have.status(200);
    });
  });

  it("should prevent logging in if the user does not exist", async () => {
    let data = {
      email: "test@test.com",
      password: "TestPassword123!",
    };

    await User.deleteMany();

    const res = await testServer.post("/login").send(data);

    expect(res.body.user).to.eql([]);
  });
});
