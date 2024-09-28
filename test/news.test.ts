import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "@jest/globals";
import supertest from "supertest";
import { app } from "../src/applications/app";
import { TestUtil } from "./test.util";

describe("POST /api/news", () => {
  let token: string;

  beforeAll(async () => {
    const response = await supertest(app).post("/api/auth/login").send({
      email: "admin@admin.com",
      password: "admin",
    });

    token = response.body.data;
  });

  beforeEach(async () => {
    await TestUtil.createCategory();
  });

  afterEach(async () => {
    await TestUtil.deleteNews();
    await TestUtil.deleteCategory();
  });

  it("should reject if request is invalid", async () => {
    const response = await supertest(app)
      .post("/api/news")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "",
        snippet: "",
        content: "",
        category_id: "",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject if category is not found", async () => {
    const category = await TestUtil.getCategory();
    const response = await supertest(app)
      .post("/api/news")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "test",
        snippet: "test",
        content: "test",
        category_id: category.id + 1,
      });

    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

  it("should create new news", async () => {
    const category = await TestUtil.getCategory();
    const response = await supertest(app)
      .post("/api/news")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "test",
        snippet: "test",
        content: "test",
        category_id: category.id,
      });

    expect(response.status).toBe(201);
    expect(response.body.data).toBe("OK");
  });
});

describe("GET /api/news", () => {
  beforeEach(async () => {
    await TestUtil.createCategory();
    await TestUtil.createNews();
  });

  afterEach(async () => {
    await TestUtil.deleteNews();
    await TestUtil.deleteCategory();
  });

  it("should get all news", async () => {
    const response = await supertest(app).get("/api/news");

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
  });
});

describe("GET /api/news/:id", () => {
  beforeEach(async () => {
    await TestUtil.createCategory();
    await TestUtil.createNews();
  });

  afterEach(async () => {
    await TestUtil.deleteNews();
    await TestUtil.deleteCategory();
  });

  it("should get news by id", async () => {
    const news = await TestUtil.getNews();
    const response = await supertest(app).get(`/api/news/${news.id}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
  });

  it("should reject if news is not found", async () => {
    const news = await TestUtil.getNews();
    const response = await supertest(app).get(`/api/news/${news.id + 1}`);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("PUT /api/news/:id", () => {
  let token: string;

  beforeAll(async () => {
    const response = await supertest(app).post("/api/auth/login").send({
      email: "admin@admin.com",
      password: "admin",
    });

    token = response.body.data;
  });

  beforeEach(async () => {
    await TestUtil.createCategory();
    await TestUtil.createNews();
  });

  afterEach(async () => {
    await TestUtil.deleteNews();
    await TestUtil.deleteCategory();
  });

  it("should reject if news is not found", async () => {
    const news = await TestUtil.getNews();
    const response = await supertest(app)
      .put(`/api/news/${news.id + 1}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "test",
        snippet: "test",
        content: "test",
        category_id: news.category_id,
      });

    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject if request is invalid", async () => {
    const news = await TestUtil.getNews();
    const response = await supertest(app)
      .put(`/api/news/${news.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "",
        snippet: "",
        content: "",
        category_id: "",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("should update news", async () => {
    const news = await TestUtil.getNews();
    const response = await supertest(app)
      .put(`/api/news/${news.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "test",
        snippet: "test",
        content: "test",
        category_id: news.category_id,
      });

    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");
  });

  it("should reject if category is not found", async () => {
    const news = await TestUtil.getNews();
    const response = await supertest(app)
      .put(`/api/news/${news.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "test",
        snippet: "test",
        content: "test",
        category_id: news.category_id + 1,
      });

    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });
});

describe("DELETE /api/news/:id", () => {
  let token: string;

  beforeAll(async () => {
    const response = await supertest(app).post("/api/auth/login").send({
      email: "admin@admin.com",
      password: "admin",
    });

    token = response.body.data;
  });

  beforeEach(async () => {
    await TestUtil.createCategory();
    await TestUtil.createNews();
  });

  afterEach(async () => {
    await TestUtil.deleteNews();
    await TestUtil.deleteCategory();
  });

  it("should reject if news is not found", async () => {
    const news = await TestUtil.getNews();
    const response = await supertest(app)
      .delete(`/api/news/${news.id + 1}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

  it("should delete news by id", async () => {
    const news = await TestUtil.getNews();
    const response = await supertest(app)
      .delete(`/api/news/${news.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toBe("OK");
  });
});

describe("GET /api/news/search", () => {
  beforeEach(async () => {
    await TestUtil.createCategory();
    await TestUtil.createNews();
  });

  afterEach(async () => {
    await TestUtil.deleteNews();
    await TestUtil.deleteCategory();
  });

  it("should search news", async () => {
    const response = await supertest(app).get("/api/news/search?query=tes");

    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
  });
});
