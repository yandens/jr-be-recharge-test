import { describe, expect, it } from "@jest/globals";
import supertest from "supertest";
import { app } from "../src/applications/app";

describe("POST /api/auth/login", () => {
  it("should reject login if request is invalid", async () => {
    const response = await supertest(app).post("/api/auth/login").send({
      email: "admin.com",
      password: "as",
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject login if credentials are invalid", async () => {
    const response = await supertest(app).post("/api/auth/login").send({
      email: "admin@admin.com",
      password: "admin123",
    });

    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  it("should login", async () => {
    const response = await supertest(app).post("/api/auth/login").send({
      email: "admin@admin.com",
      password: "admin",
    });

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
  });
});

describe("POST /api/auth/logout", () => {
  it("should reject if token is invalid", async () => {
    const loginResponse = await supertest(app).post("/api/auth/login").send({
      email: "admin@admin.com",
      password: "admin",
    });

    const response = await supertest(app)
      .post("/api/auth/logout")
      .set("Authorization", `Bearer ${loginResponse.body.data}1`);

    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  it("should logout", async () => {
    const loginResponse = await supertest(app).post("/api/auth/login").send({
      email: "admin@admin.com",
      password: "admin",
    });

    const response = await supertest(app)
      .post("/api/auth/logout")
      .set("Authorization", `Bearer ${loginResponse.body.data}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");
  });
});
