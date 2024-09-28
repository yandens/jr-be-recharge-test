import { PrismaClient } from "@prisma/client";
import * as process from "node:process";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("admin", 10);
  const admin = await prisma.user.create({
    data: {
      email: "admin@admin.com",
      password: adminPassword,
    },
  });

  const category = await prisma.newsCategory.createManyAndReturn({
    data: [
      {
        name: "Politics",
      },
      {
        name: "Technology",
      },
      {
        name: "Sports",
      },
      {
        name: "Entertainment",
      },
      {
        name: "Health",
      },
      {
        name: "Business",
      },
      {
        name: "Science",
      },
      {
        name: "Education",
      },
      {
        name: "Travel",
      },
      {
        name: "Food",
      },
    ],
  });

  await prisma.news.createMany({
    data: [
      {
        title: "New Bill Passed in Senate Addressing Climate Change",
        snippet:
          "The Senate has passed a landmark bill aimed at reducing carbon emissions and promoting renewable energy sources.",
        content:
          "In a historic move, the Senate today passed a comprehensive climate change bill with bipartisan support. The bill, which has been in development for over a year, sets ambitious targets for reducing greenhouse gas emissions and provides significant funding for clean energy initiatives. Key provisions include tax incentives for electric vehicles, increased investment in renewable energy infrastructure, and stricter regulations on industrial emissions. Environmental groups have hailed the bill as a major step forward in combating climate change, while some industry leaders have expressed concerns about potential economic impacts. The bill now moves to the House for consideration.",
        category_id: category[0].id,
        user_id: admin.id,
      },
      {
        title: "Tech Giant Unveils Revolutionary AI-Powered Smartphone",
        snippet:
          "A leading tech company has announced a new smartphone with advanced AI capabilities, setting a new standard in mobile technology.",
        content:
          "Tech industry leader InnovateCorp unveiled its latest smartphone model today, featuring groundbreaking AI technology that promises to revolutionize the mobile user experience. The new device, dubbed the 'AI-Phone,' incorporates a custom-designed AI chip that enables real-time language translation, advanced image recognition, and predictive user behavior analysis. During the launch event, InnovateCorp CEO Jane Doe demonstrated the phone's ability to compose emails, edit photos, and even predict user actions based on past behavior and context. While privacy advocates have raised concerns about data collection, InnovateCorp assures that all AI processing is done on-device, ensuring user privacy. The AI-Phone is set to hit markets next month with a premium price tag that reflects its advanced capabilities.",
        category_id: category[1].id,
        user_id: admin.id,
      },
      {
        title: "Underdog Team Wins World Cup in Thrilling Final",
        snippet:
          "In a stunning upset, the underdog national team clinched victory in the World Cup final, marking a historic moment in soccer.",
        content:
          "In a match that will go down in soccer history, the underdog team from [Country] emerged victorious in the World Cup final, defeating the heavily favored [Opponent] in a nail-biting penalty shootout. The game, which remained scoreless through regular time and extra time, saw both teams displaying exceptional skill and determination. [Country]'s goalkeeper became the hero of the hour, saving two crucial penalties to secure the 4-2 shootout win. This marks [Country]'s first-ever World Cup title and has sparked nationwide celebrations. The team's journey to the final, which included upset victories over several top-ranked teams, has been hailed as one of the greatest underdog stories in sports history. The victory is expected to have a significant impact on soccer's popularity in [Country] and may reshape the global soccer landscape in years to come.",
        category_id: category[2].id,
        user_id: admin.id,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
