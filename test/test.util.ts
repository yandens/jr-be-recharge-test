import { prisma } from "../src/applications/database";
import { News, NewsCategory, User } from "@prisma/client";

export class TestUtil {
  static async getAdmin(): Promise<User> {
    const admin = await prisma.user.findFirst({
      where: {
        email: "admin@admin.com",
      },
    });

    if (!admin) throw new Error("Admin is not found");

    return admin;
  }

  static async deleteCategory() {
    await prisma.newsCategory.deleteMany({
      where: {
        name: "test",
      },
    });
  }

  static async createCategory(): Promise<NewsCategory> {
    return prisma.newsCategory.create({
      data: {
        name: "test",
      },
    });
  }

  static async getCategory(): Promise<NewsCategory> {
    const category = await prisma.newsCategory.findFirst({
      where: {
        name: "test",
      },
    });

    if (!category) throw new Error("Category is not found");

    return category;
  }

  static async deleteNews() {
    await prisma.news.deleteMany({
      where: {
        title: "test",
      },
    });
  }

  static async createNews(): Promise<News> {
    const category = await this.getCategory();
    const admin = await this.getAdmin();

    return prisma.news.create({
      data: {
        title: "test",
        snippet: "test",
        content: "test",
        category_id: category.id,
        user_id: admin.id,
      },
    });
  }

  static async getNews(): Promise<News> {
    const news = await prisma.news.findFirst({
      where: {
        title: "test",
      },
    });

    if (!news) throw new Error("News is not found");

    return news;
  }
}
