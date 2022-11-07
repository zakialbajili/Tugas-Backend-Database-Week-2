const request = require("supertest");

const app = require("./server");

afterAll((done) => {
  done();
});

describe("User", () => {
  Test("List User", async () => {
    const res = await request(app).get("/api/users");
    expect(res.status).toBe(200);
  });
});
