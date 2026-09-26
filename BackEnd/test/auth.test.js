import chai from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";

import User from "../src/models/user.model.js";
import server from "../index.js";

chai.use(chaiHttp);

const testServer = chai.request(server).keepOpen();

const newUser = {
  name: "authName",
  username: "authUsername",
  email: "auth@test.com",
  password: "AuthPassword123!",
};

describe("Auth security tests", () => {
  beforeEach(async () => {
    await User.deleteMany();
  });

  after(async () => {
    await User.deleteMany();
  });

  describe("Sign up", () => {
    it("should store a bcrypt hash instead of the plain-text password", async () => {
      await testServer.post("/sign-up").send(newUser);

      const stored = await User.findOne({ email: newUser.email }).select(
        "+password"
      );
      expect(stored.password).to.not.equal(newUser.password);
      expect(stored.password).to.match(/^\$2[aby]\$12\$/);
    });

    it("should not return the password", async () => {
      const res = await testServer.post("/sign-up").send(newUser);

      expect(res).to.have.status(201);
      expect(res.body).to.not.have.property("password");
    });

    it("should prevent a second account with the same email and a different password", async () => {
      await testServer.post("/sign-up").send(newUser);

      const res = await testServer
        .post("/sign-up")
        .send({ ...newUser, username: "otherUsername", password: "Different123!" });

      expect(res).to.have.status(500);
      expect(await User.countDocuments({ email: newUser.email })).to.equal(1);
    });

    it("should reject a password shorter than 8 characters", async () => {
      const res = await testServer
        .post("/sign-up")
        .send({ ...newUser, password: "Ab1!" });

      expect(res).to.have.status(422);
      expect(await User.countDocuments()).to.equal(0);
    });

    it("should reject query operators in place of values", async () => {
      const res = await testServer
        .post("/sign-up")
        .send({ ...newUser, email: { $ne: null } });

      expect(res).to.have.status(422);
      expect(await User.countDocuments()).to.equal(0);
    });
  });

  describe("Login", () => {
    beforeEach(async () => {
      await testServer.post("/sign-up").send(newUser);
    });

    it("should log in with the correct password without returning it", async () => {
      const res = await testServer
        .post("/login")
        .send({ email: newUser.email, password: newUser.password });

      expect(res).to.have.status(200);
      expect(res.body.user).to.have.lengthOf(1);
      expect(res.body.user[0].username).to.equal(newUser.username);
      expect(res.body.user[0]).to.not.have.property("password");
    });

    it("should reject a wrong password", async () => {
      const res = await testServer
        .post("/login")
        .send({ email: newUser.email, password: "WrongPassword123!" });

      expect(res.body.user).to.eql([]);
    });

    it("should reject NoSQL operator injection on both fields", async () => {
      const res = await testServer
        .post("/login")
        .send({ email: { $ne: null }, password: { $ne: null } });

      expect(res).to.have.status(422);
      expect(res.body).to.not.have.property("user");
    });

    it("should reject NoSQL operator injection on the password only", async () => {
      const res = await testServer
        .post("/login")
        .send({ email: newUser.email, password: { $ne: null } });

      expect(res).to.have.status(422);
      expect(res.body).to.not.have.property("user");
    });
  });
});
