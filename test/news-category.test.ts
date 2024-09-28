import { afterEach, beforeAll, describe, expect, it } from "@jest/globals";
import { TestUtil } from "./test.util";
import supertest from "supertest";
import { app } from "../src/applications/app";

describe("POST /api/news-categories", () => {
  let token: string;

  beforeAll(async () => {
    const response = await supertest(app).post("/api/auth/login").send({
      email: "admin@admin.com",
      password: "admin",
    });

    token = response.body.data;
  });

  afterEach(async () => {
    await TestUtil.deleteCategory();
  });

  it("should reject if category name is exists", async () => {
    await TestUtil.createCategory();

    const response = await supertest(app)
      .post("/api/news-categories")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject if request is invalid", async () => {
    const response = await supertest(app)
      .post("/api/news-categories")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should create new news category", async () => {
    const response = await supertest(app)
      .post("/api/news-categories")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test",
      });

    expect(response.status).toBe(201);
    expect(response.body.data).toBe("OK");
  });
});

describe("GET /api/news-categories", () => {
  let token: string;

  beforeAll(async () => {
    const response = await supertest(app).post("/api/auth/login").send({
      email: "admin@admin.com",
      password: "admin",
    });

    token = response.body.data;
  });

  it("should get all news categories", async () => {
    const response = await supertest(app)
      .get("/api/news-categories")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
  });
});

describe("PUT /api/news-categories/:id", () => {
  let token: string;

  beforeAll(async () => {
    const response = await supertest(app).post("/api/auth/login").send({
      email: "admin@admin.com",
      password: "admin",
    });

    token = response.body.data;
  });

  afterEach(async () => {
    await TestUtil.deleteCategory();
  });

  it("should reject if news category is not found", async () => {
    const category = await TestUtil.createCategory();
    const response = await supertest(app)
      .put(`/api/news-categories/${category.id + 1}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test",
      });

    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject if request is invalid", async () => {
    const category = await TestUtil.createCategory();
    const response = await supertest(app)
      .put(`/api/news-categories/${category.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should update news category by id", async () => {
    const category = await TestUtil.createCategory();
    const response = await supertest(app)
      .put(`/api/news-categories/${category.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "test11",
      });

    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");
  });
});

describe("DELETE /api/news-categories/:id", () => {
  let token: string;

  beforeAll(async () => {
    const response = await supertest(app).post("/api/auth/login").send({
      email: "admin@admin.com",
      password: "admin",
    });

    token = response.body.data;
  });

  afterEach(async () => {
    await TestUtil.deleteCategory();
  });

  it("should reject if news category is not found", async () => {
    const category = await TestUtil.createCategory();
    const response = await supertest(app)
      .delete(`/api/news-categories/${category.id + 1}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

  it("should delete news category by id", async () => {
    const category = await TestUtil.createCategory();
    const response = await supertest(app)
      .delete(`/api/news-categories/${category.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");
  });
});
